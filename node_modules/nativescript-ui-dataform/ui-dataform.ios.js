"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = require("./ui-dataform.common");
var color_1 = require("tns-core-modules/color");
var view_1 = require("tns-core-modules/ui/core/view");
var utils = require("tns-core-modules/utils/utils");
var enums = require("tns-core-modules/ui/enums");
var font_1 = require("tns-core-modules/ui/styling/font");
var nativescript_ui_autocomplete_1 = require("nativescript-ui-autocomplete");
var view_2 = require("tns-core-modules/ui/core/view");
__export(require("./ui-dataform.common"));
var TKDataFormDelegateImplementation = /** @class */ (function (_super) {
    __extends(TKDataFormDelegateImplementation, _super);
    function TKDataFormDelegateImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKDataFormDelegateImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = new WeakRef(owner);
        return this;
    };
    /**
     * Called when a row with the corresponding property is selected.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidSelectEditorForProperty = function (dataForm, editor, property) {
        var args = {
            eventName: commonModule.RadDataForm.editorSelectedEvent,
            object: this._owner.get(),
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called when a row with the corresponding property is deselected.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidDeselectEditorForProperty = function (dataForm, editor, property) {
        var args = {
            eventName: commonModule.RadDataForm.editorDeselectedEvent,
            object: this._owner.get(),
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called after a property is edited.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidEditProperty = function (dataForm, property) {
        var args = {
            eventName: commonModule.RadDataForm.propertyEditedEvent,
            object: this._owner.get(),
            editor: undefined,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called after a property is validated.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidValidatePropertyEditor = function (dataForm, property, editor) {
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        var group = this._owner.get().getGroupByName(property.groupName);
        var args = {
            eventName: commonModule.RadDataForm.propertyValidatedEvent,
            object: this._owner.get(),
            editor: entityProperty.editor,
            entityProperty: entityProperty,
            propertyName: property.name,
            group: group,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called after validate method has been called to notify that the process has ended.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidFinishValidation = function (dataForm, result) {
        if (this._owner.get()._validateResolve != null) {
            this._owner.get()._validateResolve(result);
            this._owner.get()._validateResolve = null;
        }
        return true;
    };
    /**
     * Called after commit method has been called to notify that the process has ended.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidFinishCommit = function (dataForm, result) {
        if (this._owner.get()._commitResolve != null) {
            this._owner.get()._commitResolve(result);
            this._owner.get()._commitResolve = null;
        }
        return true;
    };
    /**
     * Called when a property has to be validated.
     */
    TKDataFormDelegateImplementation.prototype.dataFormValidatePropertyEditor = function (dataForm, property, editor) {
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        var validatedValue = property.valueCandidate;
        var group = this._owner.get().getGroupByName(property.groupName);
        var args = {
            eventName: commonModule.RadDataForm.propertyValidateEvent,
            object: this._owner.get(),
            editor: entityProperty.editor,
            entityProperty: entityProperty,
            propertyName: property.name,
            group: group,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
        var result = Promise.resolve(args.returnValue);
        dataForm.onValidationStartedEditor(property, editor);
        result.then((function (answer) {
            if (answer === false) {
                property.errorMessage = entityProperty.errorMessage;
                dataForm.onValidationResultValuePropertyEditor(false, validatedValue, property, editor);
            }
            else {
                property.positiveMessage = entityProperty.successMessage;
                dataForm.onValidationResultValuePropertyEditor(true, validatedValue, property, editor);
            }
        }));
        return args.returnValue;
    };
    /**
     *  Called once when the data form creates its editors. This method lets you to set properties that are not going to be changed.
     */
    TKDataFormDelegateImplementation.prototype.dataFormSetupEditorForProperty = function (dataForm, editor, property) {
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        if (!entityProperty) {
            entityProperty = this._owner.get()._createPropertyFromNative(property);
            if (!this._owner.get().properties) {
                this._owner.get().properties = new Array();
            }
            this._owner.get().properties.push(entityProperty);
        }
        entityProperty._updateNativeEditor(editor);
        var args = {
            eventName: commonModule.RadDataForm.editorSetupEvent,
            object: this._owner.get(),
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    TKDataFormDelegateImplementation.prototype.dataFormDidLayoutEditorForProperty = function (dataForm, editor, property) {
        if (this._owner.get().source === undefined) {
            return;
        }
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        if (entityProperty) {
            var propertyEditor = entityProperty.editor;
            if (propertyEditor) {
                var editorPosition = this.getPositionFromFrame(editor.frame);
                propertyEditor.layout(editorPosition.left, editorPosition.top, editorPosition.right, editorPosition.bottom);
                var labelPosition = this.getPositionFromFrame(editor.textLabel.frame);
                propertyEditor.label.layout(labelPosition.left, labelPosition.top, labelPosition.right, labelPosition.bottom);
                var editorCorePosition = this.getPositionFromFrame(editor.editorCore.frame);
                propertyEditor.editorCore.layout(editorCorePosition.left, editorCorePosition.top, editorCorePosition.right, editorCorePosition.bottom);
            }
        }
    };
    /**
    *  Called when the data is reloaded in the native RadDataForm component (reloadData). This method lets you to set the PropertyChanged callbacks for all {N} properties.
    */
    TKDataFormDelegateImplementation.prototype.dataFormDidFinishEditorIntitialization = function (dataForm) {
        if (this._owner.get().source === undefined) {
            return;
        }
        if (this._owner.get().properties) {
            for (var i = 0; i < this._owner.get().properties.length; i++) {
                var entityProperty = this._owner.get().properties[i];
                this._owner.get()._attachEntityPropertyPropertyChangeListener(entityProperty);
                if (entityProperty.editor) {
                    entityProperty._updateNativeEditor(entityProperty.editor.ios);
                    if (!entityProperty.parent && !entityProperty.editor.parent) {
                        this._owner.get()._addView(entityProperty);
                        entityProperty._addView(entityProperty.editor);
                    }
                    var ngKey = this._owner.get()._ngKey;
                    if (ngKey) {
                        // Add any newly created editors to the same scope as RadDataForm
                        // in order to apply component-specific css in angular
                        var ngValue = this._owner.get()[ngKey];
                        entityProperty[ngKey] = ngValue;
                        entityProperty.editor[ngKey] = ngValue;
                        entityProperty.editor.label[ngKey] = ngValue;
                        entityProperty.editor.editorCore[ngKey] = ngValue;
                    }
                }
            }
        }
        if (this._owner.get().groups) {
            for (var i = 0; i < this._owner.get().groups.length; i++) {
                var group_1 = this._owner.get().groups[i];
                if (group_1.properties) {
                    for (var j = 0; j < group_1.properties.length; j++) {
                        var entityProperty = group_1.properties[j];
                        this._owner.get()._attachEntityPropertyPropertyChangeListener(entityProperty);
                        if (entityProperty.editor) {
                            entityProperty._updateNativeEditor(entityProperty.editor.ios);
                        }
                    }
                }
            }
        }
        this._owner.get()._onCssStateChange();
    };
    TKDataFormDelegateImplementation.prototype.getPositionFromFrame = function (frame) {
        var left = view_1.layout.round(view_1.layout.toDevicePixels(frame.origin.x));
        var top = view_1.layout.round(view_1.layout.toDevicePixels(frame.origin.y));
        var right = view_1.layout.round(view_1.layout.toDevicePixels(frame.origin.x + frame.size.width));
        var bottom = view_1.layout.round(view_1.layout.toDevicePixels(frame.origin.y + frame.size.height));
        return { left: left, right: right, top: top, bottom: bottom };
    };
    /**
     * Called before an editor is displayed to the screen or after validation. This method lets you change the visual styles and setting of TKDataFormEditor object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormUpdateEditorForProperty = function (dataForm, editor, property) {
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        PropertyEditorHelper.applyStyle(entityProperty.editor);
        var args = {
            eventName: commonModule.RadDataForm.editorUpdateEvent,
            object: this._owner.get(),
            editor: editor,
            entityProperty: property,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * This method lets you change the visual styles and setting of TKEntityPropertyGroupView object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormUpdateGroupViewForGroupAtIndex = function (dataForm, groupView, groupIndex) {
        if (groupView == null || groupView.group == null) {
            return;
        }
        var groupName = groupView.group.name;
        var group = this._owner.get().getGroupByName(groupName);
        if (group) {
            groupView.collapsible = group.collapsible;
            if (group.collapsible) {
                if (groupView.isCollapsed !== group.collapsed) {
                    if (group.collapsed) {
                        groupView.collapse();
                    }
                    else {
                        groupView.expand();
                    }
                }
            }
            groupView.titleView.hidden = group.titleHidden;
            this._owner.get()._updateGroupLayout(group, groupView);
            this._owner.get()._applyGroupTitleStyle(groupView, group.titleStyle);
        }
        // throw event for additional customizations
        var args = {
            eventName: commonModule.RadDataForm.groupUpdateEvent,
            object: this._owner.get(),
            editor: undefined,
            entityProperty: undefined,
            propertyName: undefined,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called just before a property value will be committed to the business object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormWillCommitProperty = function (dataForm, property) {
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        var args = {
            eventName: commonModule.RadDataForm.propertyCommitEvent,
            object: this._owner.get(),
            editor: undefined,
            entityProperty: entityProperty,
            propertyName: property.name,
            group: undefined,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
        return args.returnValue;
    };
    TKDataFormDelegateImplementation.prototype.isUsingDateTimeEditor = function (property) {
        return property.editorClass === TKDataFormDatePickerEditor.class() ||
            property.editorClass === TKDataFormTimePickerEditor.class();
    };
    TKDataFormDelegateImplementation.prototype.convertToTypedValue = function (oldValue, newValue, nativeProperty) {
        // The newValue is of type object, we try to deduct the desired type mostly based
        // on the type of the old value, so we can cast the newValue to the correct type
        if (typeof oldValue === "number") {
            return Number(newValue);
        }
        if (typeof oldValue === "boolean") {
            return String(newValue) === "true";
        }
        if (this.isUsingDateTimeEditor(nativeProperty)) {
            // The Date/Time Editors can edit properties of types Date and String.
            if (typeof oldValue === "string") {
                return String(newValue);
            }
            else {
                return new Date(newValue);
            }
        }
        if (newValue instanceof NSArray) {
            var jsArray = [];
            for (var i = 0; i < newValue.count; i++) {
                jsArray.push(newValue[i]);
            }
            newValue = jsArray;
        }
        return newValue;
    };
    /**
     * Called after a property value is committed to the business object.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidCommitProperty = function (dataForm, property) {
        if (this._owner.get().source.hasOwnProperty(property.name)) {
            var oldValue = this._owner.get().source[property.name];
            var newValue = property.originalValue;
            var typedValue = this.convertToTypedValue(oldValue, newValue, property);
            this._owner.get().source[property.name] = typedValue;
        }
        var entityProperty = this._owner.get().getPropertyByName(property.name);
        var args = {
            eventName: commonModule.RadDataForm.propertyCommittedEvent,
            object: this._owner.get(),
            editor: null,
            entityProperty: entityProperty,
            propertyName: property.name,
            group: null,
            groupName: property.groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called after a group is collapsed.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidCollapseGroupView = function (dataForm, groupView) {
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var group = this._owner.get().getGroupByName(groupName);
        if (group) {
            group.collapsed = true;
        }
        var args = {
            eventName: commonModule.RadDataForm.groupCollapsedEvent,
            object: this._owner.get(),
            editor: undefined,
            entityProperty: undefined,
            propertyName: undefined,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * Called after a group is expanded.
     */
    TKDataFormDelegateImplementation.prototype.dataFormDidExpandGroupView = function (dataForm, groupView) {
        var groupName = groupView != null && groupView.group != null ? groupView.group.name : null;
        var group = this._owner.get().getGroupByName(groupName);
        if (group) {
            group.collapsed = false;
        }
        var args = {
            eventName: commonModule.RadDataForm.groupExpandedEvent,
            object: this._owner.get(),
            editor: undefined,
            entityProperty: undefined,
            propertyName: undefined,
            group: groupView,
            groupName: groupName,
            returnValue: true
        };
        this._owner.get().notify(args);
    };
    /**
     * The header for the corresponding group.
     */ // todo: uncomment , the bug with null view is fixed
    // public dataFormViewForHeaderInGroup(dataForm: TKDataForm, groupIndex: number): any { //TKEntityPropertyGroupTitleView
    //     console.log("dataFormViewForHeaderInGroup")
    // }
    // todo: add height property to editor class in order to be set in xml.
    /**
     * The height for the editor at specified indices.
     */
    // public dataFormHeightForEditorInGroupAtIndex(dataForm: TKDataForm, groupIndex: number, editorIndex: number): number {
    //     console.log("DELEGATE: dataFormHeightForEditorInGroupAtIndex")
    //     var args: commonModule.DataFormEventData = { eventName: commonModule.RadDataForm.editorHeightEvent,
    //         object: this._owner,
    //         editor: editorIndex,
    //         group: groupIndex,
    //         returnValue: 20 };
    //     this._owner.notify(args);
    //     return args.returnValue;
    // }
    // todo: add height property to group in order to be set in xml.
    /**
     * The height of the group header.
     */
    // public dataFormHeightForHeaderInGroup(dataForm: TKDataForm, groupIndex: number): number {
    //     console.log("DELEGATE: dataFormHeightForHeaderInGroup")
    //     return 0;
    // }
    // todo: consider is it is required at all. Android doesn't support such kind of view
    /**
     *  Return input accessory view for text field editors.
     */
    // public inputAccessoryViewForDataForm(dataForm: TKDataForm): any {//TKDataFormAccessoryView
    //     console.log("DELEGATE: inputAccessoryViewForDataForm")
    // }
    /**
     * Initializes a view controller specific for a given view controller editor.
     */
    TKDataFormDelegateImplementation.prototype.dataFormInitViewControllerForEditor = function (dataForm, viewController, editor) {
        // This delegate method is called before a new UIViewController for an editor
        // is pushed to the UINavigationController.
        // Notify the NS page about the new controller and let it treat the controller as a presented view controller.
        if (this._owner.get().page.hasOwnProperty("_presentedViewController")) {
            this._owner.get().page["_presentedViewController"] = viewController;
        }
    };
    TKDataFormDelegateImplementation.ObjCProtocols = [TKDataFormDelegate];
    return TKDataFormDelegateImplementation;
}(NSObject));
var TKDataFormConverterImplementation = /** @class */ (function (_super) {
    __extends(TKDataFormConverterImplementation, _super);
    function TKDataFormConverterImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKDataFormConverterImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormConverterImplementation.prototype.initWithConverter = function (converter) {
        this._converter = converter;
        return this;
    };
    TKDataFormConverterImplementation.prototype.convertFrom = function (source) {
        return this._converter.convertFrom(source);
    };
    TKDataFormConverterImplementation.prototype.convertTo = function (source) {
        return this._converter.convertTo(source);
    };
    TKDataFormConverterImplementation.ObjCProtocols = [TKDataFormConverter];
    return TKDataFormConverterImplementation;
}(NSObject));
var TKDataFormCustomEditorDelegateImplementation = /** @class */ (function (_super) {
    __extends(TKDataFormCustomEditorDelegateImplementation, _super);
    function TKDataFormCustomEditorDelegateImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKDataFormCustomEditorDelegateImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = new WeakRef(owner);
        return this;
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.editorWillCreateView = function (editor) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorNeedsViewEvent,
            object: this._owner.get(),
            view: undefined,
            context: undefined,
            value: undefined
        };
        this._owner.get().notify(args);
        return args.view;
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.editorShouldApplyValueEditorView = function (editor, value, view) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorHasToApplyValueEvent,
            object: this._owner.get(),
            view: view,
            context: undefined,
            value: value
        };
        this._owner.get().notify(args);
    };
    TKDataFormCustomEditorDelegateImplementation.prototype.editorWillReturnValueEditorView = function (editor, view) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorNeedsValueEvent,
            object: this._owner.get(),
            view: view,
            context: undefined,
            value: undefined
        };
        this._owner.get().notify(args);
        return args.value;
    };
    TKDataFormCustomEditorDelegateImplementation.ObjCProtocols = [TKDataFormCustomEditorDelegate];
    return TKDataFormCustomEditorDelegateImplementation;
}(NSObject));
exports.TKDataFormCustomEditorDelegateImplementation = TKDataFormCustomEditorDelegateImplementation;
var TKDataFormValidationProviderDelegateImplementation = /** @class */ (function (_super) {
    __extends(TKDataFormValidationProviderDelegateImplementation, _super);
    function TKDataFormValidationProviderDelegateImplementation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TKDataFormValidationProviderDelegateImplementation.new = function () {
        return _super.new.call(this);
    };
    TKDataFormValidationProviderDelegateImplementation.prototype.initWithOwner = function (owner) {
        this._owner = new WeakRef(owner);
        return this;
    };
    TKDataFormValidationProviderDelegateImplementation.prototype.validatorWillValidate = function (validator, property) {
        return this._owner.get().validate(property.valueCandidate, property.name);
    };
    TKDataFormValidationProviderDelegateImplementation.ObjCProtocols = [TKDataFormValidationProviderDelegate];
    return TKDataFormValidationProviderDelegateImplementation;
}(NSObject));
var RadDataForm = /** @class */ (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        var _this = _super.call(this) || this;
        _this._initialized = false;
        _this._ios = TKDataForm.new();
        _this._nativeDelegate = TKDataFormDelegateImplementation.new().initWithOwner(_this);
        var that = new WeakRef(_this);
        _this.entityPropertyChangedHandler = function (data) {
            that.get().onPropertyPropertyChanged(data);
        };
        _this.groupPropertyChangedHandler = function (data) {
            that.get().onGroupPropertyChanged(data);
        };
        _this.groupTitleStylePropertyChangedHandler = function (data) {
            that.get().onGroupTitleStylePropertyChanged(data);
        };
        _this.groupLayoutPropertyChangedHandler = function (data) {
            that.get()._onGroupLayoutPropertyChanged(data.object);
        };
        _this.on("isEnabledChange", _this.isEnabledChanged, _this);
        return _this;
    }
    RadDataForm.prototype[view_2.borderLeftWidthProperty.setNative] = function (value) {
        var paddingLeft = isNaN(+this.style.paddingLeft) ? 0 : +this.style.paddingLeft;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: value + paddingLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.paddingLeftProperty.setNative] = function (value) {
        var borderLeft = isNaN(+this.style.borderLeftWidth) ? 0 : +this.style.borderLeftWidth;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: value + borderLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.borderTopWidthProperty.setNative] = function (value) {
        var paddingTop = isNaN(+this.style.paddingTop) ? 0 : +this.style.paddingTop;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + paddingTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.paddingTopProperty.setNative] = function (value) {
        var borderTop = isNaN(+this.style.borderTopWidth) ? 0 : +this.style.borderTopWidth;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + borderTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.borderRightWidthProperty.setNative] = function (value) {
        var paddingRight = isNaN(+this.style.paddingRight) ? 0 : +this.style.paddingRight;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + paddingRight,
            bottom: currentInsets.bottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.paddingRightProperty.setNative] = function (value) {
        var borderRight = isNaN(+this.style.borderRightWidth) ? 0 : +this.style.borderRightWidth;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + borderRight,
            bottom: currentInsets.bottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.borderBottomWidthProperty.setNative] = function (value) {
        var paddingBottom = isNaN(+this.style.paddingBottom) ? 0 : +this.style.paddingBottom;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + paddingBottom
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype[view_2.paddingBottomProperty.setNative] = function (value) {
        var borderBottom = isNaN(+this.style.borderBottomWidth) ? 0 : +this.style.borderBottomWidth;
        var currentInsets = this._ios.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + borderBottom,
        });
        this._ios.insets = insets;
    };
    RadDataForm.prototype.createNativeView = function () {
        // The iOS DataForm needs to know about the UIViewController that contains it.
        // It may be used by some UIViewControllerEditors (like List editor) to
        // access the UINavigationController and navigate to other controllers.
        // However, this is only possible when the DataForm is added to a page.
        // It can also be displayed in a modal page, then this.page will be undefined
        // and the above-mentioned editors will not work.
        if (this.page) {
            this._ios.owner = this.page.ios;
        }
        this._ngKey = Object.keys(this).find(function (key) { return key.startsWith('_ngcontent'); });
        // fix possible race conditions that happens when parsing the markup
        // we insert PropertyEntity objects after the form was already init
        // see https://github.com/NativeScript/nsplugins-internal/issues/162
        this._initDataForm();
        return this._ios;
    };
    RadDataForm.prototype.disposeNativeView = function () {
        this._ios.owner = undefined;
        this._ios.delegate = undefined;
        this._nativeDelegate = undefined;
    };
    RadDataForm.prototype.isEnabledChanged = function (data) {
        this._ios.readOnly = !data.value;
    };
    RadDataForm.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._nativeDelegate;
    };
    RadDataForm.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        this._ios.delegate = null;
    };
    RadDataForm.prototype.notifyValidated = function (propertyName, result) {
        var property = this.getPropertyByName(propertyName);
        var editor = property.editor;
        if (!result) {
            property.ios.errorMessage = property.errorMessage;
        }
        this._ios.onValidationResultValuePropertyEditor(result, property.valueCandidate, property.ios, editor.ios);
    };
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            var result = this._ios.dataSource.writeJSONToString();
            var parsedResult = JSON.parse(result);
            var finalResult = JSON.stringify(parsedResult);
            return finalResult;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._reset = function () {
        this._dataSource.removeAllGroups();
        this._initDataForm();
    };
    RadDataForm.prototype._applyGroupTitleStyle = function (groupView, titleStyle) {
        if (titleStyle.fillColor) {
            groupView.titleView.style.fill = TKSolidFill.solidFillWithColor(titleStyle.fillColor.ios);
        }
        if (titleStyle.strokeColor || titleStyle.strokeWidth) {
            var stroke = TKStroke.new();
            if (titleStyle.strokeWidth) {
                stroke.width = titleStyle.strokeWidth;
            }
            if (titleStyle.strokeColor) {
                stroke.color = titleStyle.strokeColor.ios;
            }
            groupView.titleView.style.stroke = stroke;
        }
        if (titleStyle.separatorColor) {
            groupView.titleView.style.separatorColor = TKSolidFill.solidFillWithColor(titleStyle.separatorColor.ios);
        }
        if (titleStyle.labelTextColor) {
            groupView.titleView.titleLabel.textColor = titleStyle.labelTextColor.ios;
        }
        if (titleStyle.labelFontName || titleStyle.labelTextSize || titleStyle.labelFontStyle) {
            groupView.titleView.titleLabel.font = RadDataForm.getFontWithProperties(titleStyle.labelFontName, titleStyle.labelTextSize, titleStyle.labelFontStyle);
        }
    };
    RadDataForm.prototype._updateGroupLayout = function (propertyGroup, nativeGroup) {
        if (propertyGroup.layout instanceof commonModule.DataFormStackLayout) {
            var nativeLayout = TKStackLayout.alloc().init();
            if (propertyGroup.layout.orientation === enums.Orientation.horizontal) {
                nativeLayout.orientation = 0 /* Horizontal */;
            }
            else {
                nativeLayout.orientation = 1 /* Vertical */;
            }
            nativeGroup.editorsContainer.layout = nativeLayout;
        }
        else if (propertyGroup.layout instanceof commonModule.DataFormGridLayout) {
            nativeGroup.editorsContainer.layout = TKGridLayout.alloc().init();
        }
    };
    RadDataForm.prototype.onGroupPropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        var nativeGroup = null;
        switch (data.propertyName) {
            case "collapsed":
                var propertyGroup = data.object;
                if (!propertyGroup.collapsible) {
                    // If the group is not collapsible, we don't want to collapse it.
                    if (data.value) {
                        console.log("WARNING: collapsible should be true before collapsing a group.");
                    }
                    return;
                }
                nativeGroup = this.getNativeGroup(propertyGroup.name);
                var groupView = this._ios.groupViewForGroup(nativeGroup);
                if (data.value === groupView.isCollapsed) {
                    // If the group already confronts to the newValue, don't do anything.
                    return;
                }
                if (data.value) {
                    groupView.collapse();
                }
                else {
                    groupView.expand();
                }
                break;
            case "titleHidden":
                nativeGroup = this.getNativeGroup(data.object.name);
                var nativeGroupView = this._ios.groupViewForGroup(nativeGroup);
                if (nativeGroupView) {
                    nativeGroupView.titleView.hidden = data.value;
                    nativeGroupView.setNeedsLayout();
                }
                break;
            case "hidden":
                nativeGroup = this.getNativeGroup(data.object.name);
                nativeGroup.hidden = data.value;
                this.reload();
                break;
            case "collapsible":
            case "titleStyle":
                this.reload();
                break;
            case "layout":
                this._onLayoutPropertyChanged(data.object);
                break;
            case "name":
                this._reset();
                break;
        }
    };
    RadDataForm.prototype._onLayoutPropertyChanged = function (group) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this._updateLayout(group);
    };
    RadDataForm.prototype._updateLayout = function (group) {
        var nativeGroup = this.getNativeGroup(group.name);
        var nativeGroupView = this._ios.groupViewForGroup(nativeGroup);
        this._updateGroupLayout(group, nativeGroupView);
    };
    RadDataForm.prototype.getNativeGroup = function (name) {
        var groupCount = this._dataSource.numberOfGroupsInDataForm(this._ios);
        for (var i = 0; i < groupCount; i++) {
            var group_2 = this._dataSource.groupAtIndex(i);
            if (group_2.name === name) {
                return group_2;
            }
        }
        return null;
    };
    RadDataForm.prototype.onGroupTitleStylePropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this.reload();
    };
    RadDataForm.prototype._onGroupLayoutPropertyChanged = function (group) {
        if (!this._ios || !this._initialized) {
            return;
        }
        this._updateLayout(group);
    };
    RadDataForm.prototype.onPropertyPropertyChanged = function (data) {
        if (!this._ios || !this._initialized) {
            return;
        }
        var property = data.object;
        if (!property || !property.ios) {
            this.reload();
            return;
        }
        var nativeProperty = property.ios;
        switch (data.propertyName) {
            case "readOnly":
                this._ios.updateEditorForProperty(nativeProperty);
                break;
            case "hintText":
            case "hidden":
            case "index":
            case "displayName":
            case "valuesProvider":
            case "editor":
                this.reload();
                break;
        }
    };
    RadDataForm.prototype._initDataForm = function () {
        if (!this.source || !this._dataSource) {
            return;
        }
        // go through all groups / entity properties
        if (this.groups) {
            for (var i = 0; i < this.groups.length; ++i) {
                var group_3 = this.groups[i];
                var propertyNames = NSMutableArray.alloc().initWithCapacity(group_3.properties.length);
                if (group_3.properties) {
                    for (var j = 0; j < group_3.properties.length; ++j) {
                        var entityProperty = group_3.properties[j];
                        propertyNames.addObject(entityProperty.name);
                    }
                }
                this._dataSource.addGroupWithNamePropertyNames(group_3.name, propertyNames);
                // When a group is added to the data source, each property gets a new
                // value for its layoutInfo.row. Since we want the index defined in NS,
                // to have a bigger priority, we make the update after the property is
                // added to the data source.
                if (group_3.properties) {
                    for (var j = 0; j < group_3.properties.length; ++j) {
                        var entityProperty = group_3.properties[j];
                        this._updateNativeProperty(entityProperty);
                    }
                }
                var nativeGroup = this.getNativeGroup(group_3.name);
                if (group_3.hidden) {
                    nativeGroup.hidden = true;
                }
                if (!group_3.titleStyle) {
                    group_3.titleStyle = new commonModule.GroupTitleStyle();
                }
                if (!group_3.layout) {
                    group_3.layout = new commonModule.DataFormStackLayout();
                }
                this._attachGroupChangeListener(group_3);
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; ++i) {
                var entityProperty = this.properties[i];
                this._updateNativeProperty(entityProperty);
            }
        }
        this._ios.dataSource = this._dataSource;
        this._initialized = true;
    };
    RadDataForm.prototype._createPropertyFromNative = function (nativeProperty) {
        var entityProperty = new EntityProperty();
        entityProperty.name = nativeProperty.name;
        entityProperty._linkPropertyWithNative(nativeProperty);
        return entityProperty;
    };
    RadDataForm.prototype._updateNativeProperty = function (entityProperty) {
        var nativeProperty = this._dataSource.propertyWithName(entityProperty.name);
        if (nativeProperty) {
            entityProperty._linkPropertyWithNative(nativeProperty);
        }
        else {
            console.log("Cannot create native TKEntityProperty for EntityProperty with 'name': " + entityProperty.name);
        }
    };
    RadDataForm.prototype._onSourcePropertyChanged = function (oldValue, newValue) {
        if (newValue) {
            var objJSON = JSON.stringify(newValue);
            this._dataSource = TKDataFormEntityDataSource.alloc().initWithJSONStringRootItemKeyPath(objJSON, null);
            this._initDataForm();
        }
    };
    RadDataForm.prototype._onMetadataPropertyChanged = function (oldValue, newValue) {
        if (newValue) {
            var objJSON = JSON.stringify(newValue);
            this._ios.setupWithJSONAnnotationsString(objJSON);
            this.reload();
        }
    };
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (oldValue, newValue) {
        this._ios.readOnly = newValue;
    };
    RadDataForm.prototype._onCommitModePropertyChanged = function (oldValue, newValue) {
        switch (newValue) {
            case commonModule.DataFormCommitMode.Immediate:
                this._ios.commitMode = 0 /* Immediate */;
                break;
            case commonModule.DataFormCommitMode.Manual:
                this._ios.commitMode = 2 /* Manual */;
                break;
            case commonModule.DataFormCommitMode.OnLostFocus:
                this._ios.commitMode = 1 /* OnLostFocus */;
                break;
        }
    };
    RadDataForm.prototype._onValidationModePropertyChanged = function (oldValue, newValue) {
        switch (newValue) {
            case commonModule.DataFormValidationMode.Immediate:
                this._ios.validationMode = 0 /* Immediate */;
                break;
            case commonModule.DataFormValidationMode.Manual:
                this._ios.validationMode = 2 /* Manual */;
                break;
            case commonModule.DataFormValidationMode.OnLostFocus:
                this._ios.validationMode = 1 /* OnLostFocus */;
                break;
        }
    };
    RadDataForm.prototype._onGroupsPropertyChanged = function (oldValue, newValue) {
    };
    RadDataForm.prototype.validateAll = function () {
        var that = new WeakRef(this);
        var promise = new Promise(function (resolve) {
            that.get()._validateResolve = resolve;
        });
        this._ios.validate();
        return promise;
    };
    RadDataForm.prototype.validateAndCommitAll = function () {
        var that = new WeakRef(this);
        var promise = new Promise(function (resolve) {
            that.get()._commitResolve = resolve;
        });
        this._ios.commit();
        return promise;
    };
    RadDataForm.prototype.commitAll = function () {
        this._ios.commitForced();
    };
    RadDataForm.prototype.reload = function () {
        if (this._ios) {
            this._ios.reloadData();
        }
    };
    RadDataForm.prototype.hasValidationErrors = function () {
        if (this._ios) {
            this._ios.validate();
            return this._ios.hasValidationErrors();
        }
        return false;
    };
    ////////////////////////////////////////////////////////////////////////////
    // Helpers
    RadDataForm.getFontWithProperties = function (fontName, size, style) {
        var font = null;
        var fontSize = !isNaN(+size) ? size : 17;
        if (fontName) {
            font = UIFont.fontWithNameSize(fontName, fontSize);
            if (!font) {
                console.log("WARNING: Cannot create font with given name: " + fontSize);
                return null;
            }
        }
        if (!font && !isNaN(+size)) {
            font = UIFont.systemFontOfSize(fontSize);
        }
        if (style) {
            var traits = 0 /* ClassUnknown */;
            switch (style) {
                case commonModule.DataFormFontStyle.Bold:
                    traits = 2 /* TraitBold */;
                    break;
                case commonModule.DataFormFontStyle.Italic:
                    traits = 1 /* TraitItalic */;
                    break;
                case commonModule.DataFormFontStyle.BoldItalic:
                    traits = 2 /* TraitBold */ | 1 /* TraitItalic */;
                    break;
            }
            if (!font) {
                font = UIFont.systemFontOfSize(fontSize);
            }
            var newFont = UIFont.fontWithDescriptorSize(utils.ios.getter(font, font.fontDescriptor).fontDescriptorWithSymbolicTraits(traits), fontSize);
            if (newFont) {
                font = newFont;
            }
        }
        return font;
    };
    return RadDataForm;
}(commonModule.RadDataForm));
exports.RadDataForm = RadDataForm;
///////////////////////////////////////////////
var PropertyGroup = /** @class */ (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        return _super.call(this) || this;
    }
    // todo: consider if these properties need handles at all
    PropertyGroup.prototype.onNameChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onHiddenChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onCollapsibleChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onTitleStyleChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onPropertiesChanged = function (oldValue, newValue) {
    };
    return PropertyGroup;
}(commonModule.PropertyGroup));
exports.PropertyGroup = PropertyGroup;
var EntityProperty = /** @class */ (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        var _this = _super.call(this) || this;
        _this._shouldSkipEditorUpdate = false;
        return _this;
    }
    Object.defineProperty(EntityProperty.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "isValid", {
        get: function () {
            if (this.ios) {
                return this.ios.isValid;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "value", {
        get: function () {
            if (this.ios) {
                return this.ios.originalValue;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "valueCandidate", {
        get: function () {
            if (this.ios) {
                return this.ios.valueCandidate;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype._linkPropertyWithNative = function (value) {
        this._ios = value;
        this._ios.pickersUseIndexValue = false;
        this._onNativeSet();
    };
    EntityProperty.prototype._updateNativeEditor = function (nativeEditor) {
        if (!this.editor) {
            this._createEditorFromNative(nativeEditor);
        }
        else {
            PropertyEditorHelper._linkEditorWithNative(this.editor, nativeEditor);
        }
    };
    EntityProperty.prototype._createEditorFromNative = function (nativeEditor) {
        var type = PropertyEditor._getNativeEditorType(nativeEditor);
        this._shouldSkipEditorUpdate = true;
        var propertyEditor = new PropertyEditor();
        propertyEditor.type = type;
        PropertyEditorHelper._linkEditorWithNative(propertyEditor, nativeEditor);
        this.editor = propertyEditor;
        this._shouldSkipEditorUpdate = false;
    };
    EntityProperty.prototype._onNativeSet = function () {
        this.updateNativeValidators(this.validators);
        this.updateNativeConverter(this.converter);
        this.updateNativeValuesProvider(this.valuesProviderArray);
        this.updateNativeAutoCompleteDisplayMode(this.autoCompleteDisplayMode);
        this.updateNativeDisplayName(this.displayName);
        this.updateNativeIndex(this.index);
        this.updateNativeColumnIndex(this.columnIndex);
        this.updateNativeHidden(this.hidden);
        this.updateNativeReadOnly(this.readOnly);
        this.updateNativeRequired(this.required);
        this.updateNativeHintText(this.hintText);
        this.updateNativeImageResource(this.imageResource);
        this.updateNativeEditorParams(this.editor);
        this.updateNativeEditor(this.editor);
    };
    EntityProperty.prototype.onEditorTypeChanged = function () {
        var newEditor = new PropertyEditor();
        newEditor.type = this.editor.type;
        newEditor.propertyEditorStyle = this.editor.propertyEditorStyle;
        newEditor.params = this.editor.params;
        this.editor = newEditor;
    };
    EntityProperty.prototype.updateNativeEditorParams = function (value) {
        if (!this._ios || !value || !value.params) {
            return;
        }
        var editorParams = value.params;
        if (editorParams.minimum && editorParams.maximum) {
            if (!isNaN(editorParams.minimum) && !isNaN(editorParams.maximum)) {
                this._ios.range = TKRange.rangeWithMinimumAndMaximum(editorParams.minimum, editorParams.maximum);
            }
        }
        if (editorParams.step && !isNaN(editorParams.step)) {
            this._ios.step = editorParams.step;
        }
    };
    EntityProperty.prototype.updateNativeEditor = function (value) {
        if (!this._ios || !value) {
            return;
        }
        if (value instanceof CustomPropertyEditor) {
            this._ios.editorClass = TKDataFormCustomEditor.class();
            return;
        }
        this._ios.editorClass = value.editorClass;
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
        if (!this._ios || !value) {
            return;
        }
        var validatorSet = NSMutableArray.new();
        for (var k = 0; k < value.length; k++) {
            var validatorBase = value[k];
            var aValidator = validatorBase.ios;
            validatorSet.addObject(aValidator);
        }
        this._ios.validators = validatorSet;
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
        if (!this._ios || !value) {
            return;
        }
        var nativeSource = NSMutableArray.new();
        for (var i = 0; i < value.length; i++) {
            var nativeValue = value[i];
            if (typeof nativeValue === "string") {
                nativeValue = nativeValue.trim();
            }
            nativeSource.addObject(nativeValue);
        }
        this._ios.valuesProvider = nativeSource;
        if (this.editor && this.editor.ios) {
            this.editor.ios.update();
        }
    };
    EntityProperty.prototype.updateNativeAutoCompleteDisplayMode = function (value) {
        if (!this._ios || !value) {
            return;
        }
        var nativeValue;
        switch (value) {
            case nativescript_ui_autocomplete_1.AutoCompleteDisplayMode.Plain:
                nativeValue = 0 /* Plain */;
                break;
            case nativescript_ui_autocomplete_1.AutoCompleteDisplayMode.Tokens:
                nativeValue = 1 /* Tokens */;
                break;
        }
        if (nativeValue !== undefined) {
            this._ios.autoCompleteDisplayMode = nativeValue;
        }
        else {
            console.log("autoCompleteDisplayMode cannot be set to: " + value);
        }
    };
    EntityProperty.prototype.updateNativeImageResource = function (value) {
        if (!this._ios || value === undefined) {
            return;
        }
        if (value != null) {
            var image = UIImage.imageNamed(value);
            this._ios.image = image;
        }
        else {
            this._ios.image = null;
        }
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.displayName = value;
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.index = value;
    };
    EntityProperty.prototype.updateNativeConverter = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.converter = TKDataFormConverterImplementation.new().initWithConverter(value);
        if (this.editor && this.editor.ios) {
            this.editor.ios.loadPropertyValue();
        }
    };
    EntityProperty.prototype.updateNativeColumnIndex = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.columnIndex = value;
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.hidden = value;
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.readOnly = value;
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
        if (!this._ios || value == null) {
            return;
        }
        this._ios.required = value;
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
        if (!this._ios || !value) {
            return;
        }
        this._ios.hintText = value;
    };
    return EntityProperty;
}(commonModule.EntityProperty));
exports.EntityProperty = EntityProperty;
var DataFormEditorLabel = /** @class */ (function (_super) {
    __extends(DataFormEditorLabel, _super);
    function DataFormEditorLabel(editor) {
        var _this = _super.call(this) || this;
        _this._editor = editor;
        _this._ios = editor.ios.textLabel;
        return _this;
    }
    Object.defineProperty(DataFormEditorLabel.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    DataFormEditorLabel.prototype.createNativeView = function () {
        return this._ios;
    };
    DataFormEditorLabel.prototype.disposeNativeView = function () {
        this._editor = null;
        this._ios = null;
    };
    DataFormEditorLabel.prototype[view_2.paddingLeftProperty.setNative] = function (value) {
        var borderLeft = isNaN(+this.style.borderLeftWidth) ? 0 : +this.style.borderLeftWidth;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: value + borderLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.borderLeftWidthProperty.setNative] = function (value) {
        var paddingLeft = isNaN(+this.style.paddingLeft) ? 0 : +this.style.paddingLeft;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: value + paddingLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.paddingTopProperty.setNative] = function (value) {
        var borderTop = isNaN(+this.style.borderTopWidth) ? 0 : +this.style.borderTopWidth;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + borderTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.borderTopWidthProperty.setNative] = function (value) {
        var paddingTop = isNaN(+this.style.paddingTop) ? 0 : +this.style.paddingTop;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + paddingTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.paddingRightProperty.setNative] = function (value) {
        var borderRight = isNaN(+this.style.borderRightWidth) ? 0 : +this.style.borderRightWidth;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + borderRight,
            bottom: currentInsets.bottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.borderRightWidthProperty.setNative] = function (value) {
        var paddingRight = isNaN(+this.style.paddingRight) ? 0 : +this.style.paddingRight;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + paddingRight,
            bottom: currentInsets.bottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.paddingBottomProperty.setNative] = function (value) {
        var borderBottom = isNaN(+this.style.borderBottomWidth) ? 0 : +this.style.borderBottomWidth;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + borderBottom,
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.borderBottomWidthProperty.setNative] = function (value) {
        var paddingBottom = isNaN(+this.style.paddingBottom) ? 0 : +this.style.paddingBottom;
        var currentInsets = this._editor.ios.textLabel.textInsets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + paddingBottom
        });
        this._editor.ios.textLabel.textInsets = insets;
    };
    DataFormEditorLabel.prototype[view_2.marginLeftProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: value,
            top: currentMargins.top,
            right: currentMargins.right,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorLabel.prototype[view_2.marginTopProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: value,
            right: currentMargins.right,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorLabel.prototype[view_2.marginRightProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: currentMargins.top,
            right: value,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorLabel.prototype[view_2.marginBottomProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: currentMargins.top,
            right: currentMargins.right,
            bottom: value
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorLabel.prototype[view_2.colorProperty.setNative] = function (value) {
        var nativeColor = value instanceof color_1.Color ? value.ios : value;
        this._ios.textColor = nativeColor;
    };
    DataFormEditorLabel.prototype[view_2.visibilityProperty.setNative] = function (value) {
        PropertyEditorHelper._updateLabelHidden(this._editor, value === "hidden" || value === "collapse");
    };
    DataFormEditorLabel.prototype[view_2.fontInternalProperty.setNative] = function (value) {
        var nativeFont = value instanceof font_1.Font ? value.getUIFont(this._ios.font) : value;
        this._ios.font = nativeFont;
    };
    DataFormEditorLabel.prototype[view_2.widthProperty.setNative] = function (value) {
        PropertyEditorHelper._updateLabelWidth(this._editor, value);
    };
    DataFormEditorLabel.prototype[commonModule.PropertyEditor.positionProperty.setNative] = function (value) {
        if (!value) {
            return;
        }
        if (value.toLowerCase() === "left") {
            PropertyEditorHelper._updateLabelPosition(this._editor, commonModule.DataFormLabelPosition.Left);
        }
        else if (value.toLowerCase() === "top") {
            PropertyEditorHelper._updateLabelPosition(this._editor, commonModule.DataFormLabelPosition.Top);
        }
    };
    return DataFormEditorLabel;
}(commonModule.DataFormEditorLabel));
exports.DataFormEditorLabel = DataFormEditorLabel;
var DataFormEditorCore = /** @class */ (function (_super) {
    __extends(DataFormEditorCore, _super);
    function DataFormEditorCore(editor) {
        var _this = _super.call(this) || this;
        _this._editor = editor;
        _this._ios = _this._editor.ios.editorCore;
        return _this;
    }
    Object.defineProperty(DataFormEditorCore.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    DataFormEditorCore.prototype.createNativeView = function () {
        return this._ios;
    };
    DataFormEditorCore.prototype[view_2.paddingLeftProperty.setNative] = function (value) {
        var borderLeft = isNaN(+this.style.borderLeftWidth) ? 0 : +this.style.borderLeftWidth;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: value + borderLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.borderLeftWidthProperty.setNative] = function (value) {
        var paddingLeft = isNaN(+this.style.paddingLeft) ? 0 : +this.style.paddingLeft;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: value + paddingLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.paddingTopProperty.setNative] = function (value) {
        var borderTop = isNaN(+this.style.borderTopWidth) ? 0 : +this.style.borderTopWidth;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + borderTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.borderTopWidthProperty.setNative] = function (value) {
        var paddingTop = isNaN(+this.style.paddingTop) ? 0 : +this.style.paddingTop;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + paddingTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.paddingRightProperty.setNative] = function (value) {
        var borderRight = isNaN(+this.style.borderRightWidth) ? 0 : +this.style.borderRightWidth;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + borderRight,
            bottom: currentInsets.bottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.borderRightWidthProperty.setNative] = function (value) {
        var paddingRight = isNaN(+this.style.paddingRight) ? 0 : +this.style.paddingRight;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + paddingRight,
            bottom: currentInsets.bottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.paddingBottomProperty.setNative] = function (value) {
        var borderBottom = isNaN(+this.style.borderBottomWidth) ? 0 : +this.style.borderBottomWidth;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + borderBottom,
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.borderBottomWidthProperty.setNative] = function (value) {
        var paddingBottom = isNaN(+this.style.paddingBottom) ? 0 : +this.style.paddingBottom;
        var currentInsets = this._editor.ios.editorCore.insets;
        if (!currentInsets) {
            return;
        }
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + paddingBottom
        });
        this._editor.ios.editorCore.insets = insets;
    };
    DataFormEditorCore.prototype[view_2.marginLeftProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: value,
            top: currentMargins.top,
            right: currentMargins.right,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorCore.prototype[view_2.marginTopProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: value,
            right: currentMargins.right,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorCore.prototype[view_2.marginRightProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: currentMargins.top,
            right: value,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorCore.prototype[view_2.marginBottomProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: currentMargins.top,
            right: currentMargins.right,
            bottom: value
        });
        this.nativeViewProtected.margins = margins;
    };
    DataFormEditorCore.prototype[view_2.colorProperty.setNative] = function (value) {
        var nativeColor = value instanceof color_1.Color ? value.ios : value;
        this._editor.ios.editorColor = nativeColor;
        this._editor.ios.style.accessoryArrowStroke.color = nativeColor;
    };
    DataFormEditorCore.prototype[view_2.fontInternalProperty.setNative] = function (value) {
        var defaultFont = this._editor.ios.editorFont ? this._editor.ios.editorFont : this._editor.ios.textLabel.font;
        var nativeFont = value instanceof font_1.Font ? value.getUIFont(defaultFont) : value;
        this._editor.ios.editorFont = nativeFont;
    };
    return DataFormEditorCore;
}(commonModule.DataFormEditorCore));
exports.DataFormEditorCore = DataFormEditorCore;
// NOTE: currently we don't have specific class for every one of the editors since they don't have specific properties, with small exceptions
var PropertyEditor = /** @class */ (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PropertyEditor.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
            this.setNativeView(value);
            if (this._label) {
                this._removeView(this._label);
            }
            if (this._editorCore) {
                this._removeView(this._editorCore);
            }
            if (this._ios) {
                this._label = new DataFormEditorLabel(this);
                this._editorCore = new DataFormEditorCore(this);
                this._addView(this._label);
                this._addView(this._editorCore);
            }
            else {
                this._label = null;
                this._editorCore = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "editorCore", {
        get: function () {
            return this._editorCore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "editorClass", {
        get: function () {
            return this._editorClass;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.prototype[view_2.paddingLeftProperty.setNative] = function (value) {
        var borderLeft = isNaN(+this.style.borderLeftWidth) ? 0 : +this.style.borderLeftWidth;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: value + borderLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.borderLeftWidthProperty.setNative] = function (value) {
        var paddingLeft = isNaN(+this.style.paddingLeft) ? 0 : +this.style.paddingLeft;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: value + paddingLeft,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.paddingTopProperty.setNative] = function (value) {
        var borderTop = isNaN(+this.style.borderTopWidth) ? 0 : +this.style.borderTopWidth;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + borderTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.borderTopWidthProperty.setNative] = function (value) {
        var paddingTop = isNaN(+this.style.paddingTop) ? 0 : +this.style.paddingTop;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: value + paddingTop,
            right: currentInsets.right,
            bottom: currentInsets.bottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.paddingRightProperty.setNative] = function (value) {
        var borderRight = isNaN(+this.style.borderRightWidth) ? 0 : +this.style.borderRightWidth;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + borderRight,
            bottom: currentInsets.bottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.borderRightWidthProperty.setNative] = function (value) {
        var paddingRight = isNaN(+this.style.paddingRight) ? 0 : +this.style.paddingRight;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: value + paddingRight,
            bottom: currentInsets.bottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.paddingBottomProperty.setNative] = function (value) {
        var borderBottom = isNaN(+this.style.borderBottomWidth) ? 0 : +this.style.borderBottomWidth;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + borderBottom,
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.borderBottomWidthProperty.setNative] = function (value) {
        var paddingBottom = isNaN(+this.style.paddingBottom) ? 0 : +this.style.paddingBottom;
        var currentInsets = this.nativeViewProtected.style.insets;
        var insets = new UIEdgeInsets({
            left: currentInsets.left,
            top: currentInsets.top,
            right: currentInsets.right,
            bottom: value + paddingBottom
        });
        this.nativeViewProtected.style.insets = insets;
    };
    PropertyEditor.prototype[view_2.marginLeftProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: value,
            top: currentMargins.top,
            right: currentMargins.right,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    PropertyEditor.prototype[view_2.marginTopProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: value,
            right: currentMargins.right,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    PropertyEditor.prototype[view_2.marginRightProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: currentMargins.top,
            right: value,
            bottom: currentMargins.bottom
        });
        this.nativeViewProtected.margins = margins;
    };
    PropertyEditor.prototype[view_2.marginBottomProperty.setNative] = function (value) {
        var currentMargins = this.nativeViewProtected.margins;
        var margins = new UIEdgeInsets({
            left: currentMargins.left,
            top: currentMargins.top,
            right: currentMargins.right,
            bottom: value
        });
        this.nativeViewProtected.margins = margins;
    };
    PropertyEditor.prototype[commonModule.PropertyEditor.separatorColorProperty.setNative] = function (value) {
        PropertyEditorHelper._updateSeparatorColor(this, value);
    };
    PropertyEditor.prototype.createNativeView = function () {
        return this._ios ? this._ios : _super.prototype.createNativeView.call(this);
    };
    PropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyStyleForProperty(this, propertyName);
    };
    PropertyEditor.prototype.onParamsChanged = function (oldValue, newValue) {
        PropertyEditorHelper._applyParams(this);
    };
    PropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
        PropertyEditorHelper._applyParams(this);
    };
    PropertyEditor.prototype.onTypeChanged = function (oldValue, newValue) {
        this._updateEditorClass();
    };
    PropertyEditor.prototype._updateEditorClass = function () {
        if (this.type == null) {
            return;
        }
        switch (this.type) {
            case commonModule.DataFormEditorType.Text:
                this._editorClass = TKDataFormTextFieldEditor.class();
                break;
            case commonModule.DataFormEditorType.MultilineText:
                this._editorClass = TKDataFormMultilineTextEditor.class();
                break;
            case commonModule.DataFormEditorType.Email:
                this._editorClass = TKDataFormEmailEditor.class();
                break;
            case commonModule.DataFormEditorType.Password:
                this._editorClass = TKDataFormPasswordEditor.class();
                break;
            case commonModule.DataFormEditorType.Phone:
                this._editorClass = TKDataFormPhoneEditor.class();
                break;
            case commonModule.DataFormEditorType.Decimal:
                this._editorClass = TKDataFormDecimalEditor.class();
                break;
            case commonModule.DataFormEditorType.Number:
                this._editorClass = TKDataFormNumberEditor.class();
                break;
            case commonModule.DataFormEditorType.Switch:
                this._editorClass = TKDataFormSwitchEditor.class();
                break;
            case commonModule.DataFormEditorType.Stepper:
                this._editorClass = TKDataFormStepperEditor.class();
                break;
            case commonModule.DataFormEditorType.Slider:
                this._editorClass = TKDataFormSliderEditor.class();
                break;
            case commonModule.DataFormEditorType.SegmentedEditor:
                this._editorClass = TKDataFormSegmentedEditor.class();
                break;
            case commonModule.DataFormEditorType.DatePicker:
                this._editorClass = TKDataFormDatePickerEditor.class();
                break;
            case commonModule.DataFormEditorType.TimePicker:
                this._editorClass = TKDataFormTimePickerEditor.class();
                break;
            case commonModule.DataFormEditorType.Picker:
                this._editorClass = TKDataFormPickerViewEditor.class();
                break;
            case commonModule.DataFormEditorType.List:
                this._editorClass = TKDataFormOptionsEditor.class();
                break;
            case commonModule.DataFormEditorType.AutoCompleteInline:
                this._editorClass = TKDataFormAutoCompleteInlineEditor.class();
                break;
            case commonModule.DataFormEditorType.Label:
                this._editorClass = TKDataFormLabelEditor.class();
                break;
            default:
                console.log("WARNING: Unsupported editor type: " + this.type);
        }
    };
    PropertyEditor._getNativeEditorType = function (nativeEditor) {
        if (nativeEditor instanceof TKDataFormMultilineTextEditor) {
            return commonModule.DataFormEditorType.MultilineText;
        }
        if (nativeEditor instanceof TKDataFormEmailEditor) {
            return commonModule.DataFormEditorType.Email;
        }
        if (nativeEditor instanceof TKDataFormPasswordEditor) {
            return commonModule.DataFormEditorType.Password;
        }
        if (nativeEditor instanceof TKDataFormPhoneEditor) {
            return commonModule.DataFormEditorType.Phone;
        }
        if (nativeEditor instanceof TKDataFormDecimalEditor) {
            return commonModule.DataFormEditorType.Decimal;
        }
        if (nativeEditor instanceof TKDataFormNumberEditor) {
            return commonModule.DataFormEditorType.Number;
        }
        if (nativeEditor instanceof TKDataFormSwitchEditor) {
            return commonModule.DataFormEditorType.Switch;
        }
        if (nativeEditor instanceof TKDataFormStepperEditor) {
            return commonModule.DataFormEditorType.Stepper;
        }
        if (nativeEditor instanceof TKDataFormSliderEditor) {
            return commonModule.DataFormEditorType.Slider;
        }
        if (nativeEditor instanceof TKDataFormSegmentedEditor) {
            return commonModule.DataFormEditorType.SegmentedEditor;
        }
        if (nativeEditor instanceof TKDataFormTimePickerEditor) {
            return commonModule.DataFormEditorType.TimePicker;
        }
        if (nativeEditor instanceof TKDataFormDatePickerEditor) {
            return commonModule.DataFormEditorType.DatePicker;
        }
        if (nativeEditor instanceof TKDataFormPickerViewEditor) {
            return commonModule.DataFormEditorType.Picker;
        }
        if (nativeEditor instanceof TKDataFormOptionsEditor) {
            return commonModule.DataFormEditorType.List;
        }
        if (nativeEditor instanceof TKDataFormAutoCompleteInlineEditor) {
            return commonModule.DataFormEditorType.AutoCompleteInline;
        }
        if (nativeEditor instanceof TKDataFormLabelEditor) {
            return commonModule.DataFormEditorType.Label;
        }
        return commonModule.DataFormEditorType.Text;
    };
    return PropertyEditor;
}(commonModule.PropertyEditor));
exports.PropertyEditor = PropertyEditor;
var CustomPropertyEditor = /** @class */ (function (_super) {
    __extends(CustomPropertyEditor, _super);
    function CustomPropertyEditor() {
        var _this = _super.call(this) || this;
        _this._nativeDelegate = TKDataFormCustomEditorDelegateImplementation.new().initWithOwner(_this);
        return _this;
    }
    Object.defineProperty(CustomPropertyEditor.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        set: function (value) {
            this._ios = value;
            this.setNativeView(value);
            if (this._label) {
                this._removeView(this._label);
            }
            if (this._editorCore) {
                this._removeView(this._editorCore);
            }
            if (this._ios) {
                this._label = new DataFormEditorLabel(this);
                this._editorCore = new DataFormEditorCore(this);
                this._addView(this._label);
                this._addView(this._editorCore);
            }
            else {
                this._label = null;
                this._editorCore = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomPropertyEditor.prototype, "label", {
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomPropertyEditor.prototype, "editorCore", {
        get: function () {
            return this._editorCore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomPropertyEditor.prototype, "editorClass", {
        get: function () {
            return this._editorClass;
        },
        enumerable: true,
        configurable: true
    });
    CustomPropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyStyleForProperty(this, propertyName);
    };
    CustomPropertyEditor.prototype.onParamsChanged = function (oldValue, newValue) {
        PropertyEditorHelper._applyParams(this);
    };
    CustomPropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
        PropertyEditorHelper._applyParams(this);
    };
    CustomPropertyEditor.prototype.onTypeChanged = function (oldValue, newValue) {
        console.log("WARNING: You can't change CustomPropertyEditor's type");
    };
    CustomPropertyEditor.prototype.notifyValueChanged = function () {
        if (this.ios) {
            this.ios.notifyValueChange();
        }
    };
    return CustomPropertyEditor;
}(commonModule.CustomPropertyEditor));
exports.CustomPropertyEditor = CustomPropertyEditor;
var PropertyEditorHelper = /** @class */ (function () {
    function PropertyEditorHelper() {
    }
    PropertyEditorHelper._linkEditorWithNative = function (editor, value) {
        if (editor instanceof CustomPropertyEditor) {
            editor.ios = value;
        }
        else {
            editor.ios = value;
        }
        if (!editor.propertyEditorStyle) {
            editor.propertyEditorStyle = new commonModule.PropertyEditorStyle();
        }
        if (!editor.params) {
            editor.params = new commonModule.PropertyEditorParams();
        }
        PropertyEditorHelper._onNativeSet(editor);
    };
    PropertyEditorHelper._onNativeSet = function (editor) {
        if (!editor.ios) {
            return;
        }
        if (editor instanceof CustomPropertyEditor) {
            editor.ios.delegate = editor._nativeDelegate;
        }
        else {
            if (!editor.type) {
                editor.type = PropertyEditor._getNativeEditorType(editor.ios);
            }
        }
        PropertyEditorHelper._applyParams(editor);
    };
    PropertyEditorHelper._updateLabelTextColor = function (editor, labelTextColor) {
        if (!editor.ios || labelTextColor === undefined) {
            return;
        }
        editor.ios.textLabel.textColor = labelTextColor.ios;
    };
    PropertyEditorHelper._updateLabelFont = function (editor, labelFontName, labelTextSize, labelFontStyle) {
        if (!editor.ios ||
            (labelFontName === undefined && labelFontStyle === undefined && labelTextSize === undefined)) {
            return;
        }
        editor.ios.textLabel.font = RadDataForm.getFontWithProperties(labelFontName, labelTextSize, labelFontStyle);
    };
    PropertyEditorHelper._updateLabelOffset = function (editor, labelHorizontalOffset, labelVerticalOffset) {
        if (!editor.ios || (labelHorizontalOffset === undefined && labelVerticalOffset === undefined)) {
            return;
        }
        editor.ios.style.textLabelOffset = {
            horizontal: (isNaN(labelHorizontalOffset)) ? 0 : labelHorizontalOffset,
            vertical: (isNaN(labelVerticalOffset)) ? 0 : labelVerticalOffset
        };
    };
    PropertyEditorHelper._updateEditorOffset = function (editor, editorHorizontalOffset, editorVerticalOffset) {
        if (!editor.ios || (editorHorizontalOffset === undefined && editorVerticalOffset === undefined)) {
            return;
        }
        editor.ios.style.editorOffset = {
            horizontal: (isNaN(editorHorizontalOffset)) ? 0 : editorHorizontalOffset,
            vertical: (isNaN(editorVerticalOffset)) ? 0 : editorVerticalOffset
        };
    };
    PropertyEditorHelper._updateEditorFillColor = function (editor, editorFillColor) {
        if (!editor.ios || editorFillColor === undefined) {
            return;
        }
        editor.ios.style.fill = TKSolidFill.solidFillWithColor(editorFillColor.ios);
    };
    PropertyEditorHelper._updateEditorStroke = function (editor, editorStrokeColor, editorStrokeWidth) {
        if (!editor.ios || (editorStrokeColor === undefined && editorStrokeWidth === undefined)) {
            return;
        }
        var stroke = TKStroke.new();
        if (editorStrokeWidth) {
            stroke.width = editorStrokeWidth;
        }
        if (editorStrokeColor) {
            stroke.color = editorStrokeColor.ios;
        }
        editor.ios.style.stroke = stroke;
    };
    PropertyEditorHelper._updateLabelHidden = function (editor, labelHidden) {
        if (!editor.ios || labelHidden === undefined) {
            return;
        }
        editor.ios.style.textLabelDisplayMode = labelHidden ? 1 /* Hidden */ : 0 /* Show */;
    };
    PropertyEditorHelper._updateLabelPosition = function (editor, labelPosition) {
        if (!editor.ios || labelPosition === undefined) {
            return;
        }
        if (labelPosition === commonModule.DataFormLabelPosition.Left) {
            editor.ios.labelPosition = 0 /* TKDataFormLabelPositionLeft */;
            editor.ios.setNeedsLayout();
        }
        else if (labelPosition === commonModule.DataFormLabelPosition.Top) {
            editor.ios.labelPosition = 1 /* TKDataFormLabelPositionTop */;
            editor.ios.setNeedsLayout();
        }
    };
    PropertyEditorHelper._updateLabelWidth = function (editor, labelWidth) {
        if (!editor.ios || labelWidth === -1) {
            return;
        }
        editor.ios.style.textLabelWidth = labelWidth;
        editor.ios.setNeedsLayout();
    };
    PropertyEditorHelper._updateSeparatorColor = function (editor, separatorColor) {
        if (!editor.ios || separatorColor === undefined) {
            return;
        }
        editor.ios.style.separatorColor = TKSolidFill.solidFillWithColor(separatorColor.ios);
        editor.ios.setNeedsDisplay();
    };
    PropertyEditorHelper._applyParams = function (editor) {
        var editorParams = editor.params;
        if (!editorParams) {
            return;
        }
        if (editorParams.minimum && editorParams.maximum) {
            if (!isNaN(editorParams.minimum) && !isNaN(editorParams.maximum)) {
                PropertyEditorHelper._updateNativeRange(editor, TKRange.rangeWithMinimumAndMaximum(editorParams.minimum, editorParams.maximum));
            }
        }
        if (editorParams.step && !isNaN(editorParams.step)) {
            PropertyEditorHelper._updateNativeStep(editor, editorParams.step);
        }
    };
    PropertyEditorHelper._updateNativeRange = function (editor, range) {
        if (!editor.ios) {
            return;
        }
        if (editor.ios.property.range === range) {
            return;
        }
        editor.ios.property.range = range;
        editor.ios.update();
    };
    PropertyEditorHelper._updateNativeStep = function (editor, step) {
        if (!editor.ios) {
            return;
        }
        if (editor.ios.property.step === step) {
            return;
        }
        editor.ios.property.step = step;
        editor.ios.update();
    };
    PropertyEditorHelper.applyStyle = function (editor) {
        if (!editor.propertyEditorStyle || !editor.ios) {
            return;
        }
        PropertyEditorHelper._updateLabelTextColor(editor, editor.propertyEditorStyle.labelTextColor);
        PropertyEditorHelper._updateLabelFont(editor, editor.propertyEditorStyle.labelFontName, editor.propertyEditorStyle.labelTextSize, editor.propertyEditorStyle.labelFontStyle);
        PropertyEditorHelper._updateLabelOffset(editor, editor.propertyEditorStyle.labelHorizontalOffset, editor.propertyEditorStyle.labelVerticalOffset);
        PropertyEditorHelper._updateEditorOffset(editor, editor.propertyEditorStyle.editorHorizontalOffset, editor.propertyEditorStyle.editorVerticalOffset);
        PropertyEditorHelper._updateEditorFillColor(editor, editor.propertyEditorStyle.fillColor);
        PropertyEditorHelper._updateEditorStroke(editor, editor.propertyEditorStyle.strokeColor, editor.propertyEditorStyle.strokeWidth);
        PropertyEditorHelper._updateLabelHidden(editor, editor.propertyEditorStyle.labelHidden);
        PropertyEditorHelper._updateLabelPosition(editor, editor.propertyEditorStyle.labelPosition);
        PropertyEditorHelper._updateLabelWidth(editor, editor.propertyEditorStyle.labelWidth);
        PropertyEditorHelper._updateSeparatorColor(editor, editor.propertyEditorStyle.separatorColor);
        PropertyEditorHelper.setNeedsLayout(editor);
        PropertyEditorHelper.setNeedsDisplay(editor);
    };
    PropertyEditorHelper.setNeedsDisplay = function (editor) {
        if (editor.ios) {
            editor.ios.setNeedsDisplay();
        }
    };
    PropertyEditorHelper.setNeedsLayout = function (editor) {
        if (editor.ios) {
            editor.ios.setNeedsLayout();
        }
    };
    PropertyEditorHelper.applyStyleForProperty = function (editor, propertyName) {
        if (!editor.propertyEditorStyle || !editor.ios) {
            return;
        }
        switch (propertyName) {
            case "labelTextColor":
                PropertyEditorHelper._updateLabelTextColor(editor, editor.propertyEditorStyle.labelTextColor);
                break;
            case "labelFontName":
            case "labelFontStyle":
            case "labelTextSize":
                PropertyEditorHelper._updateLabelFont(editor, editor.propertyEditorStyle.labelFontName, editor.propertyEditorStyle.labelTextSize, editor.propertyEditorStyle.labelFontStyle);
                break;
            case "labelHorizontalOffset":
            case "labelVerticalOffset":
                PropertyEditorHelper._updateLabelOffset(editor, editor.propertyEditorStyle.labelHorizontalOffset, editor.propertyEditorStyle.labelVerticalOffset);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "editorHorizontalOffset":
            case "editorVerticalOffset":
                PropertyEditorHelper._updateEditorOffset(editor, editor.propertyEditorStyle.editorHorizontalOffset, editor.propertyEditorStyle.editorVerticalOffset);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "fillColor":
                PropertyEditorHelper._updateEditorFillColor(editor, editor.propertyEditorStyle.fillColor);
                PropertyEditorHelper.setNeedsDisplay(editor);
                break;
            case "strokeColor":
            case "strokeWidth":
                PropertyEditorHelper._updateEditorStroke(editor, editor.propertyEditorStyle.strokeColor, editor.propertyEditorStyle.strokeWidth);
                PropertyEditorHelper.setNeedsDisplay(editor);
                break;
            case "labelHidden":
                PropertyEditorHelper._updateLabelHidden(editor, editor.propertyEditorStyle.labelHidden);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "labelPosition":
                PropertyEditorHelper._updateLabelPosition(editor, editor.propertyEditorStyle.labelPosition);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "labelWidth":
                PropertyEditorHelper._updateLabelWidth(editor, editor.propertyEditorStyle.labelWidth);
                PropertyEditorHelper.setNeedsLayout(editor);
                break;
            case "separatorColor":
                PropertyEditorHelper._updateSeparatorColor(editor, editor.propertyEditorStyle.separatorColor);
                PropertyEditorHelper.setNeedsDisplay(editor);
                break;
        }
    };
    return PropertyEditorHelper;
}());
exports.PropertyEditorHelper = PropertyEditorHelper;
//////////////////////////////////////////////////////////////////////////////////////////////
// Validators
var PropertyValidator = /** @class */ (function (_super) {
    __extends(PropertyValidator, _super);
    function PropertyValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormManualValidator.new();
        _this._nativeDelegate = TKDataFormValidationProviderDelegateImplementation.new().initWithOwner(_this);
        _this._ios.delegate = _this._nativeDelegate;
        if (_this.errorMessage === undefined) {
            _this.errorMessage = "This is not valid.";
        }
        return _this;
    }
    Object.defineProperty(PropertyValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    PropertyValidator.prototype.validate = function (value, propertyName) {
        return true;
    };
    return PropertyValidator;
}(commonModule.PropertyValidator));
exports.PropertyValidator = PropertyValidator;
var MinimumLengthValidator = /** @class */ (function (_super) {
    __extends(MinimumLengthValidator, _super);
    function MinimumLengthValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormMinimumLengthValidator.new();
        return _this;
    }
    Object.defineProperty(MinimumLengthValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MinimumLengthValidator.prototype.onLengthChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this.ios.minimumLength = newValue;
        }
    };
    return MinimumLengthValidator;
}(commonModule.MinimumLengthValidator));
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = /** @class */ (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormMaximumLengthValidator.new();
        return _this;
    }
    Object.defineProperty(MaximumLengthValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    MaximumLengthValidator.prototype.onLengthChanged = function (oldValue, newValue) {
        if (!isNaN(newValue)) {
            this.ios.maximumLegth = newValue;
        }
    };
    return MaximumLengthValidator;
}(commonModule.MaximumLengthValidator));
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = /** @class */ (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormEmailValidator.new();
        return _this;
    }
    Object.defineProperty(EmailValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return EmailValidator;
}(commonModule.EmailValidator));
exports.EmailValidator = EmailValidator;
var NonEmptyValidator = /** @class */ (function (_super) {
    __extends(NonEmptyValidator, _super);
    function NonEmptyValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormNonEmptyValidator.new();
        return _this;
    }
    Object.defineProperty(NonEmptyValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return NonEmptyValidator;
}(commonModule.NonEmptyValidator));
exports.NonEmptyValidator = NonEmptyValidator;
var RangeValidator = /** @class */ (function (_super) {
    __extends(RangeValidator, _super);
    function RangeValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormRangeValidator.new();
        return _this;
    }
    Object.defineProperty(RangeValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RangeValidator.prototype.onMinimumChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            if (this.ios.range) {
                this.ios.range.minimum = newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(newValue, newValue * 2);
            }
        }
    };
    RangeValidator.prototype.onMaximumChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            if (this.ios.range) {
                this.ios.range.maximum = newValue;
            }
            else {
                this.ios.range = TKRange.rangeWithMinimumAndMaximum(newValue / 2, newValue);
            }
        }
    };
    return RangeValidator;
}(commonModule.RangeValidator));
exports.RangeValidator = RangeValidator;
var PhoneValidator = /** @class */ (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormPhoneValidator.new();
        return _this;
    }
    Object.defineProperty(PhoneValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return PhoneValidator;
}(commonModule.PhoneValidator));
exports.PhoneValidator = PhoneValidator;
var RegExValidator = /** @class */ (function (_super) {
    __extends(RegExValidator, _super);
    function RegExValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormRegExValidator.new();
        return _this;
    }
    Object.defineProperty(RegExValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    RegExValidator.prototype.onRegExChanged = function (oldValue, newValue) {
        this._ios.regEx = newValue;
    };
    return RegExValidator;
}(commonModule.RegExValidator));
exports.RegExValidator = RegExValidator;
var IsTrueValidator = /** @class */ (function (_super) {
    __extends(IsTrueValidator, _super);
    function IsTrueValidator() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormIsTrueValidator.new();
        return _this;
    }
    Object.defineProperty(IsTrueValidator.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return IsTrueValidator;
}(commonModule.IsTrueValidator));
exports.IsTrueValidator = IsTrueValidator;
//////////////////////////////////////////////////////////////////////////////////////////////
// Converters
var StringToDateConverter = /** @class */ (function (_super) {
    __extends(StringToDateConverter, _super);
    function StringToDateConverter() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormStringToDateConverter.new();
        return _this;
    }
    Object.defineProperty(StringToDateConverter.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return StringToDateConverter;
}(commonModule.StringToDateConverter));
exports.StringToDateConverter = StringToDateConverter;
var StringToTimeConverter = /** @class */ (function (_super) {
    __extends(StringToTimeConverter, _super);
    function StringToTimeConverter() {
        var _this = _super.call(this) || this;
        _this._ios = TKDataFormStringToTimeConverter.new();
        return _this;
    }
    Object.defineProperty(StringToTimeConverter.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    return StringToTimeConverter;
}(commonModule.StringToTimeConverter));
exports.StringToTimeConverter = StringToTimeConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZGF0YWZvcm0uaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktZGF0YWZvcm0uaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQXFEO0FBQ3JELGdEQUErQztBQUMvQyxzREFBNkQ7QUFFN0Qsb0RBQXNEO0FBQ3RELGlEQUFtRDtBQUNuRCx5REFBd0Q7QUFDeEQsNkVBQXVFO0FBQ3ZFLHNEQUk4RDtBQUU5RCwwQ0FBcUM7QUFFckM7SUFBK0Msb0RBQVE7SUFBdkQ7O0lBa2VBLENBQUM7SUEvZFUsb0NBQUcsR0FBVjtRQUNJLE9BQXlDLE9BQU0sR0FBRyxXQUFFLENBQUM7SUFDekQsQ0FBQztJQUlNLHdEQUFhLEdBQXBCLFVBQXFCLEtBQWtCO1FBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksNkVBQWtDLEdBQXpDLFVBQTBDLFFBQW9CLEVBQUUsTUFBd0IsRUFBRSxRQUEwQjtRQUNoSCxJQUFJLElBQUksR0FBbUM7WUFDdkMsU0FBUyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsbUJBQW1CO1lBQ3ZELE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUN6QixNQUFNLEVBQUUsTUFBTTtZQUNkLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUMzQixLQUFLLEVBQUUsU0FBUztZQUNoQixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDN0IsV0FBVyxFQUFFLElBQUk7U0FDcEIsQ0FBQztRQUM0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7O09BRUc7SUFDSSwrRUFBb0MsR0FBM0MsVUFBNEMsUUFBb0IsRUFBRSxN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RCxDQUFxQyxZQUFZLENBQUMsZUFBZSxHQVdoRTtBQVhZLDBDQUFlO0FBYzVCLDhGQUE4RjtBQUM5RixhQUFhO0FBQ2I7SUFBMkMseUNBQWtDO0lBTXpFO1FBQUEsWUFDSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLElBQUksR0FBRywrQkFBK0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7SUFDdEQsQ0FBQztJQVBELHNCQUFXLHNDQUFHO2FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFNTCw0QkFBQztBQUFELENBQUMsQUFWRCxDQUEyQyxZQUFZLENBQUMscUJBQXFCLEdBVTVFO0FBVlksc0RBQXFCO0FBWWxDO0lBQTJDLHlDQUFrQztJQU16RTtRQUFBLFlBQ0ksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxJQUFJLEdBQUcsK0JBQStCLENBQUMsR0FBRyxFQUFFLENBQUM7O0lBQ3RELENBQUM7SUFQRCxzQkFBVyxzQ0FBRzthQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBTUwsNEJBQUM7QUFBRCxDQUFDLEFBVkQsQ0FBMkMsWUFBWSxDQUFDLHFCQUFxQixHQVU1RTtBQVZZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvbW1vbk1vZHVsZSBmcm9tIFwiLi91aS1kYXRhZm9ybS5jb21tb25cIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIjtcbmltcG9ydCB7IFZpZXcsIGxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZU1vZHVsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBlbnVtcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiO1xuaW1wb3J0IHsgRm9udCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvZm9udFwiO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlRGlzcGxheU1vZGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgY29sb3JQcm9wZXJ0eSwgZm9udEludGVybmFsUHJvcGVydHksIHdpZHRoUHJvcGVydHksXG4gICAgcGFkZGluZ0JvdHRvbVByb3BlcnR5LCBwYWRkaW5nVG9wUHJvcGVydHksIHBhZGRpbmdMZWZ0UHJvcGVydHksIHBhZGRpbmdSaWdodFByb3BlcnR5LFxuICAgIG1hcmdpbkxlZnRQcm9wZXJ0eSwgbWFyZ2luVG9wUHJvcGVydHksIG1hcmdpblJpZ2h0UHJvcGVydHksIG1hcmdpbkJvdHRvbVByb3BlcnR5LFxuICAgIGJvcmRlckxlZnRXaWR0aFByb3BlcnR5LCBib3JkZXJUb3BXaWR0aFByb3BlcnR5LCBib3JkZXJSaWdodFdpZHRoUHJvcGVydHksIGJvcmRlckJvdHRvbVdpZHRoUHJvcGVydHksXG4gICAgdmlzaWJpbGl0eVByb3BlcnR5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBWaXNpYmlsaXR5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1wcm9wZXJ0aWVzXCI7XG5leHBvcnQgKiBmcm9tICcuL3VpLWRhdGFmb3JtLmNvbW1vbic7XG5cbmNsYXNzIFRLRGF0YUZvcm1EZWxlZ2F0ZUltcGxlbWVudGF0aW9uIGV4dGVuZHMgTlNPYmplY3QgaW1wbGVtZW50cyBUS0RhdGFGb3JtRGVsZWdhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtUS0RhdGFGb3JtRGVsZWdhdGVdO1xuXG4gICAgc3RhdGljIG5ldygpOiBUS0RhdGFGb3JtRGVsZWdhdGVJbXBsZW1lbnRhdGlvbiB7XG4gICAgICAgIHJldHVybiA8VEtEYXRhRm9ybURlbGVnYXRlSW1wbGVtZW50YXRpb24+c3VwZXIubmV3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3duZXI6IFdlYWtSZWY8UmFkRGF0YUZvcm0+O1xuXG4gICAgcHVibGljIGluaXRXaXRoT3duZXIob3duZXI6IFJhZERhdGFGb3JtKTogVEtEYXRhRm9ybURlbGVnYXRlSW1wbGVtZW50YXRpb24ge1xuICAgICAgICB0aGlzLl9vd25lciA9IG5ldyBXZWFrUmVmKG93bmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gYSByb3cgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpcyBzZWxlY3RlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1EaWRTZWxlY3RFZGl0b3JGb3JQcm9wZXJ0eShkYXRhRm9ybTogVEtEYXRhRm9ybSwgZWRpdG9yOiBUS0RhdGFGb3JtRWRpdG9yLCBwcm9wZXJ0eTogVEtFbnRpdHlQcm9wZXJ0eSk6IHZvaWQge1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0uZWRpdG9yU2VsZWN0ZWRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IGVkaXRvcixcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgIGdyb3VwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBncm91cE5hbWU6IHByb3BlcnR5Lmdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gYSByb3cgd2l0aCB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpcyBkZXNlbGVjdGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhRm9ybURpZERlc2VsZWN0RWRpdG9yRm9yUHJvcGVydHkoZGF0YUZvcm06IFRLRGF0YUZvcm0sIGVkaXRvcjogVEtEYXRhRm9ybUVkaXRvciwgcHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLmVkaXRvckRlc2VsZWN0ZWRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IGVkaXRvcixcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgIGdyb3VwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBncm91cE5hbWU6IHByb3BlcnR5Lmdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGFmdGVyIGEgcHJvcGVydHkgaXMgZWRpdGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhRm9ybURpZEVkaXRQcm9wZXJ0eShkYXRhRm9ybTogVEtEYXRhRm9ybSwgcHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLnByb3BlcnR5RWRpdGVkRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLmdldCgpLFxuICAgICAgICAgICAgZWRpdG9yOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5Lm5hbWUsXG4gICAgICAgICAgICBncm91cDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wZXJ0eS5ncm91cE5hbWUsXG4gICAgICAgICAgICByZXR1cm5WYWx1ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICAoPG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZT50aGlzLl9vd25lci5nZXQoKSkubm90aWZ5KGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciBhIHByb3BlcnR5IGlzIHZhbGlkYXRlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1EaWRWYWxpZGF0ZVByb3BlcnR5RWRpdG9yKGRhdGFGb3JtOiBUS0RhdGFGb3JtLCBwcm9wZXJ0eTogVEtFbnRpdHlQcm9wZXJ0eSwgZWRpdG9yOiBUS0RhdGFGb3JtRWRpdG9yKTogdm9pZCB7XG4gICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eSA9IHRoaXMuX293bmVyLmdldCgpLmdldFByb3BlcnR5QnlOYW1lKHByb3BlcnR5Lm5hbWUpO1xuICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLl9vd25lci5nZXQoKS5nZXRHcm91cEJ5TmFtZShwcm9wZXJ0eS5ncm91cE5hbWUpO1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0ucHJvcGVydHlWYWxpZGF0ZWRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IGVudGl0eVByb3BlcnR5LmVkaXRvcixcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBlbnRpdHlQcm9wZXJ0eSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgIGdyb3VwOiBncm91cCxcbiAgICAgICAgICAgIGdyb3VwTmFtZTogcHJvcGVydHkuZ3JvdXBOYW1lLFxuICAgICAgICAgICAgcmV0dXJuVmFsdWU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgKDxvYnNlcnZhYmxlTW9kdWxlLk9ic2VydmFibGU+dGhpcy5fb3duZXIuZ2V0KCkpLm5vdGlmeShhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgdmFsaWRhdGUgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZCB0byBub3RpZnkgdGhhdCB0aGUgcHJvY2VzcyBoYXMgZW5kZWQuXG4gICAgICovXG4gICAgcHVibGljIGRhdGFGb3JtRGlkRmluaXNoVmFsaWRhdGlvbihkYXRhRm9ybTogVEtEYXRhRm9ybSwgcmVzdWx0OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLl9vd25lci5nZXQoKS5fdmFsaWRhdGVSZXNvbHZlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLl92YWxpZGF0ZVJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLl92YWxpZGF0ZVJlc29sdmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciBjb21taXQgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZCB0byBub3RpZnkgdGhhdCB0aGUgcHJvY2VzcyBoYXMgZW5kZWQuXG4gICAgICovXG4gICAgcHVibGljIGRhdGFGb3JtRGlkRmluaXNoQ29tbWl0KGRhdGFGb3JtOiBUS0RhdGFGb3JtLCByZXN1bHQ6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmdldCgpLl9jb21taXRSZXNvbHZlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLl9jb21taXRSZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5fY29tbWl0UmVzb2x2ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gYSBwcm9wZXJ0eSBoYXMgdG8gYmUgdmFsaWRhdGVkLlxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhRm9ybVZhbGlkYXRlUHJvcGVydHlFZGl0b3IoZGF0YUZvcm06IFRLRGF0YUZvcm0sIHByb3BlcnR5OiBUS0VudGl0eVByb3BlcnR5LCBlZGl0b3I6IFRLRGF0YUZvcm1FZGl0b3IpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gdGhpcy5fb3duZXIuZ2V0KCkuZ2V0UHJvcGVydHlCeU5hbWUocHJvcGVydHkubmFtZSk7XG4gICAgICAgIGxldCB2YWxpZGF0ZWRWYWx1ZSA9IHByb3BlcnR5LnZhbHVlQ2FuZGlkYXRlO1xuICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLl9vd25lci5nZXQoKS5nZXRHcm91cEJ5TmFtZShwcm9wZXJ0eS5ncm91cE5hbWUpO1xuXG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWREYXRhRm9ybS5wcm9wZXJ0eVZhbGlkYXRlRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLmdldCgpLFxuICAgICAgICAgICAgZWRpdG9yOiBlbnRpdHlQcm9wZXJ0eS5lZGl0b3IsXG4gICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eTogZW50aXR5UHJvcGVydHksXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5Lm5hbWUsXG4gICAgICAgICAgICBncm91cDogZ3JvdXAsXG4gICAgICAgICAgICBncm91cE5hbWU6IHByb3BlcnR5Lmdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG5cbiAgICAgICAgbGV0IHJlc3VsdCA9IFByb21pc2UucmVzb2x2ZShhcmdzLnJldHVyblZhbHVlKTtcbiAgICAgICAgZGF0YUZvcm0ub25WYWxpZGF0aW9uU3RhcnRlZEVkaXRvcihwcm9wZXJ0eSwgZWRpdG9yKTtcblxuICAgICAgICByZXN1bHQudGhlbigoYW5zd2VyID0+IHtcbiAgICAgICAgICAgIGlmIChhbnN3ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHkuZXJyb3JNZXNzYWdlID0gZW50aXR5UHJvcGVydHkuZXJyb3JNZXNzYWdlO1xuICAgICAgICAgICAgICAgIGRhdGFGb3JtLm9uVmFsaWRhdGlvblJlc3VsdFZhbHVlUHJvcGVydHlFZGl0b3IoZmFsc2UsIHZhbGlkYXRlZFZhbHVlLCBwcm9wZXJ0eSwgZWRpdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHkucG9zaXRpdmVNZXNzYWdlID0gZW50aXR5UHJvcGVydHkuc3VjY2Vzc01lc3NhZ2U7XG4gICAgICAgICAgICAgICAgZGF0YUZvcm0ub25WYWxpZGF0aW9uUmVzdWx0VmFsdWVQcm9wZXJ0eUVkaXRvcih0cnVlLCB2YWxpZGF0ZWRWYWx1ZSwgcHJvcGVydHksIGVkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGFyZ3MucmV0dXJuVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENhbGxlZCBvbmNlIHdoZW4gdGhlIGRhdGEgZm9ybSBjcmVhdGVzIGl0cyBlZGl0b3JzLiBUaGlzIG1ldGhvZCBsZXRzIHlvdSB0byBzZXQgcHJvcGVydGllcyB0aGF0IGFyZSBub3QgZ29pbmcgdG8gYmUgY2hhbmdlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1TZXR1cEVkaXRvckZvclByb3BlcnR5KGRhdGFGb3JtOiBUS0RhdGFGb3JtLCBlZGl0b3I6IFRLRGF0YUZvcm1FZGl0b3IsIHByb3BlcnR5OiBUS0VudGl0eVByb3BlcnR5KTogdm9pZCB7XG4gICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLl9vd25lci5nZXQoKS5nZXRQcm9wZXJ0eUJ5TmFtZShwcm9wZXJ0eS5uYW1lKTtcbiAgICAgICAgaWYgKCFlbnRpdHlQcm9wZXJ0eSkge1xuICAgICAgICAgICAgZW50aXR5UHJvcGVydHkgPSB0aGlzLl9vd25lci5nZXQoKS5fY3JlYXRlUHJvcGVydHlGcm9tTmF0aXZlKHByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmICghdGhpcy5fb3duZXIuZ2V0KCkucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX293bmVyLmdldCgpLnByb3BlcnRpZXMgPSBuZXcgQXJyYXk8RW50aXR5UHJvcGVydHk+KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5wcm9wZXJ0aWVzLnB1c2goZW50aXR5UHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICAgIGVudGl0eVByb3BlcnR5Ll91cGRhdGVOYXRpdmVFZGl0b3IoZWRpdG9yKTtcblxuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0uZWRpdG9yU2V0dXBFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IGVkaXRvcixcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgIGdyb3VwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBncm91cE5hbWU6IHByb3BlcnR5Lmdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGRhdGFGb3JtRGlkTGF5b3V0RWRpdG9yRm9yUHJvcGVydHkoZGF0YUZvcm06IFRLRGF0YUZvcm0sIGVkaXRvcjogVEtEYXRhRm9ybUVkaXRvciwgcHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmdldCgpLnNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gdGhpcy5fb3duZXIuZ2V0KCkuZ2V0UHJvcGVydHlCeU5hbWUocHJvcGVydHkubmFtZSk7XG4gICAgICAgIGlmIChlbnRpdHlQcm9wZXJ0eSkge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5RWRpdG9yID0gZW50aXR5UHJvcGVydHkuZWRpdG9yO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVkaXRvclBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkZyb21GcmFtZShlZGl0b3IuZnJhbWUpO1xuICAgICAgICAgICAgICAgIHByb3BlcnR5RWRpdG9yLmxheW91dChlZGl0b3JQb3NpdGlvbi5sZWZ0LCBlZGl0b3JQb3NpdGlvbi50b3AsIGVkaXRvclBvc2l0aW9uLnJpZ2h0LCBlZGl0b3JQb3NpdGlvbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgIGxldCBsYWJlbFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkZyb21GcmFtZShlZGl0b3IudGV4dExhYmVsLmZyYW1lKTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUVkaXRvci5sYWJlbC5sYXlvdXQobGFiZWxQb3NpdGlvbi5sZWZ0LCBsYWJlbFBvc2l0aW9uLnRvcCwgbGFiZWxQb3NpdGlvbi5yaWdodCwgbGFiZWxQb3NpdGlvbi5ib3R0b20pO1xuICAgICAgICAgICAgICAgIGxldCBlZGl0b3JDb3JlUG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uRnJvbUZyYW1lKGVkaXRvci5lZGl0b3JDb3JlLmZyYW1lKTtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUVkaXRvci5lZGl0b3JDb3JlLmxheW91dChlZGl0b3JDb3JlUG9zaXRpb24ubGVmdCwgZWRpdG9yQ29yZVBvc2l0aW9uLnRvcCwgZWRpdG9yQ29yZVBvc2l0aW9uLnJpZ2h0LCBlZGl0b3JDb3JlUG9zaXRpb24uYm90dG9tKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogIENhbGxlZCB3aGVuIHRoZSBkYXRhIGlzIHJlbG9hZGVkIGluIHRoZSBuYXRpdmUgUmFkRGF0YUZvcm0gY29tcG9uZW50IChyZWxvYWREYXRhKS4gVGhpcyBtZXRob2QgbGV0cyB5b3UgdG8gc2V0IHRoZSBQcm9wZXJ0eUNoYW5nZWQgY2FsbGJhY2tzIGZvciBhbGwge059IHByb3BlcnRpZXMuXG4gICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1EaWRGaW5pc2hFZGl0b3JJbnRpdGlhbGl6YXRpb24oZGF0YUZvcm06IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fb3duZXIuZ2V0KCkuc291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3duZXIuZ2V0KCkucHJvcGVydGllcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9vd25lci5nZXQoKS5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gPEVudGl0eVByb3BlcnR5PnRoaXMuX293bmVyLmdldCgpLnByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuX2F0dGFjaEVudGl0eVByb3BlcnR5UHJvcGVydHlDaGFuZ2VMaXN0ZW5lcihlbnRpdHlQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eVByb3BlcnR5LmVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eS5fdXBkYXRlTmF0aXZlRWRpdG9yKGVudGl0eVByb3BlcnR5LmVkaXRvci5pb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVudGl0eVByb3BlcnR5LnBhcmVudCAmJiAhZW50aXR5UHJvcGVydHkuZWRpdG9yLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuX2FkZFZpZXcoZW50aXR5UHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHkuX2FkZFZpZXcoZW50aXR5UHJvcGVydHkuZWRpdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgbmdLZXkgPSB0aGlzLl9vd25lci5nZXQoKS5fbmdLZXk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZ0tleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIGFueSBuZXdseSBjcmVhdGVkIGVkaXRvcnMgdG8gdGhlIHNhbWUgc2NvcGUgYXMgUmFkRGF0YUZvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIG9yZGVyIHRvIGFwcGx5IGNvbXBvbmVudC1zcGVjaWZpYyBjc3MgaW4gYW5ndWxhclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5nVmFsdWUgPSB0aGlzLl9vd25lci5nZXQoKVtuZ0tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eVtuZ0tleV0gPSBuZ1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHkuZWRpdG9yW25nS2V5XSA9IG5nVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eS5lZGl0b3IubGFiZWxbbmdLZXldID0gbmdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudGl0eVByb3BlcnR5LmVkaXRvci5lZGl0b3JDb3JlW25nS2V5XSA9IG5nVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3duZXIuZ2V0KCkuZ3JvdXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX293bmVyLmdldCgpLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBncm91cCA9IHRoaXMuX293bmVyLmdldCgpLmdyb3Vwc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXAucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyb3VwLnByb3BlcnRpZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT5ncm91cC5wcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuX2F0dGFjaEVudGl0eVByb3BlcnR5UHJvcGVydHlDaGFuZ2VMaXN0ZW5lcihlbnRpdHlQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZW50aXR5UHJvcGVydHkuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHkuX3VwZGF0ZU5hdGl2ZUVkaXRvcihlbnRpdHlQcm9wZXJ0eS5lZGl0b3IuaW9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5fb25Dc3NTdGF0ZUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb25Gcm9tRnJhbWUoZnJhbWU6IENHUmVjdCk6IHsgbGVmdCwgdG9wLCByaWdodCwgYm90dG9tIH0ge1xuICAgICAgICBjb25zdCBsZWZ0ID0gbGF5b3V0LnJvdW5kKGxheW91dC50b0RldmljZVBpeGVscyhmcmFtZS5vcmlnaW4ueCkpO1xuICAgICAgICBjb25zdCB0b3AgPSBsYXlvdXQucm91bmQobGF5b3V0LnRvRGV2aWNlUGl4ZWxzKGZyYW1lLm9yaWdpbi55KSk7XG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gbGF5b3V0LnJvdW5kKGxheW91dC50b0RldmljZVBpeGVscyhmcmFtZS5vcmlnaW4ueCArIGZyYW1lLnNpemUud2lkdGgpKTtcbiAgICAgICAgY29uc3QgYm90dG9tID0gbGF5b3V0LnJvdW5kKGxheW91dC50b0RldmljZVBpeGVscyhmcmFtZS5vcmlnaW4ueSArIGZyYW1lLnNpemUuaGVpZ2h0KSk7XG5cbiAgICAgICAgcmV0dXJuIHsgbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGJlZm9yZSBhbiBlZGl0b3IgaXMgZGlzcGxheWVkIHRvIHRoZSBzY3JlZW4gb3IgYWZ0ZXIgdmFsaWRhdGlvbi4gVGhpcyBtZXRob2QgbGV0cyB5b3UgY2hhbmdlIHRoZSB2aXN1YWwgc3R5bGVzIGFuZCBzZXR0aW5nIG9mIFRLRGF0YUZvcm1FZGl0b3Igb2JqZWN0LlxuICAgICAqL1xuICAgIHB1YmxpYyBkYXRhRm9ybVVwZGF0ZUVkaXRvckZvclByb3BlcnR5KGRhdGFGb3JtOiBUS0RhdGFGb3JtLCBlZGl0b3I6IFRLRGF0YUZvcm1FZGl0b3IsIHByb3BlcnR5OiBUS0VudGl0eVByb3BlcnR5KTogdm9pZCB7XG5cbiAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gdGhpcy5fb3duZXIuZ2V0KCkuZ2V0UHJvcGVydHlCeU5hbWUocHJvcGVydHkubmFtZSk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLmFwcGx5U3R5bGUoZW50aXR5UHJvcGVydHkuZWRpdG9yKTtcblxuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0uZWRpdG9yVXBkYXRlRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLmdldCgpLFxuICAgICAgICAgICAgZWRpdG9yOiBlZGl0b3IsXG4gICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BlcnR5Lm5hbWUsXG4gICAgICAgICAgICBncm91cDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wZXJ0eS5ncm91cE5hbWUsXG4gICAgICAgICAgICByZXR1cm5WYWx1ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICAoPG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZT50aGlzLl9vd25lci5nZXQoKSkubm90aWZ5KGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIGxldHMgeW91IGNoYW5nZSB0aGUgdmlzdWFsIHN0eWxlcyBhbmQgc2V0dGluZyBvZiBUS0VudGl0eVByb3BlcnR5R3JvdXBWaWV3IG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1VcGRhdGVHcm91cFZpZXdGb3JHcm91cEF0SW5kZXgoZGF0YUZvcm06IFRLRGF0YUZvcm0sIGdyb3VwVmlldzogVEtFbnRpdHlQcm9wZXJ0eUdyb3VwVmlldywgZ3JvdXBJbmRleDogbnVtYmVyKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKGdyb3VwVmlldyA9PSBudWxsIHx8IGdyb3VwVmlldy5ncm91cCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JvdXBOYW1lID0gZ3JvdXBWaWV3Lmdyb3VwLm5hbWU7XG4gICAgICAgIGxldCBncm91cDogUHJvcGVydHlHcm91cCA9IDxQcm9wZXJ0eUdyb3VwPnRoaXMuX293bmVyLmdldCgpLmdldEdyb3VwQnlOYW1lKGdyb3VwTmFtZSk7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXBWaWV3LmNvbGxhcHNpYmxlID0gZ3JvdXAuY29sbGFwc2libGU7XG5cbiAgICAgICAgICAgIGlmIChncm91cC5jb2xsYXBzaWJsZSkge1xuICAgICAgICAgICAgICAgIGlmIChncm91cFZpZXcuaXNDb2xsYXBzZWQgIT09IGdyb3VwLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXAuY29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFZpZXcuY29sbGFwc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwVmlldy5leHBhbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ3JvdXBWaWV3LnRpdGxlVmlldy5oaWRkZW4gPSBncm91cC50aXRsZUhpZGRlbjtcblxuICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuX3VwZGF0ZUdyb3VwTGF5b3V0KGdyb3VwLCBncm91cFZpZXcpO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuZ2V0KCkuX2FwcGx5R3JvdXBUaXRsZVN0eWxlKGdyb3VwVmlldywgZ3JvdXAudGl0bGVTdHlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aHJvdyBldmVudCBmb3IgYWRkaXRpb25hbCBjdXN0b21pemF0aW9uc1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0uZ3JvdXBVcGRhdGVFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGdyb3VwOiBncm91cFZpZXcsXG4gICAgICAgICAgICBncm91cE5hbWU6IGdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIGp1c3QgYmVmb3JlIGEgcHJvcGVydHkgdmFsdWUgd2lsbCBiZSBjb21taXR0ZWQgdG8gdGhlIGJ1c2luZXNzIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1XaWxsQ29tbWl0UHJvcGVydHkoZGF0YUZvcm06IFRLRGF0YUZvcm0sIHByb3BlcnR5OiBUS0VudGl0eVByb3BlcnR5KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eSA9IHRoaXMuX293bmVyLmdldCgpLmdldFByb3BlcnR5QnlOYW1lKHByb3BlcnR5Lm5hbWUpO1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtRXZlbnREYXRhID0ge1xuICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0ucHJvcGVydHlDb21taXRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBlbnRpdHlQcm9wZXJ0eSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgIGdyb3VwOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBncm91cE5hbWU6IHByb3BlcnR5Lmdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG5cbiAgICAgICAgcmV0dXJuIGFyZ3MucmV0dXJuVmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1VzaW5nRGF0ZVRpbWVFZGl0b3IocHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5LmVkaXRvckNsYXNzID09PSBUS0RhdGFGb3JtRGF0ZVBpY2tlckVkaXRvci5jbGFzcygpIHx8XG4gICAgICAgICAgICBwcm9wZXJ0eS5lZGl0b3JDbGFzcyA9PT0gVEtEYXRhRm9ybVRpbWVQaWNrZXJFZGl0b3IuY2xhc3MoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnZlcnRUb1R5cGVkVmFsdWUob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSwgbmF0aXZlUHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpIHtcbiAgICAgICAgLy8gVGhlIG5ld1ZhbHVlIGlzIG9mIHR5cGUgb2JqZWN0LCB3ZSB0cnkgdG8gZGVkdWN0IHRoZSBkZXNpcmVkIHR5cGUgbW9zdGx5IGJhc2VkXG4gICAgICAgIC8vIG9uIHRoZSB0eXBlIG9mIHRoZSBvbGQgdmFsdWUsIHNvIHdlIGNhbiBjYXN0IHRoZSBuZXdWYWx1ZSB0byB0aGUgY29ycmVjdCB0eXBlXG4gICAgICAgIGlmICh0eXBlb2Ygb2xkVmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb2xkVmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKG5ld1ZhbHVlKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNVc2luZ0RhdGVUaW1lRWRpdG9yKG5hdGl2ZVByb3BlcnR5KSkge1xuICAgICAgICAgICAgLy8gVGhlIERhdGUvVGltZSBFZGl0b3JzIGNhbiBlZGl0IHByb3BlcnRpZXMgb2YgdHlwZXMgRGF0ZSBhbmQgU3RyaW5nLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcobmV3VmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUobmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIE5TQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBqc0FycmF5ID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1ZhbHVlLmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICBqc0FycmF5LnB1c2gobmV3VmFsdWVbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VmFsdWUgPSBqc0FycmF5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSBwcm9wZXJ0eSB2YWx1ZSBpcyBjb21taXR0ZWQgdG8gdGhlIGJ1c2luZXNzIG9iamVjdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1EaWRDb21taXRQcm9wZXJ0eShkYXRhRm9ybTogVEtEYXRhRm9ybSwgcHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX293bmVyLmdldCgpLnNvdXJjZS5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eS5uYW1lKSkge1xuICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5fb3duZXIuZ2V0KCkuc291cmNlW3Byb3BlcnR5Lm5hbWVdO1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gcHJvcGVydHkub3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkVmFsdWUgPSB0aGlzLmNvbnZlcnRUb1R5cGVkVmFsdWUob2xkVmFsdWUsIG5ld1ZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5zb3VyY2VbcHJvcGVydHkubmFtZV0gPSB0eXBlZFZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gdGhpcy5fb3duZXIuZ2V0KCkuZ2V0UHJvcGVydHlCeU5hbWUocHJvcGVydHkubmFtZSk7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWREYXRhRm9ybS5wcm9wZXJ0eUNvbW1pdHRlZEV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lci5nZXQoKSxcbiAgICAgICAgICAgIGVkaXRvcjogbnVsbCxcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBlbnRpdHlQcm9wZXJ0eSxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgIGdyb3VwOiBudWxsLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wZXJ0eS5ncm91cE5hbWUsXG4gICAgICAgICAgICByZXR1cm5WYWx1ZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICAoPG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZT50aGlzLl9vd25lci5nZXQoKSkubm90aWZ5KGFyZ3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGxlZCBhZnRlciBhIGdyb3VwIGlzIGNvbGxhcHNlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1EaWRDb2xsYXBzZUdyb3VwVmlldyhkYXRhRm9ybTogVEtEYXRhRm9ybSwgZ3JvdXBWaWV3OiBUS0VudGl0eVByb3BlcnR5R3JvdXBWaWV3KTogdm9pZCB7XG4gICAgICAgIGxldCBncm91cE5hbWUgPSBncm91cFZpZXcgIT0gbnVsbCAmJiBncm91cFZpZXcuZ3JvdXAgIT0gbnVsbCA/IGdyb3VwVmlldy5ncm91cC5uYW1lIDogbnVsbDtcbiAgICAgICAgbGV0IGdyb3VwID0gdGhpcy5fb3duZXIuZ2V0KCkuZ2V0R3JvdXBCeU5hbWUoZ3JvdXBOYW1lKTtcbiAgICAgICAgaWYgKGdyb3VwKSB7XG4gICAgICAgICAgICBncm91cC5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWREYXRhRm9ybS5ncm91cENvbGxhcHNlZEV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lci5nZXQoKSxcbiAgICAgICAgICAgIGVkaXRvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZW50aXR5UHJvcGVydHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZ3JvdXA6IGdyb3VwVmlldyxcbiAgICAgICAgICAgIGdyb3VwTmFtZTogZ3JvdXBOYW1lLFxuICAgICAgICAgICAgcmV0dXJuVmFsdWU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgKDxvYnNlcnZhYmxlTW9kdWxlLk9ic2VydmFibGU+dGhpcy5fb3duZXIuZ2V0KCkpLm5vdGlmeShhcmdzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgYWZ0ZXIgYSBncm91cCBpcyBleHBhbmRlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1EaWRFeHBhbmRHcm91cFZpZXcoZGF0YUZvcm06IFRLRGF0YUZvcm0sIGdyb3VwVmlldzogVEtFbnRpdHlQcm9wZXJ0eUdyb3VwVmlldyk6IHZvaWQge1xuICAgICAgICBsZXQgZ3JvdXBOYW1lID0gZ3JvdXBWaWV3ICE9IG51bGwgJiYgZ3JvdXBWaWV3Lmdyb3VwICE9IG51bGwgPyBncm91cFZpZXcuZ3JvdXAubmFtZSA6IG51bGw7XG4gICAgICAgIGxldCBncm91cCA9IHRoaXMuX293bmVyLmdldCgpLmdldEdyb3VwQnlOYW1lKGdyb3VwTmFtZSk7XG4gICAgICAgIGlmIChncm91cCkge1xuICAgICAgICAgICAgZ3JvdXAuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLmdyb3VwRXhwYW5kZWRFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICBlZGl0b3I6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGdyb3VwOiBncm91cFZpZXcsXG4gICAgICAgICAgICBncm91cE5hbWU6IGdyb3VwTmFtZSxcbiAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGhlYWRlciBmb3IgdGhlIGNvcnJlc3BvbmRpbmcgZ3JvdXAuXG4gICAgICovIC8vIHRvZG86IHVuY29tbWVudCAsIHRoZSBidWcgd2l0aCBudWxsIHZpZXcgaXMgZml4ZWRcbiAgICAvLyBwdWJsaWMgZGF0YUZvcm1WaWV3Rm9ySGVhZGVySW5Hcm91cChkYXRhRm9ybTogVEtEYXRhRm9ybSwgZ3JvdXBJbmRleDogbnVtYmVyKTogYW55IHsgLy9US0VudGl0eVByb3BlcnR5R3JvdXBUaXRsZVZpZXdcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJkYXRhRm9ybVZpZXdGb3JIZWFkZXJJbkdyb3VwXCIpXG4gICAgLy8gfVxuXG4gICAgLy8gdG9kbzogYWRkIGhlaWdodCBwcm9wZXJ0eSB0byBlZGl0b3IgY2xhc3MgaW4gb3JkZXIgdG8gYmUgc2V0IGluIHhtbC5cbiAgICAvKipcbiAgICAgKiBUaGUgaGVpZ2h0IGZvciB0aGUgZWRpdG9yIGF0IHNwZWNpZmllZCBpbmRpY2VzLlxuICAgICAqL1xuICAgIC8vIHB1YmxpYyBkYXRhRm9ybUhlaWdodEZvckVkaXRvckluR3JvdXBBdEluZGV4KGRhdGFGb3JtOiBUS0RhdGFGb3JtLCBncm91cEluZGV4OiBudW1iZXIsIGVkaXRvckluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkRFTEVHQVRFOiBkYXRhRm9ybUhlaWdodEZvckVkaXRvckluR3JvdXBBdEluZGV4XCIpXG5cbiAgICAvLyAgICAgdmFyIGFyZ3M6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUV2ZW50RGF0YSA9IHsgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0uZWRpdG9ySGVpZ2h0RXZlbnQsXG4gICAgLy8gICAgICAgICBvYmplY3Q6IHRoaXMuX293bmVyLFxuICAgIC8vICAgICAgICAgZWRpdG9yOiBlZGl0b3JJbmRleCxcbiAgICAvLyAgICAgICAgIGdyb3VwOiBncm91cEluZGV4LFxuICAgIC8vICAgICAgICAgcmV0dXJuVmFsdWU6IDIwIH07XG4gICAgLy8gICAgIHRoaXMuX293bmVyLm5vdGlmeShhcmdzKTtcblxuICAgIC8vICAgICByZXR1cm4gYXJncy5yZXR1cm5WYWx1ZTtcbiAgICAvLyB9XG5cbiAgICAvLyB0b2RvOiBhZGQgaGVpZ2h0IHByb3BlcnR5IHRvIGdyb3VwIGluIG9yZGVyIHRvIGJlIHNldCBpbiB4bWwuXG4gICAgLyoqXG4gICAgICogVGhlIGhlaWdodCBvZiB0aGUgZ3JvdXAgaGVhZGVyLlxuICAgICAqL1xuICAgIC8vIHB1YmxpYyBkYXRhRm9ybUhlaWdodEZvckhlYWRlckluR3JvdXAoZGF0YUZvcm06IFRLRGF0YUZvcm0sIGdyb3VwSW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiREVMRUdBVEU6IGRhdGFGb3JtSGVpZ2h0Rm9ySGVhZGVySW5Hcm91cFwiKVxuICAgIC8vICAgICByZXR1cm4gMDtcbiAgICAvLyB9XG5cblxuICAgIC8vIHRvZG86IGNvbnNpZGVyIGlzIGl0IGlzIHJlcXVpcmVkIGF0IGFsbC4gQW5kcm9pZCBkb2Vzbid0IHN1cHBvcnQgc3VjaCBraW5kIG9mIHZpZXdcbiAgICAvKipcbiAgICAgKiAgUmV0dXJuIGlucHV0IGFjY2Vzc29yeSB2aWV3IGZvciB0ZXh0IGZpZWxkIGVkaXRvcnMuXG4gICAgICovXG4gICAgLy8gcHVibGljIGlucHV0QWNjZXNzb3J5Vmlld0ZvckRhdGFGb3JtKGRhdGFGb3JtOiBUS0RhdGFGb3JtKTogYW55IHsvL1RLRGF0YUZvcm1BY2Nlc3NvcnlWaWV3XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiREVMRUdBVEU6IGlucHV0QWNjZXNzb3J5Vmlld0ZvckRhdGFGb3JtXCIpXG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYSB2aWV3IGNvbnRyb2xsZXIgc3BlY2lmaWMgZm9yIGEgZ2l2ZW4gdmlldyBjb250cm9sbGVyIGVkaXRvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGF0YUZvcm1Jbml0Vmlld0NvbnRyb2xsZXJGb3JFZGl0b3IoZGF0YUZvcm06IFRLRGF0YUZvcm0sIHZpZXdDb250cm9sbGVyOiBVSVZpZXdDb250cm9sbGVyLCBlZGl0b3I6IFRLRGF0YUZvcm1WaWV3Q29udHJvbGxlckVkaXRvcik6IHZvaWQge1xuICAgICAgICAvLyBUaGlzIGRlbGVnYXRlIG1ldGhvZCBpcyBjYWxsZWQgYmVmb3JlIGEgbmV3IFVJVmlld0NvbnRyb2xsZXIgZm9yIGFuIGVkaXRvclxuICAgICAgICAvLyBpcyBwdXNoZWQgdG8gdGhlIFVJTmF2aWdhdGlvbkNvbnRyb2xsZXIuXG4gICAgICAgIC8vIE5vdGlmeSB0aGUgTlMgcGFnZSBhYm91dCB0aGUgbmV3IGNvbnRyb2xsZXIgYW5kIGxldCBpdCB0cmVhdCB0aGUgY29udHJvbGxlciBhcyBhIHByZXNlbnRlZCB2aWV3IGNvbnRyb2xsZXIuXG4gICAgICAgIGlmICh0aGlzLl9vd25lci5nZXQoKS5wYWdlLmhhc093blByb3BlcnR5KFwiX3ByZXNlbnRlZFZpZXdDb250cm9sbGVyXCIpKSB7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5nZXQoKS5wYWdlW1wiX3ByZXNlbnRlZFZpZXdDb250cm9sbGVyXCJdID0gdmlld0NvbnRyb2xsZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRLRGF0YUZvcm1Db252ZXJ0ZXJJbXBsZW1lbnRhdGlvbiBleHRlbmRzIE5TT2JqZWN0IGltcGxlbWVudHMgVEtEYXRhRm9ybUNvbnZlcnRlciB7XG4gICAgcHVibGljIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1RLRGF0YUZvcm1Db252ZXJ0ZXJdO1xuXG4gICAgc3RhdGljIG5ldygpOiBUS0RhdGFGb3JtQ29udmVydGVySW1wbGVtZW50YXRpb24ge1xuICAgICAgICByZXR1cm4gPFRLRGF0YUZvcm1Db252ZXJ0ZXJJbXBsZW1lbnRhdGlvbj5zdXBlci5uZXcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jb252ZXJ0ZXI6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUNvbnZlcnRlcjtcblxuICAgIHB1YmxpYyBpbml0V2l0aENvbnZlcnRlcihjb252ZXJ0ZXI6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUNvbnZlcnRlcik6IFRLRGF0YUZvcm1Db252ZXJ0ZXJJbXBsZW1lbnRhdGlvbiB7XG4gICAgICAgIHRoaXMuX2NvbnZlcnRlciA9IGNvbnZlcnRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnZlcnRGcm9tKHNvdXJjZTogYW55KTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnZlcnRlci5jb252ZXJ0RnJvbShzb3VyY2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb252ZXJ0VG8oc291cmNlOiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29udmVydGVyLmNvbnZlcnRUbyhzb3VyY2UpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRLRGF0YUZvcm1DdXN0b21FZGl0b3JEZWxlZ2F0ZUltcGxlbWVudGF0aW9uIGV4dGVuZHMgTlNPYmplY3QgaW1wbGVtZW50cyBUS0RhdGFGb3JtQ3VzdG9tRWRpdG9yRGVsZWdhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtUS0RhdGFGb3JtQ3VzdG9tRWRpdG9yRGVsZWdhdGVdO1xuXG4gICAgc3RhdGljIG5ldygpOiBUS0RhdGFGb3JtQ3VzdG9tRWRpdG9yRGVsZWdhdGVJbXBsZW1lbnRhdGlvbiB7XG4gICAgICAgIHJldHVybiA8VEtEYXRhRm9ybUN1c3RvbUVkaXRvckRlbGVnYXRlSW1wbGVtZW50YXRpb24+c3VwZXIubmV3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3duZXI6IFdlYWtSZWY8Q3VzdG9tUHJvcGVydHlFZGl0b3I+O1xuXG4gICAgcHVibGljIGluaXRXaXRoT3duZXIob3duZXI6IEN1c3RvbVByb3BlcnR5RWRpdG9yKTogVEtEYXRhRm9ybUN1c3RvbUVkaXRvckRlbGVnYXRlSW1wbGVtZW50YXRpb24ge1xuICAgICAgICB0aGlzLl9vd25lciA9IG5ldyBXZWFrUmVmKG93bmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXRvcldpbGxDcmVhdGVWaWV3KGVkaXRvcjogVEtEYXRhRm9ybUN1c3RvbUVkaXRvcik6IFVJVmlldyB7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1DdXN0b21Qcm9wZXJ0eUVkaXRvckV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLkN1c3RvbVByb3BlcnR5RWRpdG9yLmVkaXRvck5lZWRzVmlld0V2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLl9vd25lci5nZXQoKSxcbiAgICAgICAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRleHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgKDxvYnNlcnZhYmxlTW9kdWxlLk9ic2VydmFibGU+dGhpcy5fb3duZXIuZ2V0KCkpLm5vdGlmeShhcmdzKTtcbiAgICAgICAgcmV0dXJuIGFyZ3MudmlldztcbiAgICB9XG5cbiAgICBwdWJsaWMgZWRpdG9yU2hvdWxkQXBwbHlWYWx1ZUVkaXRvclZpZXcoZWRpdG9yOiBUS0RhdGFGb3JtQ3VzdG9tRWRpdG9yLCB2YWx1ZTogTlNPYmplY3QsIHZpZXc6IFVJVmlldyk6IHZvaWQge1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtQ3VzdG9tUHJvcGVydHlFZGl0b3JFdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5DdXN0b21Qcm9wZXJ0eUVkaXRvci5lZGl0b3JIYXNUb0FwcGx5VmFsdWVFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICAgICAgY29udGV4dDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH07XG4gICAgICAgICg8b2JzZXJ2YWJsZU1vZHVsZS5PYnNlcnZhYmxlPnRoaXMuX293bmVyLmdldCgpKS5ub3RpZnkoYXJncyk7XG4gICAgfVxuXG4gICAgcHVibGljIGVkaXRvcldpbGxSZXR1cm5WYWx1ZUVkaXRvclZpZXcoZWRpdG9yOiBUS0RhdGFGb3JtQ3VzdG9tRWRpdG9yLCB2aWV3OiBVSVZpZXcpOiBOU09iamVjdCB7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1DdXN0b21Qcm9wZXJ0eUVkaXRvckV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLkN1c3RvbVByb3BlcnR5RWRpdG9yLmVkaXRvck5lZWRzVmFsdWVFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcy5fb3duZXIuZ2V0KCksXG4gICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICAgICAgY29udGV4dDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICAoPG9ic2VydmFibGVNb2R1bGUuT2JzZXJ2YWJsZT50aGlzLl9vd25lci5nZXQoKSkubm90aWZ5KGFyZ3MpO1xuICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICB9XG59XG5cbmNsYXNzIFRLRGF0YUZvcm1WYWxpZGF0aW9uUHJvdmlkZXJEZWxlZ2F0ZUltcGxlbWVudGF0aW9uIGV4dGVuZHMgTlNPYmplY3QgaW1wbGVtZW50cyBUS0RhdGFGb3JtVmFsaWRhdGlvblByb3ZpZGVyRGVsZWdhdGUge1xuICAgIHB1YmxpYyBzdGF0aWMgT2JqQ1Byb3RvY29scyA9IFtUS0RhdGFGb3JtVmFsaWRhdGlvblByb3ZpZGVyRGVsZWdhdGVdO1xuXG4gICAgc3RhdGljIG5ldygpOiBUS0RhdGFGb3JtVmFsaWRhdGlvblByb3ZpZGVyRGVsZWdhdGVJbXBsZW1lbnRhdGlvbiB7XG4gICAgICAgIHJldHVybiA8VEtEYXRhRm9ybVZhbGlkYXRpb25Qcm92aWRlckRlbGVnYXRlSW1wbGVtZW50YXRpb24+c3VwZXIubmV3KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb3duZXI6IFdlYWtSZWY8UHJvcGVydHlWYWxpZGF0b3I+O1xuXG4gICAgcHVibGljIGluaXRXaXRoT3duZXIob3duZXI6IFByb3BlcnR5VmFsaWRhdG9yKTogVEtEYXRhRm9ybVZhbGlkYXRpb25Qcm92aWRlckRlbGVnYXRlSW1wbGVtZW50YXRpb24ge1xuICAgICAgICB0aGlzLl9vd25lciA9IG5ldyBXZWFrUmVmKG93bmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRvcldpbGxWYWxpZGF0ZSh2YWxpZGF0b3I6IFRLRGF0YUZvcm1NYW51YWxWYWxpZGF0b3IsIHByb3BlcnR5OiBUS0VudGl0eVByb3BlcnR5KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vd25lci5nZXQoKS52YWxpZGF0ZShwcm9wZXJ0eS52YWx1ZUNhbmRpZGF0ZSwgcHJvcGVydHkubmFtZSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmFkRGF0YUZvcm0gZXh0ZW5kcyBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0ge1xuXG4gICAgcHJpdmF0ZSBfbmF0aXZlRGVsZWdhdGU6IFRLRGF0YUZvcm1EZWxlZ2F0ZUltcGxlbWVudGF0aW9uO1xuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U6IFRLRGF0YUZvcm1FbnRpdHlEYXRhU291cmNlO1xuICAgIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgX3ZhbGlkYXRlUmVzb2x2ZTtcbiAgICBfY29tbWl0UmVzb2x2ZTtcbiAgICBfbmdLZXk7XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm07XG5cbiAgICBbYm9yZGVyTGVmdFdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nTGVmdCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0KSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nTGVmdDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9pb3MuaW5zZXRzO1xuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiB2YWx1ZSArIHBhZGRpbmdMZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW9zLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbcGFkZGluZ0xlZnRQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGJvcmRlckxlZnQgPSBpc05hTigrdGhpcy5zdHlsZS5ib3JkZXJMZWZ0V2lkdGgpID8gMCA6ICt0aGlzLnN0eWxlLmJvcmRlckxlZnRXaWR0aDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9pb3MuaW5zZXRzO1xuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiB2YWx1ZSArIGJvcmRlckxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pb3MuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtib3JkZXJUb3BXaWR0aFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgcGFkZGluZ1RvcCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdUb3ApID8gMCA6ICt0aGlzLnN0eWxlLnBhZGRpbmdUb3A7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5faW9zLmluc2V0cztcbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiB2YWx1ZSArIHBhZGRpbmdUb3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lvcy5pbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdUb3BQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGJvcmRlclRvcCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlclRvcFdpZHRoKSA/IDAgOiArdGhpcy5zdHlsZS5ib3JkZXJUb3BXaWR0aDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9pb3MuaW5zZXRzO1xuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHZhbHVlICsgYm9yZGVyVG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pb3MuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtib3JkZXJSaWdodFdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nUmlnaHQgPSBpc05hTigrdGhpcy5zdHlsZS5wYWRkaW5nUmlnaHQpID8gMCA6ICt0aGlzLnN0eWxlLnBhZGRpbmdSaWdodDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9pb3MuaW5zZXRzO1xuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IHZhbHVlICsgcGFkZGluZ1JpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW9zLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbcGFkZGluZ1JpZ2h0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJSaWdodCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpID8gMCA6ICt0aGlzLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5faW9zLmluc2V0cztcbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiB2YWx1ZSArIGJvcmRlclJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5faW9zLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbYm9yZGVyQm90dG9tV2lkdGhQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBhZGRpbmdCb3R0b20gPSBpc05hTigrdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tKSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMuX2lvcy5pbnNldHM7XG4gICAgICAgIGxldCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRJbnNldHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogdmFsdWUgKyBwYWRkaW5nQm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pb3MuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtwYWRkaW5nQm90dG9tUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJCb3R0b20gPSBpc05hTigrdGhpcy5zdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgPyAwIDogK3RoaXMuc3R5bGUuYm9yZGVyQm90dG9tV2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5faW9zLmluc2V0cztcbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiB2YWx1ZSArIGJvcmRlckJvdHRvbSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lvcy5pbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm0ubmV3KCk7XG4gICAgICAgIHRoaXMuX25hdGl2ZURlbGVnYXRlID0gVEtEYXRhRm9ybURlbGVnYXRlSW1wbGVtZW50YXRpb24ubmV3KCkuaW5pdFdpdGhPd25lcih0aGlzKTtcbiAgICAgICAgbGV0IHRoYXQgPSBuZXcgV2Vha1JlZih0aGlzKTtcbiAgICAgICAgdGhpcy5lbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gZnVuY3Rpb24gKGRhdGE6IG9ic2VydmFibGVNb2R1bGUuUHJvcGVydHlDaGFuZ2VEYXRhKSB7XG4gICAgICAgICAgICB0aGF0LmdldCgpLm9uUHJvcGVydHlQcm9wZXJ0eUNoYW5nZWQoZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBmdW5jdGlvbiAoZGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0KCkub25Hcm91cFByb3BlcnR5Q2hhbmdlZChkYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBmdW5jdGlvbiAoZGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0KCkub25Hcm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWQoZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ncm91cExheW91dFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBmdW5jdGlvbiAoZGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0KCkuX29uR3JvdXBMYXlvdXRQcm9wZXJ0eUNoYW5nZWQoPFByb3BlcnR5R3JvdXA+ZGF0YS5vYmplY3QpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMub24oXCJpc0VuYWJsZWRDaGFuZ2VcIiwgdGhpcy5pc0VuYWJsZWRDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmF0aXZlVmlldygpIHtcbiAgICAgICAgLy8gVGhlIGlPUyBEYXRhRm9ybSBuZWVkcyB0byBrbm93IGFib3V0IHRoZSBVSVZpZXdDb250cm9sbGVyIHRoYXQgY29udGFpbnMgaXQuXG4gICAgICAgIC8vIEl0IG1heSBiZSB1c2VkIGJ5IHNvbWUgVUlWaWV3Q29udHJvbGxlckVkaXRvcnMgKGxpa2UgTGlzdCBlZGl0b3IpIHRvXG4gICAgICAgIC8vIGFjY2VzcyB0aGUgVUlOYXZpZ2F0aW9uQ29udHJvbGxlciBhbmQgbmF2aWdhdGUgdG8gb3RoZXIgY29udHJvbGxlcnMuXG4gICAgICAgIC8vIEhvd2V2ZXIsIHRoaXMgaXMgb25seSBwb3NzaWJsZSB3aGVuIHRoZSBEYXRhRm9ybSBpcyBhZGRlZCB0byBhIHBhZ2UuXG4gICAgICAgIC8vIEl0IGNhbiBhbHNvIGJlIGRpc3BsYXllZCBpbiBhIG1vZGFsIHBhZ2UsIHRoZW4gdGhpcy5wYWdlIHdpbGwgYmUgdW5kZWZpbmVkXG4gICAgICAgIC8vIGFuZCB0aGUgYWJvdmUtbWVudGlvbmVkIGVkaXRvcnMgd2lsbCBub3Qgd29yay5cbiAgICAgICAgaWYgKHRoaXMucGFnZSkge1xuICAgICAgICAgICAgdGhpcy5faW9zLm93bmVyID0gdGhpcy5wYWdlLmlvcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9uZ0tleSA9IE9iamVjdC5rZXlzKHRoaXMpLmZpbmQoa2V5ID0+IGtleS5zdGFydHNXaXRoKCdfbmdjb250ZW50JykpO1xuXG4gICAgICAgIC8vIGZpeCBwb3NzaWJsZSByYWNlIGNvbmRpdGlvbnMgdGhhdCBoYXBwZW5zIHdoZW4gcGFyc2luZyB0aGUgbWFya3VwXG4gICAgICAgIC8vIHdlIGluc2VydCBQcm9wZXJ0eUVudGl0eSBvYmplY3RzIGFmdGVyIHRoZSBmb3JtIHdhcyBhbHJlYWR5IGluaXRcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9OYXRpdmVTY3JpcHQvbnNwbHVnaW5zLWludGVybmFsL2lzc3Vlcy8xNjJcbiAgICAgICAgdGhpcy5faW5pdERhdGFGb3JtKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcG9zZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHRoaXMuX2lvcy5vd25lciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5faW9zLmRlbGVnYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9uYXRpdmVEZWxlZ2F0ZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcHJpdmF0ZSBpc0VuYWJsZWRDaGFuZ2VkKGRhdGE6IG9ic2VydmFibGVNb2R1bGUuUHJvcGVydHlDaGFuZ2VEYXRhKSB7XG4gICAgICAgIHRoaXMuX2lvcy5yZWFkT25seSA9ICFkYXRhLnZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkxvYWRlZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkZWQoKTtcbiAgICAgICAgdGhpcy5faW9zLmRlbGVnYXRlID0gdGhpcy5fbmF0aXZlRGVsZWdhdGU7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVW5sb2FkZWQoKSB7XG4gICAgICAgIHN1cGVyLm9uVW5sb2FkZWQoKTtcbiAgICAgICAgdGhpcy5faW9zLmRlbGVnYXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5VmFsaWRhdGVkKHByb3BlcnR5TmFtZTogc3RyaW5nLCByZXN1bHQ6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5nZXRQcm9wZXJ0eUJ5TmFtZShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICBsZXQgZWRpdG9yID0gcHJvcGVydHkuZWRpdG9yO1xuICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgcHJvcGVydHkuaW9zLmVycm9yTWVzc2FnZSA9IHByb3BlcnR5LmVycm9yTWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pb3Mub25WYWxpZGF0aW9uUmVzdWx0VmFsdWVQcm9wZXJ0eUVkaXRvcihyZXN1bHQsIHByb3BlcnR5LnZhbHVlQ2FuZGlkYXRlLCBwcm9wZXJ0eS5pb3MsIGVkaXRvci5pb3MpO1xuICAgIH1cblxuICAgIGdldCBlZGl0ZWRPYmplY3QoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAoPFRLRGF0YUZvcm1FbnRpdHlEYXRhU291cmNlPnRoaXMuX2lvcy5kYXRhU291cmNlKS53cml0ZUpTT05Ub1N0cmluZygpO1xuICAgICAgICBsZXQgcGFyc2VkUmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICBsZXQgZmluYWxSZXN1bHQgPSBKU09OLnN0cmluZ2lmeShwYXJzZWRSZXN1bHQpO1xuICAgICAgICByZXR1cm4gZmluYWxSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTb3VyY2UucmVtb3ZlQWxsR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuX2luaXREYXRhRm9ybSgpO1xuICAgIH1cblxuICAgIF9hcHBseUdyb3VwVGl0bGVTdHlsZShncm91cFZpZXc6IFRLRW50aXR5UHJvcGVydHlHcm91cFZpZXcsXG4gICAgICAgIHRpdGxlU3R5bGU6IGNvbW1vbk1vZHVsZS5Hcm91cFRpdGxlU3R5bGUpIHtcblxuICAgICAgICBpZiAodGl0bGVTdHlsZS5maWxsQ29sb3IpIHtcbiAgICAgICAgICAgIGdyb3VwVmlldy50aXRsZVZpZXcuc3R5bGUuZmlsbCA9IFRLU29saWRGaWxsLnNvbGlkRmlsbFdpdGhDb2xvcih0aXRsZVN0eWxlLmZpbGxDb2xvci5pb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpdGxlU3R5bGUuc3Ryb2tlQ29sb3IgfHwgdGl0bGVTdHlsZS5zdHJva2VXaWR0aCkge1xuICAgICAgICAgICAgbGV0IHN0cm9rZTogVEtTdHJva2UgPSBUS1N0cm9rZS5uZXcoKTtcblxuICAgICAgICAgICAgaWYgKHRpdGxlU3R5bGUuc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBzdHJva2Uud2lkdGggPSB0aXRsZVN0eWxlLnN0cm9rZVdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGl0bGVTdHlsZS5zdHJva2VDb2xvcikge1xuICAgICAgICAgICAgICAgIHN0cm9rZS5jb2xvciA9IHRpdGxlU3R5bGUuc3Ryb2tlQ29sb3IuaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JvdXBWaWV3LnRpdGxlVmlldy5zdHlsZS5zdHJva2UgPSBzdHJva2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGl0bGVTdHlsZS5zZXBhcmF0b3JDb2xvcikge1xuICAgICAgICAgICAgZ3JvdXBWaWV3LnRpdGxlVmlldy5zdHlsZS5zZXBhcmF0b3JDb2xvciA9IFRLU29saWRGaWxsLnNvbGlkRmlsbFdpdGhDb2xvcih0aXRsZVN0eWxlLnNlcGFyYXRvckNvbG9yLmlvcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGl0bGVTdHlsZS5sYWJlbFRleHRDb2xvcikge1xuICAgICAgICAgICAgZ3JvdXBWaWV3LnRpdGxlVmlldy50aXRsZUxhYmVsLnRleHRDb2xvciA9IHRpdGxlU3R5bGUubGFiZWxUZXh0Q29sb3IuaW9zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpdGxlU3R5bGUubGFiZWxGb250TmFtZSB8fCB0aXRsZVN0eWxlLmxhYmVsVGV4dFNpemUgfHwgdGl0bGVTdHlsZS5sYWJlbEZvbnRTdHlsZSkge1xuICAgICAgICAgICAgZ3JvdXBWaWV3LnRpdGxlVmlldy50aXRsZUxhYmVsLmZvbnQgPSBSYWREYXRhRm9ybS5nZXRGb250V2l0aFByb3BlcnRpZXModGl0bGVTdHlsZS5sYWJlbEZvbnROYW1lLCB0aXRsZVN0eWxlLmxhYmVsVGV4dFNpemUsIHRpdGxlU3R5bGUubGFiZWxGb250U3R5bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZUdyb3VwTGF5b3V0KHByb3BlcnR5R3JvdXAsIG5hdGl2ZUdyb3VwKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0eUdyb3VwLmxheW91dCBpbnN0YW5jZW9mIGNvbW1vbk1vZHVsZS5EYXRhRm9ybVN0YWNrTGF5b3V0KSB7XG4gICAgICAgICAgICBsZXQgbmF0aXZlTGF5b3V0ID0gVEtTdGFja0xheW91dC5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eUdyb3VwLmxheW91dC5vcmllbnRhdGlvbiA9PT0gZW51bXMuT3JpZW50YXRpb24uaG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZUxheW91dC5vcmllbnRhdGlvbiA9IFRLTGF5b3V0T3JpZW50YXRpb24uSG9yaXpvbnRhbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlTGF5b3V0Lm9yaWVudGF0aW9uID0gVEtMYXlvdXRPcmllbnRhdGlvbi5WZXJ0aWNhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hdGl2ZUdyb3VwLmVkaXRvcnNDb250YWluZXIubGF5b3V0ID0gbmF0aXZlTGF5b3V0O1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BlcnR5R3JvdXAubGF5b3V0IGluc3RhbmNlb2YgY29tbW9uTW9kdWxlLkRhdGFGb3JtR3JpZExheW91dCkge1xuICAgICAgICAgICAgbmF0aXZlR3JvdXAuZWRpdG9yc0NvbnRhaW5lci5sYXlvdXQgPSBUS0dyaWRMYXlvdXQuYWxsb2MoKS5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR3JvdXBQcm9wZXJ0eUNoYW5nZWQoZGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmF0aXZlR3JvdXAgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKGRhdGEucHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwiY29sbGFwc2VkXCI6XG4gICAgICAgICAgICAgICAgbGV0IHByb3BlcnR5R3JvdXAgPSA8UHJvcGVydHlHcm91cD5kYXRhLm9iamVjdDtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5R3JvdXAuY29sbGFwc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGdyb3VwIGlzIG5vdCBjb2xsYXBzaWJsZSwgd2UgZG9uJ3Qgd2FudCB0byBjb2xsYXBzZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogY29sbGFwc2libGUgc2hvdWxkIGJlIHRydWUgYmVmb3JlIGNvbGxhcHNpbmcgYSBncm91cC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuYXRpdmVHcm91cCA9IHRoaXMuZ2V0TmF0aXZlR3JvdXAocHJvcGVydHlHcm91cC5uYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBWaWV3ID0gdGhpcy5faW9zLmdyb3VwVmlld0Zvckdyb3VwKG5hdGl2ZUdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS52YWx1ZSA9PT0gZ3JvdXBWaWV3LmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBncm91cCBhbHJlYWR5IGNvbmZyb250cyB0byB0aGUgbmV3VmFsdWUsIGRvbid0IGRvIGFueXRoaW5nLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwVmlldy5jb2xsYXBzZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwVmlldy5leHBhbmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidGl0bGVIaWRkZW5cIjpcbiAgICAgICAgICAgICAgICBuYXRpdmVHcm91cCA9IHRoaXMuZ2V0TmF0aXZlR3JvdXAoKDxQcm9wZXJ0eUdyb3VwPmRhdGEub2JqZWN0KS5uYW1lKTtcbiAgICAgICAgICAgICAgICBsZXQgbmF0aXZlR3JvdXBWaWV3ID0gdGhpcy5faW9zLmdyb3VwVmlld0Zvckdyb3VwKG5hdGl2ZUdyb3VwKTtcbiAgICAgICAgICAgICAgICBpZiAobmF0aXZlR3JvdXBWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUdyb3VwVmlldy50aXRsZVZpZXcuaGlkZGVuID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlR3JvdXBWaWV3LnNldE5lZWRzTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImhpZGRlblwiOlxuICAgICAgICAgICAgICAgIG5hdGl2ZUdyb3VwID0gdGhpcy5nZXROYXRpdmVHcm91cCgoPFByb3BlcnR5R3JvdXA+ZGF0YS5vYmplY3QpLm5hbWUpO1xuICAgICAgICAgICAgICAgIG5hdGl2ZUdyb3VwLmhpZGRlbiA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjb2xsYXBzaWJsZVwiOlxuICAgICAgICAgICAgY2FzZSBcInRpdGxlU3R5bGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxheW91dFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX29uTGF5b3V0UHJvcGVydHlDaGFuZ2VkKDxQcm9wZXJ0eUdyb3VwPmRhdGEub2JqZWN0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuYW1lXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX29uTGF5b3V0UHJvcGVydHlDaGFuZ2VkKGdyb3VwOiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgIGlmICghdGhpcy5faW9zIHx8ICF0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxheW91dChncm91cCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTGF5b3V0KGdyb3VwOiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgIGxldCBuYXRpdmVHcm91cCA9IHRoaXMuZ2V0TmF0aXZlR3JvdXAoZ3JvdXAubmFtZSk7XG4gICAgICAgIGxldCBuYXRpdmVHcm91cFZpZXcgPSB0aGlzLl9pb3MuZ3JvdXBWaWV3Rm9yR3JvdXAobmF0aXZlR3JvdXApO1xuICAgICAgICB0aGlzLl91cGRhdGVHcm91cExheW91dChncm91cCwgbmF0aXZlR3JvdXBWaWV3KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldE5hdGl2ZUdyb3VwKG5hbWUpIHtcbiAgICAgICAgbGV0IGdyb3VwQ291bnQgPSB0aGlzLl9kYXRhU291cmNlLm51bWJlck9mR3JvdXBzSW5EYXRhRm9ybSh0aGlzLl9pb3MpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLl9kYXRhU291cmNlLmdyb3VwQXRJbmRleChpKTtcbiAgICAgICAgICAgIGlmIChncm91cC5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Hcm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWQoZGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX29uR3JvdXBMYXlvdXRQcm9wZXJ0eUNoYW5nZWQoZ3JvdXA6IFByb3BlcnR5R3JvdXApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlTGF5b3V0KGdyb3VwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUHJvcGVydHlQcm9wZXJ0eUNoYW5nZWQoZGF0YTogb2JzZXJ2YWJsZU1vZHVsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb3BlcnR5ID0gPEVudGl0eVByb3BlcnR5PmRhdGEub2JqZWN0O1xuICAgICAgICBpZiAoIXByb3BlcnR5IHx8ICFwcm9wZXJ0eS5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hdGl2ZVByb3BlcnR5ID0gcHJvcGVydHkuaW9zO1xuXG4gICAgICAgIHN3aXRjaCAoZGF0YS5wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJyZWFkT25seVwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy51cGRhdGVFZGl0b3JGb3JQcm9wZXJ0eShuYXRpdmVQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaGludFRleHRcIjpcbiAgICAgICAgICAgIGNhc2UgXCJoaWRkZW5cIjpcbiAgICAgICAgICAgIGNhc2UgXCJpbmRleFwiOlxuICAgICAgICAgICAgY2FzZSBcImRpc3BsYXlOYW1lXCI6XG4gICAgICAgICAgICBjYXNlIFwidmFsdWVzUHJvdmlkZXJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJlZGl0b3JcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaW5pdERhdGFGb3JtKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5zb3VyY2UgfHwgIXRoaXMuX2RhdGFTb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdvIHRocm91Z2ggYWxsIGdyb3VwcyAvIGVudGl0eSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBncm91cCA9IDxQcm9wZXJ0eUdyb3VwPnRoaXMuZ3JvdXBzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eU5hbWVzOiBOU011dGFibGVBcnJheTxhbnk+ID0gTlNNdXRhYmxlQXJyYXkuYWxsb2MoKS5pbml0V2l0aENhcGFjaXR5KGdyb3VwLnByb3BlcnRpZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXAucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyb3VwLnByb3BlcnRpZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eTogRW50aXR5UHJvcGVydHkgPSA8RW50aXR5UHJvcGVydHk+Z3JvdXAucHJvcGVydGllc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZXMuYWRkT2JqZWN0KGVudGl0eVByb3BlcnR5Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFTb3VyY2UuYWRkR3JvdXBXaXRoTmFtZVByb3BlcnR5TmFtZXMoZ3JvdXAubmFtZSwgcHJvcGVydHlOYW1lcyk7XG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhIGdyb3VwIGlzIGFkZGVkIHRvIHRoZSBkYXRhIHNvdXJjZSwgZWFjaCBwcm9wZXJ0eSBnZXRzIGEgbmV3XG4gICAgICAgICAgICAgICAgLy8gdmFsdWUgZm9yIGl0cyBsYXlvdXRJbmZvLnJvdy4gU2luY2Ugd2Ugd2FudCB0aGUgaW5kZXggZGVmaW5lZCBpbiBOUyxcbiAgICAgICAgICAgICAgICAvLyB0byBoYXZlIGEgYmlnZ2VyIHByaW9yaXR5LCB3ZSBtYWtlIHRoZSB1cGRhdGUgYWZ0ZXIgdGhlIHByb3BlcnR5IGlzXG4gICAgICAgICAgICAgICAgLy8gYWRkZWQgdG8gdGhlIGRhdGEgc291cmNlLlxuICAgICAgICAgICAgICAgIGlmIChncm91cC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ3JvdXAucHJvcGVydGllcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT5ncm91cC5wcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTmF0aXZlUHJvcGVydHkoZW50aXR5UHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBuYXRpdmVHcm91cCA9IHRoaXMuZ2V0TmF0aXZlR3JvdXAoZ3JvdXAubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwLmhpZGRlbikge1xuICAgICAgICAgICAgICAgICAgICBuYXRpdmVHcm91cC5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWdyb3VwLnRpdGxlU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXAudGl0bGVTdHlsZSA9IG5ldyBjb21tb25Nb2R1bGUuR3JvdXBUaXRsZVN0eWxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZ3JvdXAubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGdyb3VwLmxheW91dCA9IG5ldyBjb21tb25Nb2R1bGUuRGF0YUZvcm1TdGFja0xheW91dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2hHcm91cENoYW5nZUxpc3RlbmVyKGdyb3VwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcGVydGllcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eTogRW50aXR5UHJvcGVydHkgPSA8RW50aXR5UHJvcGVydHk+dGhpcy5wcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU5hdGl2ZVByb3BlcnR5KGVudGl0eVByb3BlcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2lvcy5kYXRhU291cmNlID0gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIF9jcmVhdGVQcm9wZXJ0eUZyb21OYXRpdmUobmF0aXZlUHJvcGVydHk6IFRLRW50aXR5UHJvcGVydHkpIHtcbiAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IG5ldyBFbnRpdHlQcm9wZXJ0eSgpO1xuICAgICAgICBlbnRpdHlQcm9wZXJ0eS5uYW1lID0gbmF0aXZlUHJvcGVydHkubmFtZTtcbiAgICAgICAgZW50aXR5UHJvcGVydHkuX2xpbmtQcm9wZXJ0eVdpdGhOYXRpdmUobmF0aXZlUHJvcGVydHkpO1xuICAgICAgICByZXR1cm4gZW50aXR5UHJvcGVydHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlTmF0aXZlUHJvcGVydHkoZW50aXR5UHJvcGVydHk6IEVudGl0eVByb3BlcnR5KSB7XG4gICAgICAgIGxldCBuYXRpdmVQcm9wZXJ0eTogVEtFbnRpdHlQcm9wZXJ0eSA9IHRoaXMuX2RhdGFTb3VyY2UucHJvcGVydHlXaXRoTmFtZShlbnRpdHlQcm9wZXJ0eS5uYW1lKTtcbiAgICAgICAgaWYgKG5hdGl2ZVByb3BlcnR5KSB7XG4gICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eS5fbGlua1Byb3BlcnR5V2l0aE5hdGl2ZShuYXRpdmVQcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhbm5vdCBjcmVhdGUgbmF0aXZlIFRLRW50aXR5UHJvcGVydHkgZm9yIEVudGl0eVByb3BlcnR5IHdpdGggJ25hbWUnOiBcIiArIGVudGl0eVByb3BlcnR5Lm5hbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblNvdXJjZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IG9iakpTT04gPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9kYXRhU291cmNlID0gPFRLRGF0YUZvcm1FbnRpdHlEYXRhU291cmNlPlRLRGF0YUZvcm1FbnRpdHlEYXRhU291cmNlLmFsbG9jKCkuaW5pdFdpdGhKU09OU3RyaW5nUm9vdEl0ZW1LZXlQYXRoKG9iakpTT04sIG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faW5pdERhdGFGb3JtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uTWV0YWRhdGFQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBvYmpKU09OID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5faW9zLnNldHVwV2l0aEpTT05Bbm5vdGF0aW9uc1N0cmluZyhvYmpKU09OKTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uSXNSZWFkT25seVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faW9zLnJlYWRPbmx5ID0gbmV3VmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vbkNvbW1pdE1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUNvbW1pdE1vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1Db21taXRNb2RlKSB7XG4gICAgICAgIHN3aXRjaCAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtQ29tbWl0TW9kZS5JbW1lZGlhdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5faW9zLmNvbW1pdE1vZGUgPSBUS0RhdGFGb3JtQ29tbWl0TW9kZS5JbW1lZGlhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUNvbW1pdE1vZGUuTWFudWFsOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy5jb21taXRNb2RlID0gVEtEYXRhRm9ybUNvbW1pdE1vZGUuTWFudWFsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1Db21taXRNb2RlLk9uTG9zdEZvY3VzOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy5jb21taXRNb2RlID0gVEtEYXRhRm9ybUNvbW1pdE1vZGUuT25Mb3N0Rm9jdXM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uVmFsaWRhdGlvbk1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybVZhbGlkYXRpb25Nb2RlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkRhdGFGb3JtVmFsaWRhdGlvbk1vZGUpIHtcbiAgICAgICAgc3dpdGNoIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1WYWxpZGF0aW9uTW9kZS5JbW1lZGlhdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5faW9zLnZhbGlkYXRpb25Nb2RlID0gVEtEYXRhRm9ybVZhbGlkYXRpb25Nb2RlLkltbWVkaWF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtVmFsaWRhdGlvbk1vZGUuTWFudWFsOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy52YWxpZGF0aW9uTW9kZSA9IFRLRGF0YUZvcm1WYWxpZGF0aW9uTW9kZS5NYW51YWw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybVZhbGlkYXRpb25Nb2RlLk9uTG9zdEZvY3VzOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lvcy52YWxpZGF0aW9uTW9kZSA9IFRLRGF0YUZvcm1WYWxpZGF0aW9uTW9kZS5Pbkxvc3RGb2N1cztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25Hcm91cHNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IEFycmF5PFByb3BlcnR5R3JvdXA+LCBuZXdWYWx1ZTogQXJyYXk8UHJvcGVydHlHcm91cD4pOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGVBbGwoKTogUHJvbWlzZTxCb29sZWFuPiB7XG4gICAgICAgIGxldCB0aGF0ID0gbmV3IFdlYWtSZWYodGhpcyk7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2U8Qm9vbGVhbj4oZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHRoYXQuZ2V0KCkuX3ZhbGlkYXRlUmVzb2x2ZSA9IHJlc29sdmU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9pb3MudmFsaWRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlQW5kQ29tbWl0QWxsKCk6IFByb21pc2U8Qm9vbGVhbj4ge1xuICAgICAgICBsZXQgdGhhdCA9IG5ldyBXZWFrUmVmKHRoaXMpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlPEJvb2xlYW4+KGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICB0aGF0LmdldCgpLl9jb21taXRSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2lvcy5jb21taXQoKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbW1pdEFsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faW9zLmNvbW1pdEZvcmNlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2lvcy5yZWxvYWREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzVmFsaWRhdGlvbkVycm9ycygpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2lvcykge1xuICAgICAgICAgICAgdGhpcy5faW9zLnZhbGlkYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW9zLmhhc1ZhbGlkYXRpb25FcnJvcnMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEhlbHBlcnNcbiAgICBzdGF0aWMgZ2V0Rm9udFdpdGhQcm9wZXJ0aWVzKGZvbnROYW1lOiBzdHJpbmcsIHNpemU6IG51bWJlciwgc3R5bGU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUZvbnRTdHlsZSk6IFVJRm9udCB7XG4gICAgICAgIGxldCBmb250OiBVSUZvbnQgPSBudWxsO1xuICAgICAgICBsZXQgZm9udFNpemUgPSAhaXNOYU4oK3NpemUpID8gc2l6ZSA6IDE3O1xuICAgICAgICBpZiAoZm9udE5hbWUpIHtcbiAgICAgICAgICAgIGZvbnQgPSBVSUZvbnQuZm9udFdpdGhOYW1lU2l6ZShmb250TmFtZSwgZm9udFNpemUpO1xuICAgICAgICAgICAgaWYgKCFmb250KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXQVJOSU5HOiBDYW5ub3QgY3JlYXRlIGZvbnQgd2l0aCBnaXZlbiBuYW1lOiBcIiArIGZvbnRTaXplKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWZvbnQgJiYgIWlzTmFOKCtzaXplKSkge1xuICAgICAgICAgICAgZm9udCA9IFVJRm9udC5zeXN0ZW1Gb250T2ZTaXplKGZvbnRTaXplKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICAgIGxldCB0cmFpdHMgPSBVSUZvbnREZXNjcmlwdG9yU3ltYm9saWNUcmFpdHMuQ2xhc3NVbmtub3duO1xuICAgICAgICAgICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRm9udFN0eWxlLkJvbGQ6XG4gICAgICAgICAgICAgICAgICAgIHRyYWl0cyA9IFVJRm9udERlc2NyaXB0b3JTeW1ib2xpY1RyYWl0cy5UcmFpdEJvbGQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRm9udFN0eWxlLkl0YWxpYzpcbiAgICAgICAgICAgICAgICAgICAgdHJhaXRzID0gVUlGb250RGVzY3JpcHRvclN5bWJvbGljVHJhaXRzLlRyYWl0SXRhbGljO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUZvbnRTdHlsZS5Cb2xkSXRhbGljOlxuICAgICAgICAgICAgICAgICAgICB0cmFpdHMgPSBVSUZvbnREZXNjcmlwdG9yU3ltYm9saWNUcmFpdHMuVHJhaXRCb2xkIHwgVUlGb250RGVzY3JpcHRvclN5bWJvbGljVHJhaXRzLlRyYWl0SXRhbGljO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFmb250KSB7XG4gICAgICAgICAgICAgICAgZm9udCA9IFVJRm9udC5zeXN0ZW1Gb250T2ZTaXplKGZvbnRTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBuZXdGb250ID0gVUlGb250LmZvbnRXaXRoRGVzY3JpcHRvclNpemUodXRpbHMuaW9zLmdldHRlcihmb250LCBmb250LmZvbnREZXNjcmlwdG9yKS5mb250RGVzY3JpcHRvcldpdGhTeW1ib2xpY1RyYWl0cyh0cmFpdHMpLCBmb250U2l6ZSk7XG4gICAgICAgICAgICBpZiAobmV3Rm9udCkge1xuICAgICAgICAgICAgICAgIGZvbnQgPSBuZXdGb250O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb250O1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUdyb3VwIGV4dGVuZHMgY29tbW9uTW9kdWxlLlByb3BlcnR5R3JvdXAge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgLy8gdG9kbzogY29uc2lkZXIgaWYgdGhlc2UgcHJvcGVydGllcyBuZWVkIGhhbmRsZXMgYXQgYWxsXG4gICAgcHJvdGVjdGVkIG9uTmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25IaWRkZW5DaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25Db2xsYXBzaWJsZUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgfVxuICAgIHByb3RlY3RlZCBvblRpdGxlU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuR3JvdXBUaXRsZVN0eWxlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkdyb3VwVGl0bGVTdHlsZSk6IHZvaWQge1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgb25Qcm9wZXJ0aWVzQ2hhbmdlZChvbGRWYWx1ZTogQXJyYXk8RW50aXR5UHJvcGVydHk+LCBuZXdWYWx1ZTogQXJyYXk8RW50aXR5UHJvcGVydHk+KTogdm9pZCB7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRW50aXR5UHJvcGVydHkgZXh0ZW5kcyBjb21tb25Nb2R1bGUuRW50aXR5UHJvcGVydHkge1xuICAgIHByaXZhdGUgX3Nob3VsZFNraXBFZGl0b3JVcGRhdGUgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2lvczogVEtFbnRpdHlQcm9wZXJ0eTtcbiAgICBwdWJsaWMgZ2V0IGlvcygpOiBUS0VudGl0eVByb3BlcnR5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaW9zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pb3MuaXNWYWxpZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuaW9zKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pb3Mub3JpZ2luYWxWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZUNhbmRpZGF0ZSgpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5pb3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlvcy52YWx1ZUNhbmRpZGF0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIF9saW5rUHJvcGVydHlXaXRoTmF0aXZlKHZhbHVlOiBUS0VudGl0eVByb3BlcnR5KSB7XG4gICAgICAgIHRoaXMuX2lvcyA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9pb3MucGlja2Vyc1VzZUluZGV4VmFsdWUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fb25OYXRpdmVTZXQoKTtcbiAgICB9XG5cbiAgICBfdXBkYXRlTmF0aXZlRWRpdG9yKG5hdGl2ZUVkaXRvcjogVEtEYXRhRm9ybUVkaXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVFZGl0b3JGcm9tTmF0aXZlKG5hdGl2ZUVkaXRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fbGlua0VkaXRvcldpdGhOYXRpdmUodGhpcy5lZGl0b3IsIG5hdGl2ZUVkaXRvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY3JlYXRlRWRpdG9yRnJvbU5hdGl2ZShuYXRpdmVFZGl0b3IpIHtcbiAgICAgICAgbGV0IHR5cGUgPSBQcm9wZXJ0eUVkaXRvci5fZ2V0TmF0aXZlRWRpdG9yVHlwZShuYXRpdmVFZGl0b3IpO1xuICAgICAgICB0aGlzLl9zaG91bGRTa2lwRWRpdG9yVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgbGV0IHByb3BlcnR5RWRpdG9yID0gbmV3IFByb3BlcnR5RWRpdG9yKCk7XG4gICAgICAgIHByb3BlcnR5RWRpdG9yLnR5cGUgPSB0eXBlO1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fbGlua0VkaXRvcldpdGhOYXRpdmUocHJvcGVydHlFZGl0b3IsIG5hdGl2ZUVkaXRvcik7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gcHJvcGVydHlFZGl0b3I7XG4gICAgICAgIHRoaXMuX3Nob3VsZFNraXBFZGl0b3JVcGRhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbk5hdGl2ZVNldCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVWYWxpZGF0b3JzKHRoaXMudmFsaWRhdG9ycyk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlQ29udmVydGVyKHRoaXMuY29udmVydGVyKTtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVWYWx1ZXNQcm92aWRlcih0aGlzLnZhbHVlc1Byb3ZpZGVyQXJyYXkpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUF1dG9Db21wbGV0ZURpc3BsYXlNb2RlKHRoaXMuYXV0b0NvbXBsZXRlRGlzcGxheU1vZGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZURpc3BsYXlOYW1lKHRoaXMuZGlzcGxheU5hbWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUluZGV4KHRoaXMuaW5kZXgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUNvbHVtbkluZGV4KHRoaXMuY29sdW1uSW5kZXgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUhpZGRlbih0aGlzLmhpZGRlbik7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlUmVhZE9ubHkodGhpcy5yZWFkT25seSk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlUmVxdWlyZWQodGhpcy5yZXF1aXJlZCk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlSGludFRleHQodGhpcy5oaW50VGV4dCk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlSW1hZ2VSZXNvdXJjZSh0aGlzLmltYWdlUmVzb3VyY2UpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUVkaXRvclBhcmFtcyh0aGlzLmVkaXRvcik7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlRWRpdG9yKHRoaXMuZWRpdG9yKTtcbiAgICB9XG5cblxuICAgIHByb3RlY3RlZCBvbkVkaXRvclR5cGVDaGFuZ2VkKCkge1xuICAgICAgICBsZXQgbmV3RWRpdG9yID0gbmV3IFByb3BlcnR5RWRpdG9yKCk7XG4gICAgICAgIG5ld0VkaXRvci50eXBlID0gdGhpcy5lZGl0b3IudHlwZTtcbiAgICAgICAgbmV3RWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUgPSB0aGlzLmVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlO1xuICAgICAgICBuZXdFZGl0b3IucGFyYW1zID0gdGhpcy5lZGl0b3IucGFyYW1zO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG5ld0VkaXRvcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlRWRpdG9yUGFyYW1zKHZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXZhbHVlIHx8ICF2YWx1ZS5wYXJhbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZWRpdG9yUGFyYW1zID0gdmFsdWUucGFyYW1zO1xuICAgICAgICBpZiAoZWRpdG9yUGFyYW1zLm1pbmltdW0gJiYgZWRpdG9yUGFyYW1zLm1heGltdW0pIHtcbiAgICAgICAgICAgIGlmICghaXNOYU4oZWRpdG9yUGFyYW1zLm1pbmltdW0pICYmICFpc05hTihlZGl0b3JQYXJhbXMubWF4aW11bSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pb3MucmFuZ2UgPSBUS1JhbmdlLnJhbmdlV2l0aE1pbmltdW1BbmRNYXhpbXVtKGVkaXRvclBhcmFtcy5taW5pbXVtLCBlZGl0b3JQYXJhbXMubWF4aW11bSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvclBhcmFtcy5zdGVwICYmICFpc05hTihlZGl0b3JQYXJhbXMuc3RlcCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2lvcy5zdGVwID0gZWRpdG9yUGFyYW1zLnN0ZXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlRWRpdG9yKHZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDdXN0b21Qcm9wZXJ0eUVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5faW9zLmVkaXRvckNsYXNzID0gVEtEYXRhRm9ybUN1c3RvbUVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW9zLmVkaXRvckNsYXNzID0gKDxQcm9wZXJ0eUVkaXRvcj52YWx1ZSkuZWRpdG9yQ2xhc3M7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVZhbGlkYXRvcnModmFsdWU6IEFycmF5PGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eVZhbGlkYXRvcj4pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbGlkYXRvclNldCA9IE5TTXV0YWJsZUFycmF5Lm5ldygpO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHZhbHVlLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yQmFzZSA9IHZhbHVlW2tdO1xuICAgICAgICAgICAgbGV0IGFWYWxpZGF0b3IgPSB2YWxpZGF0b3JCYXNlLmlvcztcbiAgICAgICAgICAgIHZhbGlkYXRvclNldC5hZGRPYmplY3QoYVZhbGlkYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW9zLnZhbGlkYXRvcnMgPSB2YWxpZGF0b3JTZXQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVZhbHVlc1Byb3ZpZGVyKHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmICghdGhpcy5faW9zIHx8ICF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5hdGl2ZVNvdXJjZSA9IE5TTXV0YWJsZUFycmF5Lm5ldygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmF0aXZlVmFsdWUgPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmF0aXZlVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IG5hdGl2ZVZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hdGl2ZVNvdXJjZS5hZGRPYmplY3QobmF0aXZlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lvcy52YWx1ZXNQcm92aWRlciA9IG5hdGl2ZVNvdXJjZTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmlvcykge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuaW9zLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZUF1dG9Db21wbGV0ZURpc3BsYXlNb2RlKHZhbHVlOiBBdXRvQ29tcGxldGVEaXNwbGF5TW9kZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2lvcyB8fCAhdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuYXRpdmVWYWx1ZTtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBBdXRvQ29tcGxldGVEaXNwbGF5TW9kZS5QbGFpbjpcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IFRLQXV0b0NvbXBsZXRlRGlzcGxheU1vZGUuUGxhaW47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlLlRva2VuczpcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IFRLQXV0b0NvbXBsZXRlRGlzcGxheU1vZGUuVG9rZW5zO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5hdGl2ZVZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lvcy5hdXRvQ29tcGxldGVEaXNwbGF5TW9kZSA9IG5hdGl2ZVZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhdXRvQ29tcGxldGVEaXNwbGF5TW9kZSBjYW5ub3QgYmUgc2V0IHRvOiBcIiArIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVJbWFnZVJlc291cmNlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaW1hZ2UgPSBVSUltYWdlLmltYWdlTmFtZWQodmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5faW9zLmltYWdlID0gaW1hZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pb3MuaW1hZ2UgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZURpc3BsYXlOYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lvcy5kaXNwbGF5TmFtZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVJbmRleCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5faW9zIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pb3MuaW5kZXggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlQ29udmVydGVyKHZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlDb252ZXJ0ZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pb3MgfHwgdmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW9zLmNvbnZlcnRlciA9IFRLRGF0YUZvcm1Db252ZXJ0ZXJJbXBsZW1lbnRhdGlvbi5uZXcoKS5pbml0V2l0aENvbnZlcnRlcih2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmlvcykge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuaW9zLmxvYWRQcm9wZXJ0eVZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlQ29sdW1uSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIXRoaXMuX2lvcyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW9zLmNvbHVtbkluZGV4ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZUhpZGRlbih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMuX2lvcyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW9zLmhpZGRlbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVSZWFkT25seSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoIXRoaXMuX2lvcyB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW9zLnJlYWRPbmx5ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVJlcXVpcmVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5faW9zIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pb3MucmVxdWlyZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlSGludFRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuX2lvcyB8fCAhdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pb3MuaGludFRleHQgPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRhRm9ybUVkaXRvckxhYmVsIGV4dGVuZHMgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yTGFiZWwge1xuICAgIHByaXZhdGUgX2lvczogVEtMYWJlbDtcbiAgICBwcml2YXRlIF9lZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcjtcbiAgICBnZXQgaW9zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW9zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGVkaXRvcjogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2VkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5faW9zID0gZWRpdG9yLmlvcy50ZXh0TGFiZWw7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3Bvc2VOYXRpdmVWaWV3KCkge1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBudWxsO1xuICAgICAgICB0aGlzLl9pb3MgPSBudWxsO1xuICAgIH1cblxuICAgIFtwYWRkaW5nTGVmdFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgYm9yZGVyTGVmdCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlckxlZnRXaWR0aCkgPyAwIDogK3RoaXMuc3R5bGUuYm9yZGVyTGVmdFdpZHRoO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHM7XG4gICAgICAgIGxldCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IHZhbHVlICsgYm9yZGVyTGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW2JvcmRlckxlZnRXaWR0aFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgcGFkZGluZ0xlZnQgPSBpc05hTigrdGhpcy5zdHlsZS5wYWRkaW5nTGVmdCkgPyAwIDogK3RoaXMuc3R5bGUucGFkZGluZ0xlZnQ7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5fZWRpdG9yLmlvcy50ZXh0TGFiZWwudGV4dEluc2V0cztcbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogdmFsdWUgKyBwYWRkaW5nTGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdUb3BQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGJvcmRlclRvcCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlclRvcFdpZHRoKSA/IDAgOiArdGhpcy5zdHlsZS5ib3JkZXJUb3BXaWR0aDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9lZGl0b3IuaW9zLnRleHRMYWJlbC50ZXh0SW5zZXRzO1xuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHZhbHVlICsgYm9yZGVyVG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lZGl0b3IuaW9zLnRleHRMYWJlbC50ZXh0SW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtib3JkZXJUb3BXaWR0aFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgcGFkZGluZ1RvcCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdUb3ApID8gMCA6ICt0aGlzLnN0eWxlLnBhZGRpbmdUb3A7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5fZWRpdG9yLmlvcy50ZXh0TGFiZWwudGV4dEluc2V0cztcbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiB2YWx1ZSArIHBhZGRpbmdUb3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdSaWdodFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgYm9yZGVyUmlnaHQgPSBpc05hTigrdGhpcy5zdHlsZS5ib3JkZXJSaWdodFdpZHRoKSA/IDAgOiArdGhpcy5zdHlsZS5ib3JkZXJSaWdodFdpZHRoO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHM7XG4gICAgICAgIGxldCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRJbnNldHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogdmFsdWUgKyBib3JkZXJSaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW2JvcmRlclJpZ2h0V2lkdGhQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBhZGRpbmdSaWdodCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdSaWdodCkgPyAwIDogK3RoaXMuc3R5bGUucGFkZGluZ1JpZ2h0O1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHM7XG4gICAgICAgIGxldCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRJbnNldHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogdmFsdWUgKyBwYWRkaW5nUmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lZGl0b3IuaW9zLnRleHRMYWJlbC50ZXh0SW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtwYWRkaW5nQm90dG9tUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJCb3R0b20gPSBpc05hTigrdGhpcy5zdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgPyAwIDogK3RoaXMuc3R5bGUuYm9yZGVyQm90dG9tV2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5fZWRpdG9yLmlvcy50ZXh0TGFiZWwudGV4dEluc2V0cztcbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiB2YWx1ZSArIGJvcmRlckJvdHRvbSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLnRleHRJbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW2JvcmRlckJvdHRvbVdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nQm90dG9tID0gaXNOYU4oK3RoaXMuc3R5bGUucGFkZGluZ0JvdHRvbSkgPyAwIDogK3RoaXMuc3R5bGUucGFkZGluZ0JvdHRvbTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9lZGl0b3IuaW9zLnRleHRMYWJlbC50ZXh0SW5zZXRzO1xuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IHZhbHVlICsgcGFkZGluZ0JvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmlvcy50ZXh0TGFiZWwudGV4dEluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbbWFyZ2luTGVmdFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudE1hcmdpbnMgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucztcbiAgICAgICAgbGV0IG1hcmdpbnMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IHZhbHVlLFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50TWFyZ2lucy50b3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudE1hcmdpbnMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRNYXJnaW5zLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgIH1cblxuICAgIFttYXJnaW5Ub3BQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRNYXJnaW5zID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnM7XG4gICAgICAgIGxldCBtYXJnaW5zID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50TWFyZ2lucy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiB2YWx1ZSxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50TWFyZ2lucy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudE1hcmdpbnMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgfVxuXG4gICAgW21hcmdpblJpZ2h0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50TWFyZ2lucyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudE1hcmdpbnMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudE1hcmdpbnMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IHZhbHVlLFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50TWFyZ2lucy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zID0gbWFyZ2lucztcbiAgICB9XG5cbiAgICBbbWFyZ2luQm90dG9tUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50TWFyZ2lucyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudE1hcmdpbnMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudE1hcmdpbnMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRNYXJnaW5zLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgIH1cblxuICAgIFtjb2xvclByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IENvbG9yIHwgVUlDb2xvcikge1xuICAgICAgICBjb25zdCBuYXRpdmVDb2xvciA9IHZhbHVlIGluc3RhbmNlb2YgQ29sb3IgPyB2YWx1ZS5pb3MgOiB2YWx1ZTtcbiAgICAgICAgdGhpcy5faW9zLnRleHRDb2xvciA9IG5hdGl2ZUNvbG9yO1xuICAgIH1cblxuICAgIFt2aXNpYmlsaXR5UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogVmlzaWJpbGl0eSkge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxIaWRkZW4odGhpcy5fZWRpdG9yLCB2YWx1ZSA9PT0gXCJoaWRkZW5cIiB8fCB2YWx1ZSA9PT0gXCJjb2xsYXBzZVwiKTtcbiAgICB9XG5cbiAgICBbZm9udEludGVybmFsUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogVUlGb250IHwgRm9udCkge1xuICAgICAgICBjb25zdCBuYXRpdmVGb250ID0gdmFsdWUgaW5zdGFuY2VvZiBGb250ID8gdmFsdWUuZ2V0VUlGb250KHRoaXMuX2lvcy5mb250KSA6IHZhbHVlO1xuICAgICAgICB0aGlzLl9pb3MuZm9udCA9IG5hdGl2ZUZvbnQ7XG4gICAgfVxuXG4gICAgW3dpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFdpZHRoKHRoaXMuX2VkaXRvciwgdmFsdWUpO1xuICAgIH1cblxuICAgIFtjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IucG9zaXRpb25Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBcImxlZnRcIiB8IFwidG9wXCIpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsUG9zaXRpb24odGhpcy5fZWRpdG9yLCBjb21tb25Nb2R1bGUuRGF0YUZvcm1MYWJlbFBvc2l0aW9uLkxlZnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IFwidG9wXCIpIHtcbiAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFBvc2l0aW9uKHRoaXMuX2VkaXRvciwgY29tbW9uTW9kdWxlLkRhdGFGb3JtTGFiZWxQb3NpdGlvbi5Ub3ApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YUZvcm1FZGl0b3JDb3JlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yQ29yZSB7XG4gICAgX2lvczogVEtEYXRhRm9ybUVkaXRvclZpZXc7XG4gICAgX2VkaXRvcjogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yO1xuICAgIGdldCBpb3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoZWRpdG9yOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLl9pb3MgPSB0aGlzLl9lZGl0b3IuaW9zLmVkaXRvckNvcmU7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdMZWZ0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJMZWZ0ID0gaXNOYU4oK3RoaXMuc3R5bGUuYm9yZGVyTGVmdFdpZHRoKSA/IDAgOiArdGhpcy5zdHlsZS5ib3JkZXJMZWZ0V2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cztcbiAgICAgICAgaWYgKCFjdXJyZW50SW5zZXRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogdmFsdWUgKyBib3JkZXJMZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbYm9yZGVyTGVmdFdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nTGVmdCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0KSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nTGVmdDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9lZGl0b3IuaW9zLmVkaXRvckNvcmUuaW5zZXRzO1xuICAgICAgICBpZiAoIWN1cnJlbnRJbnNldHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiB2YWx1ZSArIHBhZGRpbmdMZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbcGFkZGluZ1RvcFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgYm9yZGVyVG9wID0gaXNOYU4oK3RoaXMuc3R5bGUuYm9yZGVyVG9wV2lkdGgpID8gMCA6ICt0aGlzLnN0eWxlLmJvcmRlclRvcFdpZHRoO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yQ29yZS5pbnNldHM7XG4gICAgICAgIGlmICghY3VycmVudEluc2V0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRJbnNldHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogdmFsdWUgKyBib3JkZXJUb3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yQ29yZS5pbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW2JvcmRlclRvcFdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nVG9wID0gaXNOYU4oK3RoaXMuc3R5bGUucGFkZGluZ1RvcCkgPyAwIDogK3RoaXMuc3R5bGUucGFkZGluZ1RvcDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9lZGl0b3IuaW9zLmVkaXRvckNvcmUuaW5zZXRzO1xuICAgICAgICBpZiAoIWN1cnJlbnRJbnNldHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHZhbHVlICsgcGFkZGluZ1RvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbcGFkZGluZ1JpZ2h0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJSaWdodCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpID8gMCA6ICt0aGlzLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cztcbiAgICAgICAgaWYgKCFjdXJyZW50SW5zZXRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiB2YWx1ZSArIGJvcmRlclJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbYm9yZGVyUmlnaHRXaWR0aFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgcGFkZGluZ1JpZ2h0ID0gaXNOYU4oK3RoaXMuc3R5bGUucGFkZGluZ1JpZ2h0KSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nUmlnaHQ7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cztcbiAgICAgICAgaWYgKCFjdXJyZW50SW5zZXRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiB2YWx1ZSArIHBhZGRpbmdSaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudEluc2V0cy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yQ29yZS5pbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdCb3R0b21Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGJvcmRlckJvdHRvbSA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKSA/IDAgOiArdGhpcy5zdHlsZS5ib3JkZXJCb3R0b21XaWR0aDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLl9lZGl0b3IuaW9zLmVkaXRvckNvcmUuaW5zZXRzO1xuICAgICAgICBpZiAoIWN1cnJlbnRJbnNldHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IHZhbHVlICsgYm9yZGVyQm90dG9tLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmlvcy5lZGl0b3JDb3JlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbYm9yZGVyQm90dG9tV2lkdGhQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBhZGRpbmdCb3R0b20gPSBpc05hTigrdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tKSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yQ29yZS5pbnNldHM7XG4gICAgICAgIGlmICghY3VycmVudEluc2V0cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRJbnNldHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudEluc2V0cy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogdmFsdWUgKyBwYWRkaW5nQm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lZGl0b3IuaW9zLmVkaXRvckNvcmUuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFttYXJnaW5MZWZ0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50TWFyZ2lucyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogdmFsdWUsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRNYXJnaW5zLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50TWFyZ2lucy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudE1hcmdpbnMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgfVxuXG4gICAgW21hcmdpblRvcFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudE1hcmdpbnMgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucztcbiAgICAgICAgbGV0IG1hcmdpbnMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRNYXJnaW5zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHZhbHVlLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRNYXJnaW5zLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50TWFyZ2lucy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zID0gbWFyZ2lucztcbiAgICB9XG5cbiAgICBbbWFyZ2luUmlnaHRQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRNYXJnaW5zID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnM7XG4gICAgICAgIGxldCBtYXJnaW5zID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50TWFyZ2lucy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50TWFyZ2lucy50b3AsXG4gICAgICAgICAgICByaWdodDogdmFsdWUsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRNYXJnaW5zLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgIH1cblxuICAgIFttYXJnaW5Cb3R0b21Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRNYXJnaW5zID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnM7XG4gICAgICAgIGxldCBtYXJnaW5zID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50TWFyZ2lucy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50TWFyZ2lucy50b3AsXG4gICAgICAgICAgICByaWdodDogY3VycmVudE1hcmdpbnMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgfVxuXG4gICAgW2NvbG9yUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogQ29sb3IgfCBVSUNvbG9yKSB7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUNvbG9yID0gdmFsdWUgaW5zdGFuY2VvZiBDb2xvciA/IHZhbHVlLmlvcyA6IHZhbHVlO1xuICAgICAgICB0aGlzLl9lZGl0b3IuaW9zLmVkaXRvckNvbG9yID0gbmF0aXZlQ29sb3I7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3Muc3R5bGUuYWNjZXNzb3J5QXJyb3dTdHJva2UuY29sb3IgPSBuYXRpdmVDb2xvcjtcbiAgICB9XG5cbiAgICBbZm9udEludGVybmFsUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogVUlGb250IHwgRm9udCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0Rm9udCA9IHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yRm9udCA/IHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yRm9udCA6IHRoaXMuX2VkaXRvci5pb3MudGV4dExhYmVsLmZvbnQ7XG4gICAgICAgIGNvbnN0IG5hdGl2ZUZvbnQgPSB2YWx1ZSBpbnN0YW5jZW9mIEZvbnQgPyB2YWx1ZS5nZXRVSUZvbnQoZGVmYXVsdEZvbnQpIDogdmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRvci5pb3MuZWRpdG9yRm9udCA9IG5hdGl2ZUZvbnQ7XG4gICAgfVxufVxuXG4vLyBOT1RFOiBjdXJyZW50bHkgd2UgZG9uJ3QgaGF2ZSBzcGVjaWZpYyBjbGFzcyBmb3IgZXZlcnkgb25lIG9mIHRoZSBlZGl0b3JzIHNpbmNlIHRoZXkgZG9uJ3QgaGF2ZSBzcGVjaWZpYyBwcm9wZXJ0aWVzLCB3aXRoIHNtYWxsIGV4Y2VwdGlvbnNcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUVkaXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvciB7XG5cbiAgICBwcml2YXRlIF9sYWJlbDogRGF0YUZvcm1FZGl0b3JMYWJlbDtcbiAgICBwcml2YXRlIF9lZGl0b3JDb3JlOiBEYXRhRm9ybUVkaXRvckNvcmU7XG4gICAgcHJpdmF0ZSBfaW9zOiBUS0RhdGFGb3JtRWRpdG9yO1xuICAgIHByaXZhdGUgX2VkaXRvckNsYXNzOiBhbnk7XG5cbiAgICBwdWJsaWMgZ2V0IGlvcygpOiBUS0RhdGFGb3JtRWRpdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGlvcyh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9pb3MgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zZXROYXRpdmVWaWV3KHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpZXcodGhpcy5fbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3JDb3JlKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVWaWV3KHRoaXMuX2VkaXRvckNvcmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbmV3IERhdGFGb3JtRWRpdG9yTGFiZWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3JDb3JlID0gbmV3IERhdGFGb3JtRWRpdG9yQ29yZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFZpZXcodGhpcy5fbGFiZWwpO1xuICAgICAgICAgICAgdGhpcy5fYWRkVmlldyh0aGlzLl9lZGl0b3JDb3JlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvckNvcmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IGVkaXRvckNvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3JDb3JlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZWRpdG9yQ2xhc3MoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvckNsYXNzO1xuICAgIH1cblxuICAgIFtwYWRkaW5nTGVmdFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgYm9yZGVyTGVmdCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlckxlZnRXaWR0aCkgPyAwIDogK3RoaXMuc3R5bGUuYm9yZGVyTGVmdFdpZHRoO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5zdHlsZS5pbnNldHM7XG4gICAgICAgIGNvbnN0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogdmFsdWUgKyBib3JkZXJMZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbYm9yZGVyTGVmdFdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nTGVmdCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0KSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nTGVmdDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQuc3R5bGUuaW5zZXRzO1xuICAgICAgICBjb25zdCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IHZhbHVlICsgcGFkZGluZ0xlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQuc3R5bGUuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtwYWRkaW5nVG9wUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJUb3AgPSBpc05hTigrdGhpcy5zdHlsZS5ib3JkZXJUb3BXaWR0aCkgPyAwIDogK3RoaXMuc3R5bGUuYm9yZGVyVG9wV2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cztcbiAgICAgICAgY29uc3QgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHZhbHVlICsgYm9yZGVyVG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQuc3R5bGUuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtib3JkZXJUb3BXaWR0aFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgcGFkZGluZ1RvcCA9IGlzTmFOKCt0aGlzLnN0eWxlLnBhZGRpbmdUb3ApID8gMCA6ICt0aGlzLnN0eWxlLnBhZGRpbmdUb3A7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cztcbiAgICAgICAgY29uc3QgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHZhbHVlICsgcGFkZGluZ1RvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50SW5zZXRzLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbcGFkZGluZ1JpZ2h0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJSaWdodCA9IGlzTmFOKCt0aGlzLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpID8gMCA6ICt0aGlzLnN0eWxlLmJvcmRlclJpZ2h0V2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cztcbiAgICAgICAgY29uc3QgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IHZhbHVlICsgYm9yZGVyUmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQuc3R5bGUuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtib3JkZXJSaWdodFdpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwYWRkaW5nUmlnaHQgPSBpc05hTigrdGhpcy5zdHlsZS5wYWRkaW5nUmlnaHQpID8gMCA6ICt0aGlzLnN0eWxlLnBhZGRpbmdSaWdodDtcbiAgICAgICAgbGV0IGN1cnJlbnRJbnNldHMgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQuc3R5bGUuaW5zZXRzO1xuICAgICAgICBjb25zdCBpbnNldHMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRJbnNldHMubGVmdCxcbiAgICAgICAgICAgIHRvcDogY3VycmVudEluc2V0cy50b3AsXG4gICAgICAgICAgICByaWdodDogdmFsdWUgKyBwYWRkaW5nUmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRJbnNldHMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQuc3R5bGUuaW5zZXRzID0gaW5zZXRzO1xuICAgIH1cblxuICAgIFtwYWRkaW5nQm90dG9tUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBib3JkZXJCb3R0b20gPSBpc05hTigrdGhpcy5zdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgPyAwIDogK3RoaXMuc3R5bGUuYm9yZGVyQm90dG9tV2lkdGg7XG4gICAgICAgIGxldCBjdXJyZW50SW5zZXRzID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cztcbiAgICAgICAgY29uc3QgaW5zZXRzID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiBjdXJyZW50SW5zZXRzLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRJbnNldHMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRJbnNldHMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IHZhbHVlICsgYm9yZGVyQm90dG9tLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnN0eWxlLmluc2V0cyA9IGluc2V0cztcbiAgICB9XG5cbiAgICBbYm9yZGVyQm90dG9tV2lkdGhQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBhZGRpbmdCb3R0b20gPSBpc05hTigrdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tKSA/IDAgOiArdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tO1xuICAgICAgICBsZXQgY3VycmVudEluc2V0cyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5zdHlsZS5pbnNldHM7XG4gICAgICAgIGNvbnN0IGluc2V0cyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudEluc2V0cy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBjdXJyZW50SW5zZXRzLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50SW5zZXRzLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiB2YWx1ZSArIHBhZGRpbmdCb3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5zdHlsZS5pbnNldHMgPSBpbnNldHM7XG4gICAgfVxuXG4gICAgW21hcmdpbkxlZnRQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRNYXJnaW5zID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnM7XG4gICAgICAgIGxldCBtYXJnaW5zID0gbmV3IFVJRWRnZUluc2V0cyh7XG4gICAgICAgICAgICBsZWZ0OiB2YWx1ZSxcbiAgICAgICAgICAgIHRvcDogY3VycmVudE1hcmdpbnMudG9wLFxuICAgICAgICAgICAgcmlnaHQ6IGN1cnJlbnRNYXJnaW5zLnJpZ2h0LFxuICAgICAgICAgICAgYm90dG9tOiBjdXJyZW50TWFyZ2lucy5ib3R0b21cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zID0gbWFyZ2lucztcbiAgICB9XG5cbiAgICBbbWFyZ2luVG9wUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50TWFyZ2lucyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IG5ldyBVSUVkZ2VJbnNldHMoe1xuICAgICAgICAgICAgbGVmdDogY3VycmVudE1hcmdpbnMubGVmdCxcbiAgICAgICAgICAgIHRvcDogdmFsdWUsXG4gICAgICAgICAgICByaWdodDogY3VycmVudE1hcmdpbnMucmlnaHQsXG4gICAgICAgICAgICBib3R0b206IGN1cnJlbnRNYXJnaW5zLmJvdHRvbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgIH1cblxuICAgIFttYXJnaW5SaWdodFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudE1hcmdpbnMgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucztcbiAgICAgICAgbGV0IG1hcmdpbnMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRNYXJnaW5zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRNYXJnaW5zLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiB2YWx1ZSxcbiAgICAgICAgICAgIGJvdHRvbTogY3VycmVudE1hcmdpbnMuYm90dG9tXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgfVxuXG4gICAgW21hcmdpbkJvdHRvbVByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudE1hcmdpbnMgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQubWFyZ2lucztcbiAgICAgICAgbGV0IG1hcmdpbnMgPSBuZXcgVUlFZGdlSW5zZXRzKHtcbiAgICAgICAgICAgIGxlZnQ6IGN1cnJlbnRNYXJnaW5zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IGN1cnJlbnRNYXJnaW5zLnRvcCxcbiAgICAgICAgICAgIHJpZ2h0OiBjdXJyZW50TWFyZ2lucy5yaWdodCxcbiAgICAgICAgICAgIGJvdHRvbTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZC5tYXJnaW5zID0gbWFyZ2lucztcbiAgICB9XG5cbiAgICBbY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yLnNlcGFyYXRvckNvbG9yUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogQ29sb3IpIHtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZVNlcGFyYXRvckNvbG9yKHRoaXMsIHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmF0aXZlVmlldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcyA/IHRoaXMuX2lvcyA6IHN1cGVyLmNyZWF0ZU5hdGl2ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdHlsZVByb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5hcHBseVN0eWxlRm9yUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25QYXJhbXNDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JQYXJhbXMsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX2FwcGx5UGFyYW1zKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblBhcmFtc1Byb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fYXBwbHlQYXJhbXModGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHlwZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUVkaXRvckNsYXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlRWRpdG9yQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5UZXh0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gVEtEYXRhRm9ybVRleHRGaWVsZEVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLk11bHRpbGluZVRleHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBUS0RhdGFGb3JtTXVsdGlsaW5lVGV4dEVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkVtYWlsOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gVEtEYXRhRm9ybUVtYWlsRWRpdG9yLmNsYXNzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuUGFzc3dvcmQ6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBUS0RhdGFGb3JtUGFzc3dvcmRFZGl0b3IuY2xhc3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QaG9uZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IFRLRGF0YUZvcm1QaG9uZUVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkRlY2ltYWw6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBUS0RhdGFGb3JtRGVjaW1hbEVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLk51bWJlcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IFRLRGF0YUZvcm1OdW1iZXJFZGl0b3IuY2xhc3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5Td2l0Y2g6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBUS0RhdGFGb3JtU3dpdGNoRWRpdG9yLmNsYXNzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU3RlcHBlcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IFRLRGF0YUZvcm1TdGVwcGVyRWRpdG9yLmNsYXNzKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU2xpZGVyOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gVEtEYXRhRm9ybVNsaWRlckVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlNlZ21lbnRlZEVkaXRvcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IFRLRGF0YUZvcm1TZWdtZW50ZWRFZGl0b3IuY2xhc3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5EYXRlUGlja2VyOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gVEtEYXRhRm9ybURhdGVQaWNrZXJFZGl0b3IuY2xhc3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5UaW1lUGlja2VyOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gVEtEYXRhRm9ybVRpbWVQaWNrZXJFZGl0b3IuY2xhc3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QaWNrZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBUS0RhdGFGb3JtUGlja2VyVmlld0VkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkxpc3Q6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBUS0RhdGFGb3JtT3B0aW9uc0VkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkF1dG9Db21wbGV0ZUlubGluZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IFRLRGF0YUZvcm1BdXRvQ29tcGxldGVJbmxpbmVFZGl0b3IuY2xhc3MoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5MYWJlbDpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IFRLRGF0YUZvcm1MYWJlbEVkaXRvci5jbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IFVuc3VwcG9ydGVkIGVkaXRvciB0eXBlOiBcIiArIHRoaXMudHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgX2dldE5hdGl2ZUVkaXRvclR5cGUobmF0aXZlRWRpdG9yKSB7XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3IgaW5zdGFuY2VvZiBUS0RhdGFGb3JtTXVsdGlsaW5lVGV4dEVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuTXVsdGlsaW5lVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybUVtYWlsRWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5FbWFpbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybVBhc3N3b3JkRWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QYXNzd29yZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybVBob25lRWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QaG9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybURlY2ltYWxFZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkRlY2ltYWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvciBpbnN0YW5jZW9mIFRLRGF0YUZvcm1OdW1iZXJFZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLk51bWJlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybVN3aXRjaEVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU3dpdGNoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3IgaW5zdGFuY2VvZiBUS0RhdGFGb3JtU3RlcHBlckVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU3RlcHBlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybVNsaWRlckVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU2xpZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3IgaW5zdGFuY2VvZiBUS0RhdGFGb3JtU2VnbWVudGVkRWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5TZWdtZW50ZWRFZGl0b3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvciBpbnN0YW5jZW9mIFRLRGF0YUZvcm1UaW1lUGlja2VyRWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5UaW1lUGlja2VyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3IgaW5zdGFuY2VvZiBUS0RhdGFGb3JtRGF0ZVBpY2tlckVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuRGF0ZVBpY2tlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybVBpY2tlclZpZXdFZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlBpY2tlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybU9wdGlvbnNFZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvciBpbnN0YW5jZW9mIFRLRGF0YUZvcm1BdXRvQ29tcGxldGVJbmxpbmVFZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkF1dG9Db21wbGV0ZUlubGluZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yIGluc3RhbmNlb2YgVEtEYXRhRm9ybUxhYmVsRWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5MYWJlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5UZXh0O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEN1c3RvbVByb3BlcnR5RWRpdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLkN1c3RvbVByb3BlcnR5RWRpdG9yIHtcblxuICAgIF9uYXRpdmVEZWxlZ2F0ZTogVEtEYXRhRm9ybUN1c3RvbUVkaXRvckRlbGVnYXRlSW1wbGVtZW50YXRpb247XG4gICAgcHJpdmF0ZSBfbGFiZWw6IERhdGFGb3JtRWRpdG9yTGFiZWw7XG4gICAgcHJpdmF0ZSBfZWRpdG9yQ29yZTogRGF0YUZvcm1FZGl0b3JDb3JlO1xuICAgIHByaXZhdGUgX2lvczogVEtEYXRhRm9ybUN1c3RvbUVkaXRvcjtcbiAgICBwcml2YXRlIF9lZGl0b3JDbGFzczogYW55O1xuXG4gICAgcHVibGljIGdldCBpb3MoKTogVEtEYXRhRm9ybUN1c3RvbUVkaXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBpb3ModmFsdWUpIHtcbiAgICAgICAgdGhpcy5faW9zID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVmlldyh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVWaWV3KHRoaXMuX2xhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZWRpdG9yQ29yZSkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlVmlldyh0aGlzLl9lZGl0b3JDb3JlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW9zKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBEYXRhRm9ybUVkaXRvckxhYmVsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ29yZSA9IG5ldyBEYXRhRm9ybUVkaXRvckNvcmUodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRWaWV3KHRoaXMuX2xhYmVsKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFZpZXcodGhpcy5fZWRpdG9yQ29yZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3JDb3JlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xuICAgIH1cblxuICAgIGdldCBlZGl0b3JDb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yQ29yZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGVkaXRvckNsYXNzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3JDbGFzcztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdHlsZVByb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5hcHBseVN0eWxlRm9yUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25QYXJhbXNDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JQYXJhbXMsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JQYXJhbXMpOiB2b2lkIHtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX2FwcGx5UGFyYW1zKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblBhcmFtc1Byb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fYXBwbHlQYXJhbXModGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHlwZUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogWW91IGNhbid0IGNoYW5nZSBDdXN0b21Qcm9wZXJ0eUVkaXRvcidzIHR5cGVcIik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hdGl2ZURlbGVnYXRlID0gVEtEYXRhRm9ybUN1c3RvbUVkaXRvckRlbGVnYXRlSW1wbGVtZW50YXRpb24ubmV3KCkuaW5pdFdpdGhPd25lcih0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5VmFsdWVDaGFuZ2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pb3MpIHtcbiAgICAgICAgICAgIHRoaXMuaW9zLm5vdGlmeVZhbHVlQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUVkaXRvckhlbHBlciB7XG4gICAgc3RhdGljIF9saW5rRWRpdG9yV2l0aE5hdGl2ZShlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvciwgdmFsdWU6IFRLRGF0YUZvcm1FZGl0b3IpIHtcbiAgICAgICAgaWYgKGVkaXRvciBpbnN0YW5jZW9mIEN1c3RvbVByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgICAgICAoPEN1c3RvbVByb3BlcnR5RWRpdG9yPmVkaXRvcikuaW9zID0gPFRLRGF0YUZvcm1DdXN0b21FZGl0b3I+dmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAoPFByb3BlcnR5RWRpdG9yPmVkaXRvcikuaW9zID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZSkge1xuICAgICAgICAgICAgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUgPSBuZXcgY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yU3R5bGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVkaXRvci5wYXJhbXMpIHtcbiAgICAgICAgICAgIGVkaXRvci5wYXJhbXMgPSBuZXcgY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yUGFyYW1zKCk7XG4gICAgICAgIH1cbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX29uTmF0aXZlU2V0KGVkaXRvcik7XG4gICAgfVxuXG4gICAgc3RhdGljIF9vbk5hdGl2ZVNldChlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcikge1xuICAgICAgICBpZiAoIWVkaXRvci5pb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWRpdG9yIGluc3RhbmNlb2YgQ3VzdG9tUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5pb3MuZGVsZWdhdGUgPSBlZGl0b3IuX25hdGl2ZURlbGVnYXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFlZGl0b3IudHlwZSkge1xuICAgICAgICAgICAgICAgIGVkaXRvci50eXBlID0gUHJvcGVydHlFZGl0b3IuX2dldE5hdGl2ZUVkaXRvclR5cGUoZWRpdG9yLmlvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX2FwcGx5UGFyYW1zKGVkaXRvcik7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVMYWJlbFRleHRDb2xvcihlZGl0b3IsIGxhYmVsVGV4dENvbG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yLmlvcyB8fCBsYWJlbFRleHRDb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLmlvcy50ZXh0TGFiZWwudGV4dENvbG9yID0gbGFiZWxUZXh0Q29sb3IuaW9zO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTGFiZWxGb250KGVkaXRvciwgbGFiZWxGb250TmFtZSwgbGFiZWxUZXh0U2l6ZSwgbGFiZWxGb250U3R5bGUpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuaW9zIHx8XG4gICAgICAgICAgICAobGFiZWxGb250TmFtZSA9PT0gdW5kZWZpbmVkICYmIGxhYmVsRm9udFN0eWxlID09PSB1bmRlZmluZWQgJiYgbGFiZWxUZXh0U2l6ZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRpdG9yLmlvcy50ZXh0TGFiZWwuZm9udCA9IFJhZERhdGFGb3JtLmdldEZvbnRXaXRoUHJvcGVydGllcyhsYWJlbEZvbnROYW1lLCBsYWJlbFRleHRTaXplLCBsYWJlbEZvbnRTdHlsZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVMYWJlbE9mZnNldChlZGl0b3IsIGxhYmVsSG9yaXpvbnRhbE9mZnNldCwgbGFiZWxWZXJ0aWNhbE9mZnNldCkge1xuICAgICAgICBpZiAoIWVkaXRvci5pb3MgfHwgKGxhYmVsSG9yaXpvbnRhbE9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxhYmVsVmVydGljYWxPZmZzZXQgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVkaXRvci5pb3Muc3R5bGUudGV4dExhYmVsT2Zmc2V0ID0ge1xuICAgICAgICAgICAgaG9yaXpvbnRhbDogKGlzTmFOKGxhYmVsSG9yaXpvbnRhbE9mZnNldCkpID8gMCA6IGxhYmVsSG9yaXpvbnRhbE9mZnNldCxcbiAgICAgICAgICAgIHZlcnRpY2FsOiAoaXNOYU4obGFiZWxWZXJ0aWNhbE9mZnNldCkpID8gMCA6IGxhYmVsVmVydGljYWxPZmZzZXRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3VwZGF0ZUVkaXRvck9mZnNldChlZGl0b3IsIGVkaXRvckhvcml6b250YWxPZmZzZXQsIGVkaXRvclZlcnRpY2FsT2Zmc2V0KSB7XG4gICAgICAgIGlmICghZWRpdG9yLmlvcyB8fCAoZWRpdG9ySG9yaXpvbnRhbE9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGVkaXRvclZlcnRpY2FsT2Zmc2V0ID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLmlvcy5zdHlsZS5lZGl0b3JPZmZzZXQgPSB7XG4gICAgICAgICAgICBob3Jpem9udGFsOiAoaXNOYU4oZWRpdG9ySG9yaXpvbnRhbE9mZnNldCkpID8gMCA6IGVkaXRvckhvcml6b250YWxPZmZzZXQsXG4gICAgICAgICAgICB2ZXJ0aWNhbDogKGlzTmFOKGVkaXRvclZlcnRpY2FsT2Zmc2V0KSkgPyAwIDogZWRpdG9yVmVydGljYWxPZmZzZXRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3VwZGF0ZUVkaXRvckZpbGxDb2xvcihlZGl0b3IsIGVkaXRvckZpbGxDb2xvcikge1xuICAgICAgICBpZiAoIWVkaXRvci5pb3MgfHwgZWRpdG9yRmlsbENvbG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3IuaW9zLnN0eWxlLmZpbGwgPSBUS1NvbGlkRmlsbC5zb2xpZEZpbGxXaXRoQ29sb3IoZWRpdG9yRmlsbENvbG9yLmlvcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVFZGl0b3JTdHJva2UoZWRpdG9yLCBlZGl0b3JTdHJva2VDb2xvciwgZWRpdG9yU3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuaW9zIHx8IChlZGl0b3JTdHJva2VDb2xvciA9PT0gdW5kZWZpbmVkICYmIGVkaXRvclN0cm9rZVdpZHRoID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN0cm9rZTogVEtTdHJva2UgPSBUS1N0cm9rZS5uZXcoKTtcbiAgICAgICAgaWYgKGVkaXRvclN0cm9rZVdpZHRoKSB7XG4gICAgICAgICAgICBzdHJva2Uud2lkdGggPSBlZGl0b3JTdHJva2VXaWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlZGl0b3JTdHJva2VDb2xvcikge1xuICAgICAgICAgICAgc3Ryb2tlLmNvbG9yID0gZWRpdG9yU3Ryb2tlQ29sb3IuaW9zO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRpdG9yLmlvcy5zdHlsZS5zdHJva2UgPSBzdHJva2U7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVMYWJlbEhpZGRlbihlZGl0b3IsIGxhYmVsSGlkZGVuKSB7XG4gICAgICAgIGlmICghZWRpdG9yLmlvcyB8fCBsYWJlbEhpZGRlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLmlvcy5zdHlsZS50ZXh0TGFiZWxEaXNwbGF5TW9kZSA9IGxhYmVsSGlkZGVuID8gVEtEYXRhRm9ybUVkaXRvclRleHRMYWJlbERpc3BsYXlNb2RlLkhpZGRlbiA6IFRLRGF0YUZvcm1FZGl0b3JUZXh0TGFiZWxEaXNwbGF5TW9kZS5TaG93O1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTGFiZWxQb3NpdGlvbihlZGl0b3IsIGxhYmVsUG9zaXRpb246IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUxhYmVsUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuaW9zIHx8IGxhYmVsUG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYWJlbFBvc2l0aW9uID09PSBjb21tb25Nb2R1bGUuRGF0YUZvcm1MYWJlbFBvc2l0aW9uLkxlZnQpIHtcbiAgICAgICAgICAgIGVkaXRvci5pb3MubGFiZWxQb3NpdGlvbiA9IFRLRGF0YUZvcm1MYWJlbFBvc2l0aW9uLlRLRGF0YUZvcm1MYWJlbFBvc2l0aW9uTGVmdDtcbiAgICAgICAgICAgIGVkaXRvci5pb3Muc2V0TmVlZHNMYXlvdXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbFBvc2l0aW9uID09PSBjb21tb25Nb2R1bGUuRGF0YUZvcm1MYWJlbFBvc2l0aW9uLlRvcCkge1xuICAgICAgICAgICAgZWRpdG9yLmlvcy5sYWJlbFBvc2l0aW9uID0gVEtEYXRhRm9ybUxhYmVsUG9zaXRpb24uVEtEYXRhRm9ybUxhYmVsUG9zaXRpb25Ub3A7XG4gICAgICAgICAgICBlZGl0b3IuaW9zLnNldE5lZWRzTGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgX3VwZGF0ZUxhYmVsV2lkdGgoZWRpdG9yLCBsYWJlbFdpZHRoKSB7XG4gICAgICAgIGlmICghZWRpdG9yLmlvcyB8fCBsYWJlbFdpZHRoID09PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5pb3Muc3R5bGUudGV4dExhYmVsV2lkdGggPSBsYWJlbFdpZHRoO1xuICAgICAgICBlZGl0b3IuaW9zLnNldE5lZWRzTGF5b3V0KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVTZXBhcmF0b3JDb2xvcihlZGl0b3IsIHNlcGFyYXRvckNvbG9yOiBDb2xvcikge1xuICAgICAgICBpZiAoIWVkaXRvci5pb3MgfHwgc2VwYXJhdG9yQ29sb3IgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5pb3Muc3R5bGUuc2VwYXJhdG9yQ29sb3IgPSBUS1NvbGlkRmlsbC5zb2xpZEZpbGxXaXRoQ29sb3Ioc2VwYXJhdG9yQ29sb3IuaW9zKTtcbiAgICAgICAgZWRpdG9yLmlvcy5zZXROZWVkc0Rpc3BsYXkoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX2FwcGx5UGFyYW1zKGVkaXRvcikge1xuICAgICAgICBsZXQgZWRpdG9yUGFyYW1zOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JQYXJhbXMgPSBlZGl0b3IucGFyYW1zO1xuICAgICAgICBpZiAoIWVkaXRvclBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZGl0b3JQYXJhbXMubWluaW11bSAmJiBlZGl0b3JQYXJhbXMubWF4aW11bSkge1xuICAgICAgICAgICAgaWYgKCFpc05hTihlZGl0b3JQYXJhbXMubWluaW11bSkgJiYgIWlzTmFOKGVkaXRvclBhcmFtcy5tYXhpbXVtKSkge1xuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVOYXRpdmVSYW5nZShlZGl0b3IsIFRLUmFuZ2UucmFuZ2VXaXRoTWluaW11bUFuZE1heGltdW0oZWRpdG9yUGFyYW1zLm1pbmltdW0sIGVkaXRvclBhcmFtcy5tYXhpbXVtKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvclBhcmFtcy5zdGVwICYmICFpc05hTihlZGl0b3JQYXJhbXMuc3RlcCkpIHtcbiAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVOYXRpdmVTdGVwKGVkaXRvciwgZWRpdG9yUGFyYW1zLnN0ZXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVOYXRpdmVSYW5nZShlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvciwgcmFuZ2U6IFRLUmFuZ2UpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuaW9zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvci5pb3MucHJvcGVydHkucmFuZ2UgPT09IHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLmlvcy5wcm9wZXJ0eS5yYW5nZSA9IHJhbmdlO1xuICAgICAgICBlZGl0b3IuaW9zLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTmF0aXZlU3RlcChlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvciwgc3RlcDogYW55KSB7XG4gICAgICAgIGlmICghZWRpdG9yLmlvcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlZGl0b3IuaW9zLnByb3BlcnR5LnN0ZXAgPT09IHN0ZXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3IuaW9zLnByb3BlcnR5LnN0ZXAgPSBzdGVwO1xuICAgICAgICBlZGl0b3IuaW9zLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhcHBseVN0eWxlKGVkaXRvcjogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUgfHwgIWVkaXRvci5pb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxUZXh0Q29sb3IoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbFRleHRDb2xvcik7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbEZvbnQoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbEZvbnROYW1lLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbFRleHRTaXplLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbEZvbnRTdHlsZSk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbE9mZnNldChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsSG9yaXpvbnRhbE9mZnNldCwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxWZXJ0aWNhbE9mZnNldCk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JPZmZzZXQoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5lZGl0b3JIb3Jpem9udGFsT2Zmc2V0LCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5lZGl0b3JWZXJ0aWNhbE9mZnNldCk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JGaWxsQ29sb3IoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5maWxsQ29sb3IpO1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlRWRpdG9yU3Ryb2tlKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuc3Ryb2tlQ29sb3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLnN0cm9rZVdpZHRoKTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsSGlkZGVuKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxIaWRkZW4pO1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxQb3NpdGlvbihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsUG9zaXRpb24pO1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxXaWR0aChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsV2lkdGgpO1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlU2VwYXJhdG9yQ29sb3IoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5zZXBhcmF0b3JDb2xvcik7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLnNldE5lZWRzTGF5b3V0KGVkaXRvcik7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLnNldE5lZWRzRGlzcGxheShlZGl0b3IpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZXROZWVkc0Rpc3BsYXkoZWRpdG9yOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgaWYgKGVkaXRvci5pb3MpIHtcbiAgICAgICAgICAgIGVkaXRvci5pb3Muc2V0TmVlZHNEaXNwbGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0TmVlZHNMYXlvdXQoZWRpdG9yOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgaWYgKGVkaXRvci5pb3MpIHtcbiAgICAgICAgICAgIGVkaXRvci5pb3Muc2V0TmVlZHNMYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBhcHBseVN0eWxlRm9yUHJvcGVydHkoZWRpdG9yOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IsIHByb3BlcnR5TmFtZTogU3RyaW5nKSB7XG4gICAgICAgIGlmICghZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUgfHwgIWVkaXRvci5pb3MpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsVGV4dENvbG9yXCI6XG4gICAgICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsVGV4dENvbG9yKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxUZXh0Q29sb3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsRm9udE5hbWVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJsYWJlbEZvbnRTdHlsZVwiOlxuICAgICAgICAgICAgY2FzZSBcImxhYmVsVGV4dFNpemVcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxGb250KGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxGb250TmFtZSwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxUZXh0U2l6ZSwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxGb250U3R5bGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsSG9yaXpvbnRhbE9mZnNldFwiOlxuICAgICAgICAgICAgY2FzZSBcImxhYmVsVmVydGljYWxPZmZzZXRcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxPZmZzZXQoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbEhvcml6b250YWxPZmZzZXQsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsVmVydGljYWxPZmZzZXQpO1xuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLnNldE5lZWRzTGF5b3V0KGVkaXRvcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZWRpdG9ySG9yaXpvbnRhbE9mZnNldFwiOlxuICAgICAgICAgICAgY2FzZSBcImVkaXRvclZlcnRpY2FsT2Zmc2V0XCI6XG4gICAgICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUVkaXRvck9mZnNldChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmVkaXRvckhvcml6b250YWxPZmZzZXQsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmVkaXRvclZlcnRpY2FsT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5zZXROZWVkc0xheW91dChlZGl0b3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImZpbGxDb2xvclwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JGaWxsQ29sb3IoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5maWxsQ29sb3IpO1xuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLnNldE5lZWRzRGlzcGxheShlZGl0b3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN0cm9rZUNvbG9yXCI6XG4gICAgICAgICAgICBjYXNlIFwic3Ryb2tlV2lkdGhcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlRWRpdG9yU3Ryb2tlKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuc3Ryb2tlQ29sb3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLnN0cm9rZVdpZHRoKTtcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5zZXROZWVkc0Rpc3BsYXkoZWRpdG9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsYWJlbEhpZGRlblwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbEhpZGRlbihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsSGlkZGVuKTtcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5zZXROZWVkc0xheW91dChlZGl0b3IpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsUG9zaXRpb25cIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxQb3NpdGlvbihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLnNldE5lZWRzTGF5b3V0KGVkaXRvcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFiZWxXaWR0aFwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFdpZHRoKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxXaWR0aCk7XG4gICAgICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuc2V0TmVlZHNMYXlvdXQoZWRpdG9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzZXBhcmF0b3JDb2xvclwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVTZXBhcmF0b3JDb2xvcihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLnNlcGFyYXRvckNvbG9yKTtcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5zZXROZWVkc0Rpc3BsYXkoZWRpdG9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVmFsaWRhdG9yc1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5VmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLlByb3BlcnR5VmFsaWRhdG9yIHtcbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm1NYW51YWxWYWxpZGF0b3I7XG4gICAgcHJpdmF0ZSBfbmF0aXZlRGVsZWdhdGU6IFRLRGF0YUZvcm1WYWxpZGF0aW9uUHJvdmlkZXJEZWxlZ2F0ZUltcGxlbWVudGF0aW9uO1xuXG4gICAgcHVibGljIGdldCBpb3MoKTogVEtEYXRhRm9ybU1hbnVhbFZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm1NYW51YWxWYWxpZGF0b3IubmV3KCk7XG4gICAgICAgIHRoaXMuX25hdGl2ZURlbGVnYXRlID0gVEtEYXRhRm9ybVZhbGlkYXRpb25Qcm92aWRlckRlbGVnYXRlSW1wbGVtZW50YXRpb24ubmV3KCkuaW5pdFdpdGhPd25lcih0aGlzKTtcbiAgICAgICAgdGhpcy5faW9zLmRlbGVnYXRlID0gdGhpcy5fbmF0aXZlRGVsZWdhdGU7XG5cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JNZXNzYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCJUaGlzIGlzIG5vdCB2YWxpZC5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBNaW5pbXVtTGVuZ3RoVmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLk1pbmltdW1MZW5ndGhWYWxpZGF0b3Ige1xuXG4gICAgcHJpdmF0ZSBfaW9zOiBUS0RhdGFGb3JtTWluaW11bUxlbmd0aFZhbGlkYXRvcjtcbiAgICBwdWJsaWMgZ2V0IGlvcygpOiBUS0RhdGFGb3JtTWluaW11bUxlbmd0aFZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm1NaW5pbXVtTGVuZ3RoVmFsaWRhdG9yLm5ldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxlbmd0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuaW9zLm1pbmltdW1MZW5ndGggPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1heGltdW1MZW5ndGhWYWxpZGF0b3IgZXh0ZW5kcyBjb21tb25Nb2R1bGUuTWF4aW11bUxlbmd0aFZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm1NYXhpbXVtTGVuZ3RoVmFsaWRhdG9yO1xuICAgIHB1YmxpYyBnZXQgaW9zKCk6IFRLRGF0YUZvcm1NYXhpbXVtTGVuZ3RoVmFsaWRhdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW9zID0gVEtEYXRhRm9ybU1heGltdW1MZW5ndGhWYWxpZGF0b3IubmV3KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGVuZ3RoQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghaXNOYU4obmV3VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmlvcy5tYXhpbXVtTGVndGggPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLkVtYWlsVmFsaWRhdG9yIHtcblxuICAgIHByaXZhdGUgX2lvczogVEtEYXRhRm9ybUVtYWlsVmFsaWRhdG9yO1xuICAgIHB1YmxpYyBnZXQgaW9zKCk6IFRLRGF0YUZvcm1FbWFpbFZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm1FbWFpbFZhbGlkYXRvci5uZXcoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBOb25FbXB0eVZhbGlkYXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5Ob25FbXB0eVZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm1Ob25FbXB0eVZhbGlkYXRvcjtcbiAgICBwdWJsaWMgZ2V0IGlvcygpOiBUS0RhdGFGb3JtTm9uRW1wdHlWYWxpZGF0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5faW9zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pb3MgPSBUS0RhdGFGb3JtTm9uRW1wdHlWYWxpZGF0b3IubmV3KCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmFuZ2VWYWxpZGF0b3IgZXh0ZW5kcyBjb21tb25Nb2R1bGUuUmFuZ2VWYWxpZGF0b3Ige1xuXG4gICAgcHJpdmF0ZSBfaW9zOiBUS0RhdGFGb3JtUmFuZ2VWYWxpZGF0b3I7XG4gICAgcHVibGljIGdldCBpb3MoKTogVEtEYXRhRm9ybVJhbmdlVmFsaWRhdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lvcztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5faW9zID0gVEtEYXRhRm9ybVJhbmdlVmFsaWRhdG9yLm5ldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1pbmltdW1DaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pb3MucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlvcy5yYW5nZS5taW5pbXVtID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW9zLnJhbmdlID0gVEtSYW5nZS5yYW5nZVdpdGhNaW5pbXVtQW5kTWF4aW11bShuZXdWYWx1ZSwgbmV3VmFsdWUgKiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1heGltdW1DaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pb3MucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlvcy5yYW5nZS5tYXhpbXVtID0gbmV3VmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW9zLnJhbmdlID0gVEtSYW5nZS5yYW5nZVdpdGhNaW5pbXVtQW5kTWF4aW11bShuZXdWYWx1ZSAvIDIsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBob25lVmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLlBob25lVmFsaWRhdG9yIHtcblxuICAgIHByaXZhdGUgX2lvczogVEtEYXRhRm9ybVBob25lVmFsaWRhdG9yO1xuICAgIHB1YmxpYyBnZXQgaW9zKCk6IFRLRGF0YUZvcm1QaG9uZVZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm1QaG9uZVZhbGlkYXRvci5uZXcoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWdFeFZhbGlkYXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5SZWdFeFZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm1SZWdFeFZhbGlkYXRvcjtcbiAgICBwdWJsaWMgZ2V0IGlvcygpOiBUS0RhdGFGb3JtUmVnRXhWYWxpZGF0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5faW9zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pb3MgPSBUS0RhdGFGb3JtUmVnRXhWYWxpZGF0b3IubmV3KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVnRXhDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faW9zLnJlZ0V4ID0gbmV3VmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgSXNUcnVlVmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLklzVHJ1ZVZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm1Jc1RydWVWYWxpZGF0b3I7XG4gICAgcHVibGljIGdldCBpb3MoKTogVEtEYXRhRm9ybUlzVHJ1ZVZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm1Jc1RydWVWYWxpZGF0b3IubmV3KCk7XG4gICAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbnZlcnRlcnNcbmV4cG9ydCBjbGFzcyBTdHJpbmdUb0RhdGVDb252ZXJ0ZXIgZXh0ZW5kcyBjb21tb25Nb2R1bGUuU3RyaW5nVG9EYXRlQ29udmVydGVyIHtcbiAgICBwcml2YXRlIF9pb3M6IFRLRGF0YUZvcm1TdHJpbmdUb0RhdGVDb252ZXJ0ZXI7XG4gICAgcHVibGljIGdldCBpb3MoKTogVEtEYXRhRm9ybVN0cmluZ1RvRGF0ZUNvbnZlcnRlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2lvcyA9IFRLRGF0YUZvcm1TdHJpbmdUb0RhdGVDb252ZXJ0ZXIubmV3KCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nVG9UaW1lQ29udmVydGVyIGV4dGVuZHMgY29tbW9uTW9kdWxlLlN0cmluZ1RvVGltZUNvbnZlcnRlciB7XG4gICAgcHJpdmF0ZSBfaW9zOiBUS0RhdGFGb3JtU3RyaW5nVG9UaW1lQ29udmVydGVyO1xuICAgIHB1YmxpYyBnZXQgaW9zKCk6IFRLRGF0YUZvcm1TdHJpbmdUb1RpbWVDb252ZXJ0ZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5faW9zO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9pb3MgPSBUS0RhdGFGb3JtU3RyaW5nVG9UaW1lQ29udmVydGVyLm5ldygpO1xuICAgIH1cbn1cbiJdfQ==