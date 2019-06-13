"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = require("./ui-dataform.common");
var color_1 = require("tns-core-modules/color");
var utils_1 = require("tns-core-modules/utils/utils");
var observable_1 = require("tns-core-modules/data/observable");
var enums_1 = require("tns-core-modules/ui/enums");
var font_1 = require("tns-core-modules/ui/styling/font");
var nativescript_ui_autocomplete_1 = require("nativescript-ui-autocomplete");
var view_1 = require("tns-core-modules/ui/core/view");
__export(require("./ui-dataform.common"));
var DataFormCreateGroupClass;
var DataFormExpandedChangedListener;
var DataFormValidationListener;
var DataFormEditorCustomizations;
var DataFormEditorGroupCustomizations;
var DataFormEntityPropertyCommitListener;
var DataFormValidationInfoProcedure;
function initializeListeners() {
    if (!DataFormExpandedChangedListener) {
        var DataFormExpandedChangedListenerImpl = /** @class */ (function (_super) {
            __extends(DataFormExpandedChangedListenerImpl, _super);
            function DataFormExpandedChangedListenerImpl(owner, group) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                _this.group = group;
                return global.__native(_this);
            }
            DataFormExpandedChangedListenerImpl.prototype.onChanged = function (isExpanded) {
                var name = isExpanded ?
                    commonModule.RadDataForm.groupExpandedEvent :
                    commonModule.RadDataForm.groupCollapsedEvent;
                var propertyGroup = this.owner.getGroupByName(this.group.name());
                propertyGroup.collapsed = !isExpanded;
                var args = {
                    eventName: name,
                    object: this.owner,
                    editor: undefined,
                    entityProperty: undefined,
                    propertyName: undefined,
                    group: this.group,
                    groupName: this.group.name(),
                    returnValue: true
                };
                this.owner.notify(args);
            };
            DataFormExpandedChangedListenerImpl = __decorate([
                Interfaces([com.telerik.widget.dataform.visualization.ExpandableEditorGroup.IsExpandedChangedListener]),
                __metadata("design:paramtypes", [RadDataForm, com.telerik.widget.dataform.visualization.ExpandableEditorGroup])
            ], DataFormExpandedChangedListenerImpl);
            return DataFormExpandedChangedListenerImpl;
        }(java.lang.Object));
        DataFormExpandedChangedListener = DataFormExpandedChangedListenerImpl;
    }
    if (!DataFormCreateGroupClass) {
        var DataFormCreateGroupClassImpl = /** @class */ (function (_super) {
            __extends(DataFormCreateGroupClassImpl, _super);
            function DataFormCreateGroupClassImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            DataFormCreateGroupClassImpl.prototype._updateGroupLayout = function (propertyGroup, nativeGroup) {
                var context = nativeGroup.rootLayout().getContext();
                if (propertyGroup.layout instanceof commonModule.DataFormStackLayout) {
                    var nativeLinearLayout = new com.telerik.widget.dataform.visualization.DataFormLinearLayoutManager(context);
                    if (propertyGroup.layout.orientation === enums_1.Orientation.horizontal) {
                        nativeLinearLayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
                    }
                    else {
                        nativeLinearLayout.setOrientation(android.widget.LinearLayout.VERTICAL);
                    }
                    nativeGroup.setLayoutManager(nativeLinearLayout);
                }
                else if (propertyGroup.layout instanceof commonModule.DataFormGridLayout) {
                    var nativeTableLayout = new com.telerik.widget.dataform.visualization.DataFormTableLayoutManager(context);
                    nativeGroup.setLayoutManager(nativeTableLayout);
                }
            };
            DataFormCreateGroupClassImpl.prototype.apply = function (context, name) {
                var dataForm = this.owner;
                if (dataForm.groups) {
                    for (var i = 0; i < dataForm.groups.length; i++) {
                        var propertyGroup = dataForm.groups[i];
                        if (propertyGroup.name === name.toString()) {
                            var group_1 = new com.telerik.widget.dataform.visualization.ExpandableEditorGroup(context, name.toString());
                            if (!propertyGroup.collapsible) {
                                group_1.setExpandable(false);
                            }
                            var newListener = new DataFormExpandedChangedListener(this.owner, group_1);
                            this.owner.groupListeners.push(newListener);
                            group_1.addIsExpandedChangedListener(newListener);
                            if (propertyGroup.collapsed) {
                                group_1.setIsExpanded(false);
                            }
                            if (propertyGroup.hidden) {
                                group_1.rootLayout().setVisibility(android.view.View.GONE);
                            }
                            if (propertyGroup.titleHidden) {
                                group_1.getHeaderContainer().setVisibility(android.view.View.GONE);
                            }
                            if (!propertyGroup.titleStyle) {
                                propertyGroup.titleStyle = new commonModule.GroupTitleStyle();
                            }
                            if (!propertyGroup.layout) {
                                propertyGroup.layout = new commonModule.DataFormStackLayout();
                            }
                            this._updateGroupLayout(propertyGroup, group_1);
                            dataForm._attachGroupChangeListener(propertyGroup);
                            return group_1;
                        }
                    }
                }
                var group = new com.telerik.widget.dataform.visualization.ExpandableEditorGroup(context, name.toString());
                group.setExpandable(false);
                return group;
            };
            DataFormCreateGroupClassImpl = __decorate([
                Interfaces([com.telerik.android.common.Function2]),
                __metadata("design:paramtypes", [RadDataForm])
            ], DataFormCreateGroupClassImpl);
            return DataFormCreateGroupClassImpl;
        }(java.lang.Object));
        DataFormCreateGroupClass = DataFormCreateGroupClassImpl;
    }
    if (!DataFormValidationListener) {
        var DataFormValidationListenerImpl = /** @class */ (function (_super) {
            __extends(DataFormValidationListenerImpl, _super);
            function DataFormValidationListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            DataFormValidationListenerImpl.prototype.onValidate = function (property) {
                var dataForm = this.owner;
                var entityProperty = dataForm.getPropertyByName(property.name());
                var group = dataForm.getGroupByName(property.getGroupName());
                var args = {
                    eventName: commonModule.RadDataForm.propertyValidateEvent,
                    object: dataForm,
                    editor: entityProperty.editor,
                    entityProperty: entityProperty,
                    propertyName: property.name(),
                    group: group,
                    groupName: property.getGroupName(),
                    returnValue: true
                };
                dataForm.notify(args);
                if (property instanceof com.telerik.widget.dataform.engine.EntityPropertyCore) {
                    var result = Promise.resolve(args.returnValue);
                    property.onValidationStarted();
                    var validationValue_1 = entityProperty.valueCandidate;
                    result.then((function (answer) {
                        if (answer === false) {
                            property.onValidationResult(validationValue_1, false, entityProperty.errorMessage);
                        }
                        else {
                            property.onValidationResult(validationValue_1, true, entityProperty.successMessage);
                        }
                    }));
                }
            };
            DataFormValidationListenerImpl.prototype.onDidValidate = function (property) {
                var dataForm = this.owner;
                if (!dataForm) {
                    return;
                }
                var entityProperty = dataForm.getPropertyByName(property.name());
                var group = dataForm.getGroupByName(property.getGroupName());
                var args = {
                    eventName: commonModule.RadDataForm.propertyValidatedEvent,
                    object: dataForm,
                    editor: entityProperty.editor,
                    entityProperty: entityProperty,
                    propertyName: property.name(),
                    group: group,
                    groupName: property.getGroupName(),
                    returnValue: true
                };
                dataForm.notify(args);
            };
            DataFormValidationListenerImpl = __decorate([
                Interfaces([com.telerik.widget.dataform.engine.EntityPropertyValidationListener]),
                __metadata("design:paramtypes", [RadDataForm])
            ], DataFormValidationListenerImpl);
            return DataFormValidationListenerImpl;
        }(java.lang.Object));
        DataFormValidationListener = DataFormValidationListenerImpl;
    }
    if (!DataFormEditorCustomizations) {
        var DataFormEditorCustomizationsImpl = /** @class */ (function (_super) {
            __extends(DataFormEditorCustomizationsImpl, _super);
            function DataFormEditorCustomizationsImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            DataFormEditorCustomizationsImpl.prototype.apply = function (editor) {
                var dataForm = this.owner;
                var property = dataForm.getPropertyByName(editor.property().name());
                if (property.editor) {
                    PropertyEditorHelper.applyStyle(property.editor);
                }
                var groupName = property.android ? property.android.getGroupName() : undefined;
                var args = {
                    eventName: commonModule.RadDataForm.editorUpdateEvent,
                    object: dataForm,
                    editor: editor,
                    entityProperty: property.android,
                    propertyName: property.name,
                    group: undefined,
                    groupName: groupName,
                    returnValue: true
                };
                dataForm.notify(args);
            };
            DataFormEditorCustomizationsImpl = __decorate([
                Interfaces([com.telerik.android.common.Procedure]),
                __metadata("design:paramtypes", [RadDataForm])
            ], DataFormEditorCustomizationsImpl);
            return DataFormEditorCustomizationsImpl;
        }(java.lang.Object));
        DataFormEditorCustomizations = DataFormEditorCustomizationsImpl;
    }
    if (!DataFormEditorGroupCustomizations) {
        var DataFormEditorGroupCustomizationsImpl = /** @class */ (function (_super) {
            __extends(DataFormEditorGroupCustomizationsImpl, _super);
            function DataFormEditorGroupCustomizationsImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            DataFormEditorGroupCustomizationsImpl.prototype._applyGroupTitleStyle = function (nativeGroup, titleStyle) {
                if (titleStyle.fillColor) {
                    nativeGroup.getHeaderContainer().setBackgroundColor(titleStyle.fillColor.android);
                }
                if (titleStyle.strokeColor || titleStyle.strokeWidth) {
                    var drawable = new android.graphics.drawable.GradientDrawable();
                    var strokeWidthDips = titleStyle.strokeWidth ? titleStyle.strokeWidth : 2;
                    var strokeWidth = strokeWidthDips * utils_1.layout.getDisplayDensity();
                    var strokeColor = titleStyle.strokeColor ?
                        titleStyle.strokeColor.android :
                        android.graphics.Color.BLACK;
                    var fillColor = titleStyle.fillColor ?
                        titleStyle.fillColor.android :
                        android.graphics.Color.TRANSPARENT;
                    drawable.setStroke(strokeWidth, strokeColor);
                    drawable.setColor(fillColor);
                    nativeGroup.getHeaderContainer().setBackgroundDrawable(drawable);
                }
                if (titleStyle.labelTextColor) {
                    nativeGroup.getHeaderView().setTextColor(titleStyle.labelTextColor.android);
                }
                if (titleStyle.labelFontName || titleStyle.labelFontStyle) {
                    var editorTypeface = RadDataForm._makeTypeface(titleStyle.labelFontName, titleStyle.labelFontStyle);
                    nativeGroup.getHeaderView().setTypeface(editorTypeface);
                }
                if (titleStyle.labelTextSize) {
                    nativeGroup.getHeaderView().setTextSize(titleStyle.labelTextSize);
                }
            };
            DataFormEditorGroupCustomizationsImpl.prototype.apply = function (editorGroup) {
                var dataForm = this.owner;
                var group = dataForm.getGroupByName(editorGroup.name());
                if (group !== null && group.titleStyle !== null) {
                    this._applyGroupTitleStyle(editorGroup, group.titleStyle);
                }
                // throw event for additional customizations
                var groupName = editorGroup.name();
                var args = {
                    eventName: commonModule.RadDataForm.groupUpdateEvent,
                    object: dataForm,
                    editor: undefined,
                    entityProperty: undefined,
                    propertyName: undefined,
                    group: editorGroup,
                    groupName: groupName,
                    returnValue: true
                };
                dataForm.notify(args);
            };
            DataFormEditorGroupCustomizationsImpl = __decorate([
                Interfaces([com.telerik.android.common.Procedure]),
                __metadata("design:paramtypes", [RadDataForm])
            ], DataFormEditorGroupCustomizationsImpl);
            return DataFormEditorGroupCustomizationsImpl;
        }(java.lang.Object));
        DataFormEditorGroupCustomizations = DataFormEditorGroupCustomizationsImpl;
    }
    if (!DataFormEntityPropertyCommitListener) {
        var DataFormEntityPropertyCommitListenerImpl = /** @class */ (function (_super) {
            __extends(DataFormEntityPropertyCommitListenerImpl, _super);
            function DataFormEntityPropertyCommitListenerImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            DataFormEntityPropertyCommitListenerImpl.prototype.isUsingDateTimeEditor = function (property) {
                return property.getEditorType() === com.telerik.widget.dataform.visualization.editors.DataFormDateEditor.class ||
                    property.getEditorType() === com.telerik.widget.dataform.visualization.editors.DataFormTimeEditor.class;
            };
            DataFormEntityPropertyCommitListenerImpl.prototype.convertToTypedValue = function (oldValue, newValue, nativeProperty) {
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
                if (newValue instanceof java.util.ArrayList) {
                    var jsArray = [];
                    for (var i = 0; i < newValue.size(); i++) {
                        jsArray.push(newValue.get(i));
                    }
                    return jsArray;
                }
                return newValue;
            };
            DataFormEntityPropertyCommitListenerImpl.prototype.onBeforeCommit = function (property) {
                var dataform = this.owner;
                var entityProperty = dataform.getPropertyByName(property.name());
                var args = {
                    eventName: commonModule.RadDataForm.propertyCommitEvent,
                    object: dataform,
                    editor: undefined,
                    entityProperty: entityProperty,
                    propertyName: property.name(),
                    group: undefined,
                    groupName: property.getGroupName(),
                    returnValue: true
                };
                dataform.notify(args);
                return !args.returnValue;
            };
            DataFormEntityPropertyCommitListenerImpl.prototype.onAfterCommit = function (property) {
                var dataform = this.owner;
                var entityProperty = dataform.getPropertyByName(property.name());
                if (dataform.source.hasOwnProperty(property.name())) {
                    var oldValue = dataform.source[property.name()];
                    var newValue = dataform.android.getEditedObject().get(property.name());
                    var typedValue = this.convertToTypedValue(oldValue, newValue, property);
                    dataform.source[property.name()] = typedValue;
                    var args = {
                        eventName: commonModule.RadDataForm.propertyCommittedEvent,
                        object: dataform,
                        editor: undefined,
                        entityProperty: entityProperty,
                        propertyName: property.name(),
                        group: undefined,
                        groupName: property.getGroupName(),
                        returnValue: true
                    };
                    dataform.notify(args);
                }
            };
            DataFormEntityPropertyCommitListenerImpl = __decorate([
                Interfaces([com.telerik.widget.dataform.engine.EntityPropertyCommitListener]),
                __metadata("design:paramtypes", [RadDataForm])
            ], DataFormEntityPropertyCommitListenerImpl);
            return DataFormEntityPropertyCommitListenerImpl;
        }(java.lang.Object));
        DataFormEntityPropertyCommitListener = DataFormEntityPropertyCommitListenerImpl;
    }
    if (!DataFormValidationInfoProcedure) {
        var DataFormValidationInfoProcedureImpl = /** @class */ (function (_super) {
            __extends(DataFormValidationInfoProcedureImpl, _super);
            function DataFormValidationInfoProcedureImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            DataFormValidationInfoProcedureImpl.prototype.apply = function (info) {
                if (this.validateResolve) {
                    this.validateResolve(!info.hasErrors());
                }
            };
            DataFormValidationInfoProcedureImpl = __decorate([
                Interfaces([com.telerik.android.common.Procedure]),
                __metadata("design:paramtypes", [RadDataForm])
            ], DataFormValidationInfoProcedureImpl);
            return DataFormValidationInfoProcedureImpl;
        }(java.lang.Object));
        DataFormValidationInfoProcedure = DataFormValidationInfoProcedureImpl;
    }
}
var RadDataForm = /** @class */ (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._loaded = false;
        _this._groupListeners = [];
        return _this;
    }
    Object.defineProperty(RadDataForm.prototype, "groupListeners", {
        get: function () {
            return this._groupListeners;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype.createNativeView = function () {
        initializeListeners();
        if (!this._android) {
            this._android = new com.telerik.widget.dataform.visualization.RadDataForm(this._context);
            this._layoutManager = new com.telerik.widget.dataform.visualization.DataFormGroupLayoutManager(this._context);
            this._android.setLayoutManager(this._layoutManager);
        }
        this._ngKey = Object.keys(this).find(function (key) { return key.startsWith('_ngcontent'); });
        var _entityPropertyChangedHandler = function (propertyChangeData) {
            var property = propertyChangeData.object;
            if (!property._shouldSkipEditorUpdate || propertyChangeData.propertyName !== "editor") {
                if (!this || !this._android || !this._loaded) {
                    return;
                }
                switch (propertyChangeData.propertyName) {
                    case 'index':
                    case 'hidden':
                    case 'editor':
                        this.reload();
                        break;
                }
            }
        };
        this.entityPropertyChangedHandler = _entityPropertyChangedHandler.bind(this);
        var _groupTitleStylePropertyChangedHandler = function (propertyChangeData) {
            if (!this || !this._android || !this._loaded) {
                return;
            }
            this._layoutManager.applyEditorGroupCustomizations();
        };
        this.groupTitleStylePropertyChangedHandler = _groupTitleStylePropertyChangedHandler.bind(this);
        var _groupLayoutPropertyChangedHandler = function (propertyChangeData) {
            if (!this || !this._android || !this._loaded) {
                return;
            }
            this.android.arrangeEditors();
        };
        this.groupLayoutPropertyChangedHandler = _groupLayoutPropertyChangedHandler.bind(this);
        var _groupPropertyChangedHandler = function (propertyChangeData) {
            if (!this || !this._android || !this._loaded) {
                return;
            }
            switch (propertyChangeData.propertyName) {
                case "collapsed":
                    var propertyGroup = propertyChangeData.object;
                    if (!propertyGroup.collapsible) {
                        // If the group is not collapsible, we don't want to collapse it.
                        if (propertyChangeData.value) {
                            console.log("WARNING: collapsible should be true before collapsing a group.");
                        }
                        return;
                    }
                    var nativeGroup = this.getNativeGroup(propertyGroup.name);
                    nativeGroup.setIsExpanded(!propertyChangeData.value);
                    break;
                case "hidden":
                case "titleHidden":
                case "collapsible":
                case "layout":
                    this._android.arrangeEditors();
                    if (propertyChangeData.propertyName === 'layout') {
                        this._attachGroupLayoutChangeListener(undefined, propertyChangeData.value);
                    }
                    break;
                case "titleStyle":
                    this._layoutManager.applyEditorGroupCustomizations();
                    this._attachGroupTitleStyleChangeListener(undefined, propertyChangeData.value);
                    break;
                case "name":
                    var group_2 = propertyChangeData.object;
                    if (group_2.properties) {
                        for (var i = 0; i < group_2.properties.length; i++) {
                            var property = group_2.properties[i];
                            if (property.android) {
                                property.android.setGroupName(group_2.name);
                            }
                        }
                        this.reload();
                    }
                    break;
            }
        };
        this.groupPropertyChangedHandler = _groupPropertyChangedHandler.bind(this);
        this._setupGroups();
        this._updateEditorStyles();
        this._updateGroupStyles();
        this._updateSource();
        this._updateIsReadOnly();
        this._updateCommitMode();
        this._updateValidationMode();
        this._updateMetadata();
        this._addValidationListener();
        this._addCommitListener();
        this._loaded = true;
        return this._android;
    };
    RadDataForm.prototype.disposeNativeView = function () {
        if (this._android._createGroupFunction) {
            this._android._createGroupFunction.owner = null;
        }
        if (this._android._editorCustomizations) {
            this._android._editorCustomizations.owner = null;
        }
        if (this._android._editorGroupCustomizations) {
            this._android._editorGroupCustomizations.owner = null;
        }
        if (this._android._validationListener) {
            this._android._validationListener.owner = null;
        }
        if (this._android._entityPropertyCommitListener) {
            this._android._entityPropertyCommitListener.owner = null;
        }
        if (this._android._validationInfoProcedure) {
            this._android._validationInfoProcedure.owner = null;
        }
        for (var i = this.groupListeners.length; i >= 0; i--) {
            if (this.groupListeners[i]) {
                this.groupListeners[i].owner = null;
                this.groupListeners[i].group = null;
            }
        }
        _super.prototype.disposeNativeView.call(this);
    };
    RadDataForm.prototype.notifyValidated = function (propertyName, result) {
        var property = this.getPropertyByName(propertyName);
        if (property.android) {
            var message = result ? property.successMessage : property.errorMessage;
            property.android.onValidationResult(property.valueCandidate, result, message);
        }
    };
    RadDataForm.prototype._setupGroups = function () {
        this._android._createGroupFunction = new DataFormCreateGroupClass(this);
        this._layoutManager.setCreateGroup(this._android._createGroupFunction);
        this._android.arrangeEditors();
    };
    RadDataForm.prototype._updateSource = function () {
        if (!this._android || !this.source) {
            return;
        }
        this._android.setReloadSuspended(true);
        var objJSON = JSON.stringify(this.source);
        var jsonObject = new org.json.JSONObject(objJSON);
        this._android.setEntity(jsonObject);
        this._syncPropertiesWithNativeProperties();
        this._updateNativeGroups();
        this._android.setReloadSuspended(false);
        this.reload();
    };
    RadDataForm.prototype._updateMetadata = function () {
        if (!this._android || !this.metadata) {
            return;
        }
        this._android.setReloadSuspended(true);
        var objJSON = JSON.stringify(this.metadata);
        var jsonObject = new org.json.JSONObject(objJSON);
        var metadata = new com.telerik.widget.dataform.engine.DataFormMetadata(jsonObject);
        this._android.setMetadata(metadata);
        this._android.setReloadSuspended(false);
        this.reload();
    };
    RadDataForm.prototype._syncPropertiesWithNativeProperties = function () {
        var nativeEntity = this._android.getEntity();
        var nativeProperties = nativeEntity.properties();
        // We probably need to use the for(let  ) loop here
        var length = nativeProperties.size();
        for (var i = 0; i < length; i++) {
            var nativeProperty = nativeProperties.get(i);
            var property = this.getPropertyByName(nativeProperty.name());
            if (property == null) {
                property = this._createPropertyFromNative(nativeProperty);
                if (!this.properties) {
                    this.properties = new Array();
                }
                this.properties.push(property);
            }
            else {
                property._linkPropertyWithNative(nativeProperty);
            }
            this._attachEntityPropertyPropertyChangeListener(property);
        }
    };
    RadDataForm.prototype.updateNativePropertyEditorDisplayMode = function (editor, value) {
        var nativeValue;
        switch (value) {
            case nativescript_ui_autocomplete_1.AutoCompleteDisplayMode.Plain:
                nativeValue = com.telerik.widget.autocomplete.DisplayMode.PLAIN;
                break;
            case nativescript_ui_autocomplete_1.AutoCompleteDisplayMode.Tokens:
                nativeValue = com.telerik.widget.autocomplete.DisplayMode.TOKENS;
                break;
        }
        if (value && editor) {
            editor.setDisplayMode(nativeValue);
        }
        else {
            console.log("autoCompleteDisplayMode cannot be set to: " + value);
        }
    };
    RadDataForm.prototype._updateNativeGroups = function () {
        if (!this.source) {
            return;
        }
        // go through all groups / entity properties
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].properties) {
                    for (var j = 0; j < this.groups[i].properties.length; j++) {
                        var entityProperty = this.groups[i].properties[j];
                        if (entityProperty.android) {
                            entityProperty.android.setGroupName(this.groups[i].name);
                        }
                    }
                }
            }
        }
    };
    RadDataForm.prototype.getNativeGroup = function (name) {
        var groupCount = this._layoutManager.editorGroups().size();
        for (var i = 0; i < groupCount; i++) {
            var group_3 = this._layoutManager.editorGroups().get(i);
            if (group_3.name() === name) {
                return group_3;
            }
        }
        return null;
    };
    RadDataForm.prototype._updateEditorStyles = function () {
        this._android._editorCustomizations = new DataFormEditorCustomizations(this);
        this._android.setEditorCustomizations(this._android._editorCustomizations);
    };
    RadDataForm.prototype._updateGroupStyles = function () {
        this._android._editorGroupCustomizations = new DataFormEditorGroupCustomizations(this);
        this._layoutManager.setEditorGroupCustomizations(this._android._editorGroupCustomizations);
    };
    RadDataForm.prototype._createPropertyFromNative = function (nativeProperty) {
        var entityProperty = new EntityProperty();
        entityProperty.name = nativeProperty.name();
        entityProperty._linkPropertyWithNative(nativeProperty);
        return entityProperty;
    };
    RadDataForm.prototype._addValidationListener = function () {
        this._android._validationListener = new DataFormValidationListener(this);
        this._android.addValidationListener(this._android._validationListener);
    };
    RadDataForm.prototype._addCommitListener = function () {
        this._android._entityPropertyCommitListener = new DataFormEntityPropertyCommitListener(this);
        this._android.addCommitListener(this._android._entityPropertyCommitListener);
    };
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            var editedObject = this._android.getEditedObject();
            if (editedObject) {
                return editedObject.toString();
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (oldValue, newValue) {
        this._updateIsReadOnly();
    };
    RadDataForm.prototype._onCommitModePropertyChanged = function (oldValue, newValue) {
        this._updateCommitMode();
    };
    RadDataForm.prototype._onValidationModePropertyChanged = function (oldValue, newValue) {
        this._updateValidationMode();
    };
    RadDataForm.prototype._updateIsReadOnly = function () {
        if (!this._android) {
            return;
        }
        this._android.setEnabled(!this.isReadOnly);
    };
    RadDataForm.prototype._updateCommitMode = function () {
        if (!this._android) {
            return;
        }
        switch (this.commitMode) {
            case commonModule.DataFormCommitMode.Immediate:
                this._android.setCommitMode(com.telerik.widget.dataform.visualization.core.CommitMode.IMMEDIATE);
                break;
            case commonModule.DataFormCommitMode.Manual:
                this._android.setCommitMode(com.telerik.widget.dataform.visualization.core.CommitMode.MANUAL);
                break;
            case commonModule.DataFormCommitMode.OnLostFocus:
                this._android.setCommitMode(com.telerik.widget.dataform.visualization.core.CommitMode.ON_LOST_FOCUS);
                break;
        }
    };
    RadDataForm.prototype._updateValidationMode = function () {
        if (!this._android) {
            return;
        }
        switch (this.validationMode) {
            case commonModule.DataFormValidationMode.Immediate:
                this._android.setValidationMode(com.telerik.widget.dataform.visualization.core.ValidationMode.IMMEDIATE);
                break;
            case commonModule.DataFormValidationMode.Manual:
                this._android.setValidationMode(com.telerik.widget.dataform.visualization.core.ValidationMode.MANUAL);
                break;
            case commonModule.DataFormValidationMode.OnLostFocus:
                this._android.setValidationMode(com.telerik.widget.dataform.visualization.core.ValidationMode.ON_LOST_FOCUS);
                break;
        }
    };
    RadDataForm.prototype.reload = function () {
        if (this._android) {
            this._android.reload();
            if (!this._android.isReloadSuspended()) {
                this._syncEditorsWithNativeEditors();
            }
        }
    };
    RadDataForm.prototype.validateAll = function () {
        if (!this._android) {
            return null;
        }
        if (!this._android._validationInfoProcedure || !this._android._validationInfoProcedure.owner) {
            this._android._validationInfoProcedure = new DataFormValidationInfoProcedure(this);
        }
        var promiseResolve = function (resolve) {
            if (this && this._android._validationInfoProcedure) {
                this._android._validationInfoProcedure.validateResolve = resolve;
            }
        };
        var promise = new Promise(promiseResolve.bind(this));
        this._android.validateChanges(this._android._validationInfoProcedure);
        return promise;
    };
    RadDataForm.prototype.validateAndCommitAll = function () {
        if (!this._android) {
            return null;
        }
        var promiseResolve = function (resolve) {
            var _this = this;
            this.validateAll().then(function (result) {
                if (result) {
                    _this.android.commitForced();
                }
                resolve(result);
            });
        };
        return new Promise(promiseResolve.bind(this));
    };
    RadDataForm.prototype.commitAll = function () {
        if (!this._android) {
            return;
        }
        this._android.commitForced();
    };
    RadDataForm.prototype.hasValidationErrors = function () {
        if (this._android) {
            this._android.validateChanges();
            return this._android.hasValidationErrors();
        }
        return false;
    };
    RadDataForm.prototype._onSourcePropertyChanged = function (oldValue, newValue) {
        this._updateSource();
    };
    RadDataForm.prototype._onMetadataPropertyChanged = function (oldValue, newValue) {
        this._updateMetadata();
    };
    RadDataForm.prototype._updateNativeEditor = function (entityProperty) {
        var nativeEditor = this._android.getExistingEditorForProperty(entityProperty.name);
        if (nativeEditor == null) {
            return;
        }
        if (!entityProperty.editor) {
            entityProperty._createEditorFromNative(nativeEditor);
        }
        else {
            PropertyEditorHelper._linkEditorWithNative(entityProperty.editor, nativeEditor);
            if (entityProperty.autoCompleteDisplayMode) {
                this.updateNativePropertyEditorDisplayMode(nativeEditor, entityProperty.autoCompleteDisplayMode);
            }
        }
    };
    RadDataForm.prototype._syncEditorsWithNativeEditors = function () {
        if (!this.source) {
            return;
        }
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].properties) {
                    for (var j = 0; j < this.groups[i].properties.length; j++) {
                        var entityProperty = this.groups[i].properties[j];
                        this._updateNativeEditor(entityProperty);
                    }
                }
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var entityProperty = this.properties[i];
                this._updateNativeEditor(entityProperty);
                if (!entityProperty.editor) {
                    // If an EntityProperty is hidden,
                    // the native android never creates an editor for it.
                    continue;
                }
                if (!entityProperty.parent && !entityProperty.editor.parent) {
                    this._addView(entityProperty);
                    entityProperty._addView(entityProperty.editor);
                }
                var ngKey = this._ngKey;
                if (ngKey) {
                    // Add any newly created editors to the same scope as RadDataForm
                    // in order to apply component-specific css in angular
                    var ngValue = this[ngKey];
                    entityProperty[ngKey] = ngValue;
                    entityProperty.editor[ngKey] = ngValue;
                    entityProperty.editor.label[ngKey] = ngValue;
                    entityProperty.editor.editorCore[ngKey] = ngValue;
                }
            }
        }
        this._onCssStateChange();
    };
    RadDataForm._makeTypeface = function (fontName, style) {
        var fontStyle = android.graphics.Typeface.NORMAL;
        switch (style) {
            case commonModule.DataFormFontStyle.Bold:
                fontStyle = android.graphics.Typeface.BOLD;
                break;
            case commonModule.DataFormFontStyle.Italic:
                fontStyle = android.graphics.Typeface.ITALIC;
                break;
            case commonModule.DataFormFontStyle.BoldItalic:
                fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                break;
        }
        return android.graphics.Typeface.create(fontName, fontStyle);
    };
    return RadDataForm;
}(commonModule.RadDataForm));
exports.RadDataForm = RadDataForm;
var EntityProperty = /** @class */ (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        var _this = _super.call(this) || this;
        _this._shouldSkipEditorUpdate = false;
        return _this;
    }
    Object.defineProperty(EntityProperty.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "isValid", {
        get: function () {
            if (this.android) {
                return this.android.isValid();
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "value", {
        get: function () {
            if (this.android) {
                return this.android.getValue();
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "valueCandidate", {
        get: function () {
            if (this.android) {
                return this.android.getValueCandidate();
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype._linkPropertyWithNative = function (value) {
        this._android = value;
        this._onNativeSet();
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
    EntityProperty.prototype.onEditorChanged = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.off(observable_1.Observable.propertyChangeEvent);
        }
        if (newValue instanceof commonModule.PropertyEditor) {
            var propertyChangedHandler = function (propertyChangeData) {
                if (propertyChangeData.propertyName === "type") {
                    this._onEditorTypeChanged(propertyChangeData);
                }
            };
            newValue.on(observable_1.Observable.propertyChangeEvent, propertyChangedHandler, this);
            if (!this._shouldSkipEditorUpdate) {
                this.updateNativeEditor(newValue);
            }
        }
    };
    EntityProperty.prototype._onEditorTypeChanged = function (data) {
        var newEditor = new PropertyEditor();
        newEditor.type = this.editor.type;
        newEditor.propertyEditorStyle = this.editor.propertyEditorStyle;
        newEditor.params = this.editor.params;
        this.editor = newEditor;
    };
    EntityProperty.prototype._onNativeSet = function () {
        if (!this._android) {
            return;
        }
        this.updateNativeEditor(this.editor);
        this.updateNativeValidators(this.validators);
        this.updateNativeConverter(this.converter);
        this.updateNativeValuesProvider(this.valuesProviderArray);
        this.updateNativeDisplayName(this.displayName);
        this.updateNativeIndex(this.index);
        this.updateNativeColumnIndex(this.columnIndex);
        this.updateNativeHidden(this.hidden);
        this.updateNativeReadOnly(this.readOnly);
        this.updateNativeRequired(this.required);
        this.updateNativeHintText(this.hintText);
        this.updateNativeImageResource(this.imageResource);
    };
    EntityProperty.prototype.updateNativeEditor = function (value) {
        if (!this._android || !value) {
            return;
        }
        if (value instanceof CustomPropertyEditor) {
            this._android.setEditorType(com.telerik.widget.dataform.visualization.editors.DataFormCustomEditor.class);
            return;
        }
        this._android.setEditorType(value.editorClass);
        this._android.setEditorParams(value.editorParams);
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
        if (!this._android || !value) {
            return;
        }
        var validatorSet = new com.telerik.widget.dataform.engine.PropertyValidatorSet();
        for (var k = 0; k < value.length; k++) {
            var validatorBase = value[k];
            var aValidator = validatorBase.android;
            validatorSet.add(aValidator);
        }
        this._android.setValidator(validatorSet);
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
        if (!this._android || !value) {
            return;
        }
        var nativeSource = new java.util.ArrayList();
        for (var i = 0; i < value.length; i++) {
            var nativeValue = value[i];
            if (typeof nativeValue === "string") {
                nativeValue = nativeValue.trim();
            }
            if (typeof nativeValue === "number") {
                nativeValue = new java.lang.Integer(nativeValue);
            }
            nativeSource.add(nativeValue);
        }
        var nativeList = nativeSource.toArray();
        this._android.updateValues(nativeList);
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    EntityProperty.prototype.updateNativeImageResource = function (value) {
        if (!this._android || value === undefined) {
            return;
        }
        if (value != null) {
            var nativeValue = value;
            var appResources = utils_1.ad.getApplicationContext().getResources();
            var packageName = utils_1.ad.getApplication().getPackageName();
            if (appResources) {
                var identifier = appResources.getIdentifier(nativeValue, 'drawable', packageName);
                nativeValue = identifier;
            }
            this._android.setImageResource(nativeValue);
        }
        else {
            this._android.setImageResource(0);
        }
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setHeader(value);
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setPosition(value);
    };
    EntityProperty.prototype.updateNativeConverter = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setConverter(new com.telerik.widget.dataform.engine.PropertyConverter({
            convertTo: function (source) {
                var result = value.convertTo(source);
                return result;
            },
            convertFrom: function (source) {
                var result = value.convertFrom(source);
                return result;
            }
        }));
        if (this.editor && this.editor.android) {
            this.editor.android.loadPropertyValue();
        }
    };
    EntityProperty.prototype.updateNativeColumnIndex = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setColumnPosition(value);
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setSkip(value);
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
        if (!this._android || value == null) {
            return;
        }
        if (this.editor) {
            PropertyEditorHelper.setReadOnly(this.editor, value);
            if (this.editor.android) {
                this.editor.android.setEnabled(!value);
            }
        }
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
        if (!this._android || value == null) {
            return;
        }
        this._android.setRequired(value);
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
        if (!this._android || !value) {
            return;
        }
        this._android.setHintText(value);
        if (this.editor && this.editor.android) {
            this.editor.android.notifyEntityPropertyChanged();
        }
    };
    return EntityProperty;
}(commonModule.EntityProperty));
exports.EntityProperty = EntityProperty;
var DataFormEditorLabel = /** @class */ (function (_super) {
    __extends(DataFormEditorLabel, _super);
    function DataFormEditorLabel(editor) {
        var _this = _super.call(this) || this;
        _this._editor = editor;
        _this._android = editor.android.getHeaderView();
        return _this;
    }
    Object.defineProperty(DataFormEditorLabel.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DataFormEditorLabel.prototype.createNativeView = function () {
        return this._android;
    };
    DataFormEditorLabel.prototype.disposeNativeView = function () {
        this._editor = null;
        this._android = null;
    };
    DataFormEditorLabel.prototype[view_1.colorProperty.setNative] = function (value) {
        var nsColor = value instanceof color_1.Color ? value.android : value;
        this._android.setTextColor(nsColor);
    };
    DataFormEditorLabel.prototype[view_1.fontSizeProperty.setNative] = function (value) {
        if (typeof value === "number") {
            this._android.setTextSize(value);
        }
        else {
            this._android.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, value.nativeSize);
        }
    };
    DataFormEditorLabel.prototype[view_1.fontInternalProperty.setNative] = function (value) {
        this._android.setTypeface(value instanceof font_1.Font ? value.getAndroidTypeface() : value);
    };
    DataFormEditorLabel.prototype[view_1.widthProperty.setNative] = function (value) {
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
        _this._android = _this._editor.android.getEditorView();
        return _this;
    }
    Object.defineProperty(DataFormEditorCore.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DataFormEditorCore.prototype.createNativeView = function () {
        return this._android;
    };
    DataFormEditorCore.prototype.disposeNativeView = function () {
        this._editor = null;
        this._android = null;
    };
    DataFormEditorCore.prototype[view_1.colorProperty.setNative] = function (value) {
        var nsColor = value instanceof color_1.Color ? value.android : value;
        this._editor.android.setEditorColor(nsColor);
    };
    DataFormEditorCore.prototype[view_1.fontSizeProperty.setNative] = function (value) {
        var size = typeof value === "number" ? value : value.nativeSize;
        this._editor.android.setEditorTextSize(size);
    };
    DataFormEditorCore.prototype[view_1.fontInternalProperty.setNative] = function (value) {
        var editorTypeface = value instanceof font_1.Font ? value.getAndroidTypeface() : value;
        this._editor.android.setEditorTypeface(editorTypeface);
    };
    return DataFormEditorCore;
}(commonModule.DataFormEditorCore));
exports.DataFormEditorCore = DataFormEditorCore;
//////////////////////////////////////////////////////////////////////////////////////////////
// Editors
var PropertyEditor = /** @class */ (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._readOnly = false;
        return _this;
    }
    Object.defineProperty(PropertyEditor.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
            this.setNativeView(value.rootLayout());
            if (this._label) {
                this._removeView(this._label);
            }
            if (this._editorCore) {
                this._removeView(this._editorCore);
            }
            if (this._android) {
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
    Object.defineProperty(PropertyEditor.prototype, "editorParams", {
        get: function () {
            return this._editorParams;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.prototype[view_1.paddingLeftProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().leftMargin = value;
    };
    PropertyEditor.prototype[view_1.paddingTopProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().topMargin = value;
    };
    PropertyEditor.prototype[view_1.paddingRightProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().rightMargin = value;
    };
    PropertyEditor.prototype[view_1.paddingBottomProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().bottomMargin = value;
    };
    PropertyEditor.prototype.createNativeView = function () {
        return this._android ? this._android.rootLayout() : _super.prototype.createNativeView.call(this);
    };
    PropertyEditor.prototype.onPropertyEditorStyleChanged = function (oldValue, newValue) {
        PropertyEditorHelper.applyStyle(this);
    };
    PropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyStyleForProperty(this, propertyName);
    };
    PropertyEditor.prototype.onParamsChanged = function (oldValue, newValue) {
        PropertyEditorHelper.applyParams(this);
    };
    PropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyParams(this);
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
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormTextEditor.class;
                break;
            case commonModule.DataFormEditorType.MultilineText:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormMultilineTextEditor.class;
                break;
            case commonModule.DataFormEditorType.Email:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormEmailEditor.class;
                break;
            case commonModule.DataFormEditorType.Password:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormPasswordEditor.class;
                break;
            case commonModule.DataFormEditorType.Phone:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormPhoneEditor.class;
                break;
            case commonModule.DataFormEditorType.Decimal:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormDecimalEditor.class;
                break;
            case commonModule.DataFormEditorType.Number:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormIntegerEditor.class;
                break;
            case commonModule.DataFormEditorType.Switch:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSwitchEditor.class;
                break;
            case commonModule.DataFormEditorType.Stepper:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormNumberPickerEditor.class;
                break;
            case commonModule.DataFormEditorType.Slider:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSeekBarEditor.class;
                break;
            case commonModule.DataFormEditorType.SegmentedEditor:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSegmentedEditor.class;
                break;
            case commonModule.DataFormEditorType.DatePicker:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormDateEditor.class;
                break;
            case commonModule.DataFormEditorType.TimePicker:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormTimeEditor.class;
                break;
            case commonModule.DataFormEditorType.Picker:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormSpinnerEditor.class;
                break;
            case commonModule.DataFormEditorType.List:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormListViewEditor.class;
                break;
            case commonModule.DataFormEditorType.AutoCompleteInline:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormRadAutoCompleteEditor.class;
                break;
            case commonModule.DataFormEditorType.Label:
                this._editorClass = com.telerik.widget.dataform.visualization.editors.DataFormLabelEditor.class;
                break;
            default:
                console.log("WARNING: Unsupported editor type: " + this.type);
        }
    };
    PropertyEditor._getNativeEditorType = function (nativeEditor) {
        var nativeEditorClass = nativeEditor.getClass();
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormMultilineTextEditor.class) {
            return commonModule.DataFormEditorType.MultilineText;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormEmailEditor.class) {
            return commonModule.DataFormEditorType.Email;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormPasswordEditor.class) {
            return commonModule.DataFormEditorType.Password;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormPhoneEditor.class) {
            return commonModule.DataFormEditorType.Phone;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormDecimalEditor.class) {
            return commonModule.DataFormEditorType.Decimal;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormIntegerEditor.class) {
            return commonModule.DataFormEditorType.Number;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormSwitchEditor.class) {
            return commonModule.DataFormEditorType.Switch;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormNumberPickerEditor.class) {
            return commonModule.DataFormEditorType.Stepper;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormSeekBarEditor.class) {
            return commonModule.DataFormEditorType.Slider;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormSegmentedEditor.class) {
            return commonModule.DataFormEditorType.SegmentedEditor;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormDateEditor.class) {
            return commonModule.DataFormEditorType.DatePicker;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormTimeEditor.class) {
            return commonModule.DataFormEditorType.TimePicker;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormSpinnerEditor.class) {
            return commonModule.DataFormEditorType.Picker;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormListViewEditor.class) {
            return commonModule.DataFormEditorType.List;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormRadAutoCompleteEditor.class) {
            return commonModule.DataFormEditorType.AutoCompleteInline;
        }
        if (nativeEditorClass === com.telerik.widget.dataform.visualization.editors.DataFormLabelEditor.class) {
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._readOnly = false;
        return _this;
    }
    Object.defineProperty(CustomPropertyEditor.prototype, "android", {
        get: function () {
            return this._android;
        },
        set: function (value) {
            this._android = value;
            this.setNativeView(value.rootLayout());
            if (this._label) {
                this._removeView(this._label);
            }
            if (this._editorCore) {
                this._removeView(this._editorCore);
            }
            if (this._android) {
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
    Object.defineProperty(CustomPropertyEditor.prototype, "editorParams", {
        get: function () {
            return this._editorParams;
        },
        enumerable: true,
        configurable: true
    });
    CustomPropertyEditor.prototype.onPropertyEditorStyleChanged = function (oldValue, newValue) {
        PropertyEditorHelper.applyStyle(this);
    };
    CustomPropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyStyleForProperty(this, propertyName);
    };
    CustomPropertyEditor.prototype.onParamsChanged = function (oldValue, newValue) {
        PropertyEditorHelper.applyParams(this);
    };
    CustomPropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
        PropertyEditorHelper.applyParams(this);
    };
    CustomPropertyEditor.prototype.onTypeChanged = function (oldValue, newValue) {
        console.log("WARNING: You can't change CustomPropertyEditor's type");
    };
    CustomPropertyEditor.prototype[view_1.paddingLeftProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().leftMargin = value;
    };
    CustomPropertyEditor.prototype[view_1.paddingTopProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().topMargin = value;
    };
    CustomPropertyEditor.prototype[view_1.paddingRightProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().rightMargin = value;
    };
    CustomPropertyEditor.prototype[view_1.paddingBottomProperty.setNative] = function (value) {
        this.android.getMainLayout().getLayoutParams().bottomMargin = value;
    };
    CustomPropertyEditor.prototype.createView = function (context) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorNeedsViewEvent,
            object: this,
            view: undefined,
            context: context,
            value: undefined
        };
        this.notify(args);
        return args.view;
    };
    CustomPropertyEditor.prototype.applyValueToEditor = function (value, view) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorHasToApplyValueEvent,
            object: this,
            view: view,
            context: view.getContext(),
            value: value
        };
        this.notify(args);
    };
    CustomPropertyEditor.prototype.value = function (view) {
        var args = {
            eventName: commonModule.CustomPropertyEditor.editorNeedsValueEvent,
            object: this,
            view: view,
            context: view.getContext(),
            value: undefined
        };
        this.notify(args);
        return args.value;
    };
    CustomPropertyEditor.prototype.notifyValueChanged = function () {
        if (this.android) {
            this.android.notifyEditorValueChanged();
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
            editor.android = value;
        }
        else {
            editor.android = value;
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
        if (!editor.android) {
            return;
        }
        if (editor instanceof CustomPropertyEditor) {
            editor.android.setProvider(new com.telerik.widget.dataform.visualization.editors.DataFormCustomEditor.DataFormCustomEditorProvider({
                createView: function (context) {
                    return editor.createView(context);
                },
                applyValueToEditor: function (value, view) {
                    editor.applyValueToEditor(value, view);
                },
                getValue: function (view) {
                    return editor.value(view);
                }
            }));
        }
        else {
            editor.type = PropertyEditor._getNativeEditorType(editor.android);
        }
        PropertyEditorHelper.applyStyle(editor);
        PropertyEditorHelper.applyParams(editor);
        var editorEnabled = !PropertyEditorHelper.isReadOnly(editor);
        editor.android.setEnabled(editorEnabled);
        editor.android.notifyEntityPropertyChanged();
    };
    PropertyEditorHelper._updateLabelTextColor = function (editor, labelTextColor) {
        if (!editor.android || labelTextColor === undefined) {
            return;
        }
        editor.android.getHeaderView().setTextColor(labelTextColor.android);
    };
    PropertyEditorHelper._updateLabelFont = function (editor, labelFontName, labelFontStyle) {
        if (!editor._android || (labelFontName === undefined && labelFontStyle === undefined)) {
            return;
        }
        var editorTypeface = RadDataForm._makeTypeface(labelFontName, labelFontStyle);
        editor.android.getHeaderView().setTypeface(editorTypeface);
    };
    PropertyEditorHelper._updateLabelTextSize = function (editor, labelTextSize) {
        if (!editor.android || labelTextSize === undefined) {
            return;
        }
        editor.android.getHeaderView().setTextSize(labelTextSize);
    };
    PropertyEditorHelper._updateLabelHorizontalOffset = function (editor, labelHorizontalOffset) {
        if (!editor.android || labelHorizontalOffset === undefined) {
            return;
        }
        editor.android.getHeaderView().setTranslationX(labelHorizontalOffset);
    };
    PropertyEditorHelper._updateLabelVerticalOffset = function (editor, labelVerticalOffset) {
        if (!editor.android || labelVerticalOffset === undefined) {
            return;
        }
        editor.android.getHeaderView().setTranslationY(labelVerticalOffset);
    };
    PropertyEditorHelper._updateEditorHorizontalOffset = function (editor, editorHorizontalOffset) {
        if (!editor.android || editorHorizontalOffset === undefined) {
            return;
        }
        editor.android.getEditorView().setTranslationX(editorHorizontalOffset);
    };
    PropertyEditorHelper._updateEditorVerticalOffset = function (editor, editorVerticalOffset) {
        if (!editor.android || editorVerticalOffset === undefined) {
            return;
        }
        editor.android.getEditorView().setTranslationY(editorVerticalOffset);
    };
    PropertyEditorHelper._updateEditorFillColor = function (editor, editorFillColor) {
        if (!editor.android || editorFillColor === undefined) {
            return;
        }
        editor.android.rootLayout().setBackgroundColor(editorFillColor.android);
    };
    PropertyEditorHelper._updateEditorStroke = function (editor, editorStrokeColor, editorStrokeWidth, editorFillColor) {
        if (!editor.android || (editorStrokeColor === undefined && editorStrokeWidth === undefined)) {
            return;
        }
        var drawable = new android.graphics.drawable.GradientDrawable();
        var strokeWidthDips = editorStrokeWidth ? editorStrokeWidth : 2;
        var strokeWidth = strokeWidthDips * utils_1.layout.getDisplayDensity();
        var strokeColor = editorStrokeColor ?
            editorStrokeColor.android :
            android.graphics.Color.BLACK;
        var fillColor = editorFillColor ?
            editorFillColor.android :
            android.graphics.Color.TRANSPARENT;
        drawable.setStroke(strokeWidth, strokeColor);
        drawable.setColor(fillColor);
        editor.android.rootLayout().setBackgroundDrawable(drawable);
    };
    PropertyEditorHelper._updateLabelHidden = function (editor, labelHidden) {
        if (!editor.android || labelHidden === undefined) {
            return;
        }
        var visibility = labelHidden ? android.view.View.GONE : android.view.View.VISIBLE;
        editor.android.getHeaderView().setVisibility(visibility);
    };
    PropertyEditorHelper._updateLabelPosition = function (editor, labelPosition) {
        if (!editor.android || labelPosition === undefined) {
            return;
        }
        if (labelPosition === commonModule.DataFormLabelPosition.Left) {
            editor.android.setLabelPosition(com.telerik.widget.dataform.engine.LabelPosition.LEFT);
        }
        else if (labelPosition === commonModule.DataFormLabelPosition.Top) {
            editor.android.setLabelPosition(com.telerik.widget.dataform.engine.LabelPosition.TOP);
        }
    };
    PropertyEditorHelper._updateLabelWidth = function (editor, labelWidth) {
        if (!editor.android || labelWidth === undefined) {
            return;
        }
        var nativeLabelWidth = labelWidth * utils_1.layout.getDisplayDensity();
        editor.android.setLabelWidth(nativeLabelWidth);
    };
    PropertyEditorHelper.applyParams = function (editor) {
        var editorParams = editor.params;
        if (!editorParams) {
            return;
        }
        editor._editorParams = new java.util.HashMap();
        if (editorParams.minimum) {
            var min = new java.lang.Float(editorParams.minimum);
            editor._editorParams.put("minimum", min);
        }
        if (editorParams.maximum) {
            var max = new java.lang.Float(editorParams.maximum);
            editor._editorParams.put("maximum", max);
        }
        if (editorParams.step) {
            var step = new java.lang.Float(editorParams.step);
            editor._editorParams.put("step", step);
        }
        if (editor.android) {
            editor.android.applyParams(editor.editorParams);
        }
    };
    PropertyEditorHelper.applyStyle = function (editor) {
        if (!editor.propertyEditorStyle) {
            return;
        }
        PropertyEditorHelper._updateLabelTextColor(editor, editor.propertyEditorStyle.labelTextColor);
        PropertyEditorHelper._updateLabelFont(editor, editor.propertyEditorStyle.labelFontName, editor.propertyEditorStyle.labelFontStyle);
        PropertyEditorHelper._updateLabelTextSize(editor, editor.propertyEditorStyle.labelTextSize);
        PropertyEditorHelper._updateLabelHorizontalOffset(editor, editor.propertyEditorStyle.labelHorizontalOffset);
        PropertyEditorHelper._updateLabelVerticalOffset(editor, editor.propertyEditorStyle.labelVerticalOffset);
        PropertyEditorHelper._updateEditorHorizontalOffset(editor, editor.propertyEditorStyle.editorHorizontalOffset);
        PropertyEditorHelper._updateEditorVerticalOffset(editor, editor.propertyEditorStyle.editorVerticalOffset);
        PropertyEditorHelper._updateEditorFillColor(editor, editor.propertyEditorStyle.fillColor);
        PropertyEditorHelper._updateEditorStroke(editor, editor.propertyEditorStyle.strokeColor, editor.propertyEditorStyle.strokeWidth, editor.propertyEditorStyle.fillColor);
        PropertyEditorHelper._updateLabelHidden(editor, editor.propertyEditorStyle.labelHidden);
        PropertyEditorHelper._updateLabelPosition(editor, editor.propertyEditorStyle.labelPosition);
        PropertyEditorHelper._updateLabelWidth(editor, editor.propertyEditorStyle.labelWidth);
    };
    PropertyEditorHelper.applyStyleForProperty = function (editor, propertyName) {
        if (!editor.propertyEditorStyle) {
            return;
        }
        switch (propertyName) {
            case "labelTextColor":
                PropertyEditorHelper._updateLabelTextColor(editor, editor.propertyEditorStyle.labelTextColor);
                break;
            case "labelFontName":
            case "labelFontStyle":
                PropertyEditorHelper._updateLabelFont(editor, editor.propertyEditorStyle.labelFontName, editor.propertyEditorStyle.labelFontStyle);
                break;
            case "labelTextSize":
                PropertyEditorHelper._updateLabelTextSize(editor, editor.propertyEditorStyle.labelTextSize);
                break;
            case "labelHorizontalOffset":
                PropertyEditorHelper._updateLabelHorizontalOffset(editor, editor.propertyEditorStyle.labelHorizontalOffset);
                break;
            case "labelVerticalOffset":
                PropertyEditorHelper._updateLabelVerticalOffset(editor, editor.propertyEditorStyle.labelVerticalOffset);
                break;
            case "editorHorizontalOffset":
                PropertyEditorHelper._updateEditorHorizontalOffset(editor, editor.propertyEditorStyle.editorHorizontalOffset);
                break;
            case "editorVerticalOffset":
                PropertyEditorHelper._updateEditorVerticalOffset(editor, editor.propertyEditorStyle.editorVerticalOffset);
                break;
            case "fillColor":
                PropertyEditorHelper._updateEditorFillColor(editor, editor.propertyEditorStyle.fillColor);
                PropertyEditorHelper._updateEditorStroke(editor, editor.propertyEditorStyle.strokeColor, editor.propertyEditorStyle.strokeWidth, editor.propertyEditorStyle.fillColor);
                break;
            case "strokeColor":
            case "strokeWidth":
                PropertyEditorHelper._updateEditorStroke(editor, editor.propertyEditorStyle.strokeColor, editor.propertyEditorStyle.strokeWidth, editor.propertyEditorStyle.fillColor);
                break;
            case "labelHidden":
                PropertyEditorHelper._updateLabelHidden(editor, editor.propertyEditorStyle.labelHidden);
                break;
            case "labelPosition":
                PropertyEditorHelper._updateLabelPosition(editor, editor.propertyEditorStyle.labelPosition);
                break;
            case "labelWidth":
                PropertyEditorHelper._updateLabelWidth(editor, editor.propertyEditorStyle.labelWidth);
                break;
        }
    };
    PropertyEditorHelper.isReadOnly = function (editor) {
        if (editor instanceof CustomPropertyEditor) {
            return editor._readOnly;
        }
        return editor._readOnly;
    };
    PropertyEditorHelper.setReadOnly = function (editor, value) {
        if (editor instanceof CustomPropertyEditor) {
            editor._readOnly = value;
        }
        editor._readOnly = value;
    };
    return PropertyEditorHelper;
}());
exports.PropertyEditorHelper = PropertyEditorHelper;
var ManualValidationProvider;
function initializeValidationProviders() {
    if (!ManualValidationProvider) {
        var ManualValidationProviderImpl = /** @class */ (function (_super) {
            __extends(ManualValidationProviderImpl, _super);
            function ManualValidationProviderImpl(owner) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                return global.__native(_this);
            }
            ManualValidationProviderImpl.prototype.validate = function (value, propertyName) {
                return this.owner.validate(value, propertyName);
            };
            ManualValidationProviderImpl = __decorate([
                Interfaces([com.telerik.widget.dataform.engine.PropertyValidatorManual.ValidationProvider]),
                __metadata("design:paramtypes", [PropertyValidator])
            ], ManualValidationProviderImpl);
            return ManualValidationProviderImpl;
        }(java.lang.Object));
        ManualValidationProvider = ManualValidationProviderImpl;
    }
}
var PropertyValidator = /** @class */ (function (_super) {
    __extends(PropertyValidator, _super);
    function PropertyValidator() {
        var _this = _super.call(this) || this;
        initializeValidationProviders();
        _this._android = new com.telerik.widget.dataform.engine.PropertyValidatorManual();
        _this._android._manualValidationProvider = new ManualValidationProvider(_this);
        _this._android.setValidationProvider(_this._android._manualValidationProvider);
        if (_this.errorMessage === undefined) {
            _this.errorMessage = "This is not valid.";
        }
        return _this;
    }
    Object.defineProperty(PropertyValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    PropertyValidator.prototype.disposeNativeView = function () {
        if (this._android._manualValidationProvider) {
            this._android._manualValidationProvider.owner = null;
        }
        _super.prototype.disposeNativeView.call(this);
    };
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
        _this._android = new com.telerik.widget.dataform.engine.MinimumLengthValidator();
        return _this;
    }
    Object.defineProperty(MinimumLengthValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    MinimumLengthValidator.prototype.onLengthChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this.android.setMinimumLength(newValue);
        }
    };
    return MinimumLengthValidator;
}(commonModule.MinimumLengthValidator));
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = /** @class */ (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        var _this = _super.call(this) || this;
        _this._android = new com.telerik.widget.dataform.engine.MaximumLengthValidator();
        return _this;
    }
    Object.defineProperty(MaximumLengthValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    MaximumLengthValidator.prototype.onLengthChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this.android.setMaximumLength(newValue);
        }
    };
    return MaximumLengthValidator;
}(commonModule.MaximumLengthValidator));
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = /** @class */ (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        var _this = _super.call(this) || this;
        _this._android = new com.telerik.widget.dataform.engine.MailValidator();
        return _this;
    }
    Object.defineProperty(EmailValidator.prototype, "android", {
        get: function () {
            return this._android;
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
        _this._android = new com.telerik.widget.dataform.engine.NonEmptyValidator();
        return _this;
    }
    Object.defineProperty(NonEmptyValidator.prototype, "android", {
        get: function () {
            return this._android;
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
        _this._android = new com.telerik.widget.dataform.engine.RangeValidator();
        return _this;
    }
    Object.defineProperty(RangeValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RangeValidator.prototype.onMinimumChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this._android.setMin(newValue);
        }
    };
    RangeValidator.prototype.onMaximumChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            this._android.setMax(newValue);
        }
    };
    return RangeValidator;
}(commonModule.RangeValidator));
exports.RangeValidator = RangeValidator;
var PhoneValidator = /** @class */ (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        var _this = _super.call(this) || this;
        _this._android = new com.telerik.widget.dataform.engine.PhoneValidator();
        return _this;
    }
    Object.defineProperty(PhoneValidator.prototype, "android", {
        get: function () {
            return this._android;
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
        _this._android = new com.telerik.widget.dataform.engine.RegExValidator();
        return _this;
    }
    Object.defineProperty(RegExValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RegExValidator.prototype.onRegExChanged = function (oldValue, newValue) {
        this._android.setRegEx(newValue);
    };
    return RegExValidator;
}(commonModule.RegExValidator));
exports.RegExValidator = RegExValidator;
var IsTrueValidator = /** @class */ (function (_super) {
    __extends(IsTrueValidator, _super);
    function IsTrueValidator() {
        var _this = _super.call(this) || this;
        _this._android = new com.telerik.widget.dataform.engine.IsTrueValidator();
        return _this;
    }
    Object.defineProperty(IsTrueValidator.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return IsTrueValidator;
}(commonModule.IsTrueValidator));
exports.IsTrueValidator = IsTrueValidator;
var StringToDateConverter = /** @class */ (function (_super) {
    __extends(StringToDateConverter, _super);
    function StringToDateConverter() {
        var _this = _super.call(this) || this;
        _this._android = new com.telerik.widget.dataform.engine.StringToDateConverter();
        return _this;
    }
    Object.defineProperty(StringToDateConverter.prototype, "android", {
        get: function () {
            return this._android;
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
        _this._android = new com.telerik.widget.dataform.engine.StringToTimeConverter();
        return _this;
    }
    Object.defineProperty(StringToTimeConverter.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    return StringToTimeConverter;
}(commonModule.StringToTimeConverter));
exports.StringToTimeConverter = StringToTimeConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZGF0YWZvcm0uYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLWRhdGFmb3JtLmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxtREFBcUQ7QUFDckQsZ0RBQStDO0FBQy9DLHNEQUEwRDtBQUMxRCwrREFBa0Y7QUFDbEYsbURBQXdEO0FBQ3hELHlEQUF3RDtBQUN4RCw2RUFBdUU7QUFDdkUsc0RBR3VDO0FBQ3ZDLDBDQUFxQztBQThCckMsSUFBSSx3QkFBa0QsQ0FBQztBQUN2RCxJQUFJLCtCQUFnRSxDQUFDO0FBQ3JFLElBQUksMEJBQXNELENBQUM7QUFDM0QsSUFBSSw0QkFBMEQsQ0FBQztBQUMvRCxJQUFJLGlDQUFvRSxDQUFDO0FBQ3pFLElBQUksb0NBQTBFLENBQUM7QUFDL0UsSUFBSSwrQkFBZ0UsQ0FBQztBQUVyRSxTQUFTLG1CQUFtQjtJQUV4QixJQUFJLENBQUMsK0JBQStCLEVBQUU7UUFFbEM7WUFBa0QsdURBQWdCO1lBQzlELDZDQUFtQixLQUFrQixFQUFTLEtBQXNFO2dCQUFwSCxZQUNJLGlCQUFPLFNBRVY7Z0JBSGtCLFdBQUssR0FBTCxLQUFLLENBQWE7Z0JBQVMsV0FBSyxHQUFMLEtBQUssQ0FBaUU7Z0JBRWhILE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBRUQsdURBQVMsR0FBVCxVQUFVLFVBQW1CO2dCQUN6QixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQztvQkFDbkIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUM3QyxZQUFZLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDO2dCQUNqRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLGFBQWEsQ0FBQyxTQUFTLEdBQUcs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QUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRTtZQUNyRyxPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7U0FDakQ7UUFDRCxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDLEtBQUssRUFBRTtZQUN2RyxPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLENBQUM7U0FDMUQ7UUFDRCxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRTtZQUNsRyxPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7U0FDckQ7UUFDRCxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRTtZQUNsRyxPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7U0FDckQ7UUFDRCxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssRUFBRTtZQUNyRyxPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7U0FDakQ7UUFDRCxJQUFJLGlCQUFpQixLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRTtZQUN0RyxPQUFPLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7U0FDL0M7UUFDRCxJQUFJLGlCQUFp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Q0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFNTCw0QkFBQztBQUFELENBQUMsQUFWRCxDQUEyQyxZQUFZLENBQUMscUJBQXFCLEdBVTVFO0FBVlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29tbW9uTW9kdWxlIGZyb20gXCIuL3VpLWRhdGFmb3JtLmNvbW1vblwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgYWQsIGxheW91dCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBQcm9wZXJ0eUNoYW5nZURhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IE9yaWVudGF0aW9uIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIjtcbmltcG9ydCB7IEZvbnQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL2ZvbnRcIjtcbmltcG9ydCB7IEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGVcIjtcbmltcG9ydCB7XG4gICAgY29sb3JQcm9wZXJ0eSwgZm9udFNpemVQcm9wZXJ0eSwgZm9udEludGVybmFsUHJvcGVydHksIHdpZHRoUHJvcGVydHksXG4gICAgcGFkZGluZ0xlZnRQcm9wZXJ0eSwgcGFkZGluZ1RvcFByb3BlcnR5LCBwYWRkaW5nUmlnaHRQcm9wZXJ0eSwgcGFkZGluZ0JvdHRvbVByb3BlcnR5XG59IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuZXhwb3J0ICogZnJvbSAnLi91aS1kYXRhZm9ybS5jb21tb24nO1xuXG5pbnRlcmZhY2UgRGF0YUZvcm1FeHBhbmRlZENoYW5nZWRMaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWREYXRhRm9ybSwgZ3JvdXA6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cCk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cC5Jc0V4cGFuZGVkQ2hhbmdlZExpc3RlbmVyO1xufVxuXG5pbnRlcmZhY2UgRGF0YUZvcm1DcmVhdGVHcm91cENsYXNzIHtcbiAgICBuZXcob3duZXI6IFJhZERhdGFGb3JtKTogY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uRnVuY3Rpb24yPGFuZHJvaWQuY29udGVudC5Db250ZXh0LCBzdHJpbmcsIGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cD47XG59XG5cbmludGVyZmFjZSBEYXRhRm9ybVZhbGlkYXRpb25MaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWREYXRhRm9ybSk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRW50aXR5UHJvcGVydHlWYWxpZGF0aW9uTGlzdGVuZXI7XG59XG5cbmludGVyZmFjZSBEYXRhRm9ybUVkaXRvckN1c3RvbWl6YXRpb25zIHtcbiAgICBuZXcob3duZXI6IFJhZERhdGFGb3JtKTogY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmNvcmUuRW50aXR5UHJvcGVydHlWaWV3ZXI+O1xufVxuXG5pbnRlcmZhY2UgRGF0YUZvcm1FZGl0b3JHcm91cEN1c3RvbWl6YXRpb25zIHtcbiAgICBuZXcob3duZXI6IFJhZERhdGFGb3JtKTogY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkVkaXRvckdyb3VwPjtcbn1cblxuaW50ZXJmYWNlIERhdGFGb3JtRW50aXR5UHJvcGVydHlDb21taXRMaXN0ZW5lciB7XG4gICAgbmV3KG93bmVyOiBSYWREYXRhRm9ybSk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRW50aXR5UHJvcGVydHlDb21taXRMaXN0ZW5lcjtcbn1cblxuaW50ZXJmYWNlIERhdGFGb3JtVmFsaWRhdGlvbkluZm9Qcm9jZWR1cmUge1xuICAgIG5ldyhvd25lcjogUmFkRGF0YUZvcm0pOiBjb20udGVsZXJpay5hbmRyb2lkLmNvbW1vbi5Qcm9jZWR1cmU8Y29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uRGF0YUZvcm1WYWxpZGF0aW9uSW5mbz47XG59XG5cbmxldCBEYXRhRm9ybUNyZWF0ZUdyb3VwQ2xhc3M6IERhdGFGb3JtQ3JlYXRlR3JvdXBDbGFzcztcbmxldCBEYXRhRm9ybUV4cGFuZGVkQ2hhbmdlZExpc3RlbmVyOiBEYXRhRm9ybUV4cGFuZGVkQ2hhbmdlZExpc3RlbmVyO1xubGV0IERhdGFGb3JtVmFsaWRhdGlvbkxpc3RlbmVyOiBEYXRhRm9ybVZhbGlkYXRpb25MaXN0ZW5lcjtcbmxldCBEYXRhRm9ybUVkaXRvckN1c3RvbWl6YXRpb25zOiBEYXRhRm9ybUVkaXRvckN1c3RvbWl6YXRpb25zO1xubGV0IERhdGFGb3JtRWRpdG9yR3JvdXBDdXN0b21pemF0aW9uczogRGF0YUZvcm1FZGl0b3JHcm91cEN1c3RvbWl6YXRpb25zO1xubGV0IERhdGFGb3JtRW50aXR5UHJvcGVydHlDb21taXRMaXN0ZW5lcjogRGF0YUZvcm1FbnRpdHlQcm9wZXJ0eUNvbW1pdExpc3RlbmVyO1xubGV0IERhdGFGb3JtVmFsaWRhdGlvbkluZm9Qcm9jZWR1cmU6IERhdGFGb3JtVmFsaWRhdGlvbkluZm9Qcm9jZWR1cmU7XG5cbmZ1bmN0aW9uIGluaXRpYWxpemVMaXN0ZW5lcnMoKSB7XG5cbiAgICBpZiAoIURhdGFGb3JtRXhwYW5kZWRDaGFuZ2VkTGlzdGVuZXIpIHtcbiAgICAgICAgQEludGVyZmFjZXMoW2NvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cC5Jc0V4cGFuZGVkQ2hhbmdlZExpc3RlbmVyXSlcbiAgICAgICAgY2xhc3MgRGF0YUZvcm1FeHBhbmRlZENoYW5nZWRMaXN0ZW5lckltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uRXhwYW5kYWJsZUVkaXRvckdyb3VwLklzRXhwYW5kZWRDaGFuZ2VkTGlzdGVuZXIge1xuICAgICAgICAgICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBSYWREYXRhRm9ybSwgcHVibGljIGdyb3VwOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5FeHBhbmRhYmxlRWRpdG9yR3JvdXApIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uQ2hhbmdlZChpc0V4cGFuZGVkOiBib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBpc0V4cGFuZGVkID9cbiAgICAgICAgICAgICAgICAgICAgY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLmdyb3VwRXhwYW5kZWRFdmVudCA6XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vbk1vZHVsZS5SYWREYXRhRm9ybS5ncm91cENvbGxhcHNlZEV2ZW50O1xuICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eUdyb3VwID0gdGhpcy5vd25lci5nZXRHcm91cEJ5TmFtZSh0aGlzLmdyb3VwLm5hbWUoKSk7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlHcm91cC5jb2xsYXBzZWQgPSAhaXNFeHBhbmRlZDtcblxuICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLm93bmVyLFxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGlzLmdyb3VwLFxuICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IHRoaXMuZ3JvdXAubmFtZSgpLFxuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5vd25lci5ub3RpZnkoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBEYXRhRm9ybUV4cGFuZGVkQ2hhbmdlZExpc3RlbmVyID0gRGF0YUZvcm1FeHBhbmRlZENoYW5nZWRMaXN0ZW5lckltcGw7XG4gICAgfVxuXG4gICAgaWYgKCFEYXRhRm9ybUNyZWF0ZUdyb3VwQ2xhc3MpIHtcbiAgICAgICAgQEludGVyZmFjZXMoW2NvbS50ZWxlcmlrLmFuZHJvaWQuY29tbW9uLkZ1bmN0aW9uMl0pXG4gICAgICAgIGNsYXNzIERhdGFGb3JtQ3JlYXRlR3JvdXBDbGFzc0ltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uRnVuY3Rpb24yPGFuZHJvaWQuY29udGVudC5Db250ZXh0LCBzdHJpbmcsIGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cD4ge1xuICAgICAgICAgICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBSYWREYXRhRm9ybSkge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJpdmF0ZSBfdXBkYXRlR3JvdXBMYXlvdXQocHJvcGVydHlHcm91cCwgbmF0aXZlR3JvdXApIHtcbiAgICAgICAgICAgICAgICBsZXQgY29udGV4dCA9IG5hdGl2ZUdyb3VwLnJvb3RMYXlvdXQoKS5nZXRDb250ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlHcm91cC5sYXlvdXQgaW5zdGFuY2VvZiBjb21tb25Nb2R1bGUuRGF0YUZvcm1TdGFja0xheW91dCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmF0aXZlTGluZWFyTGF5b3V0ID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkRhdGFGb3JtTGluZWFyTGF5b3V0TWFuYWdlcihjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5R3JvdXAubGF5b3V0Lm9yaWVudGF0aW9uID09PSBPcmllbnRhdGlvbi5ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXRpdmVMaW5lYXJMYXlvdXQuc2V0T3JpZW50YXRpb24oYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0LkhPUklaT05UQUwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF0aXZlTGluZWFyTGF5b3V0LnNldE9yaWVudGF0aW9uKGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dC5WRVJUSUNBTCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlR3JvdXAuc2V0TGF5b3V0TWFuYWdlcihuYXRpdmVMaW5lYXJMYXlvdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlHcm91cC5sYXlvdXQgaW5zdGFuY2VvZiBjb21tb25Nb2R1bGUuRGF0YUZvcm1HcmlkTGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXRpdmVUYWJsZUxheW91dCA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5EYXRhRm9ybVRhYmxlTGF5b3V0TWFuYWdlcihjb250ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlR3JvdXAuc2V0TGF5b3V0TWFuYWdlcihuYXRpdmVUYWJsZUxheW91dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhcHBseShjb250ZXh0OiBhbmRyb2lkLmNvbnRlbnQuQ29udGV4dCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YUZvcm0gPSB0aGlzLm93bmVyO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhRm9ybS5ncm91cHMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhRm9ybS5ncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eUdyb3VwID0gZGF0YUZvcm0uZ3JvdXBzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5R3JvdXAubmFtZSA9PT0gbmFtZS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cChjb250ZXh0LCBuYW1lLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlHcm91cC5jb2xsYXBzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cC5zZXRFeHBhbmRhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdMaXN0ZW5lciA9IG5ldyBEYXRhRm9ybUV4cGFuZGVkQ2hhbmdlZExpc3RlbmVyKHRoaXMub3duZXIsIGdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmdyb3VwTGlzdGVuZXJzLnB1c2gobmV3TGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmFkZElzRXhwYW5kZWRDaGFuZ2VkTGlzdGVuZXIobmV3TGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUdyb3VwLmNvbGxhcHNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkV4cGFuZGFibGVFZGl0b3JHcm91cD5ncm91cCkuc2V0SXNFeHBhbmRlZChmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5R3JvdXAuaGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLnJvb3RMYXlvdXQoKS5zZXRWaXNpYmlsaXR5KGFuZHJvaWQudmlldy5WaWV3LkdPTkUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUdyb3VwLnRpdGxlSGlkZGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwLmdldEhlYWRlckNvbnRhaW5lcigpLnNldFZpc2liaWxpdHkoYW5kcm9pZC52aWV3LlZpZXcuR09ORSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eUdyb3VwLnRpdGxlU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlHcm91cC50aXRsZVN0eWxlID0gbmV3IGNvbW1vbk1vZHVsZS5Hcm91cFRpdGxlU3R5bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5R3JvdXAubGF5b3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5R3JvdXAubGF5b3V0ID0gbmV3IGNvbW1vbk1vZHVsZS5EYXRhRm9ybVN0YWNrTGF5b3V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlR3JvdXBMYXlvdXQocHJvcGVydHlHcm91cCwgZ3JvdXApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUZvcm0uX2F0dGFjaEdyb3VwQ2hhbmdlTGlzdGVuZXIocHJvcGVydHlHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyb3VwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBncm91cCA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5FeHBhbmRhYmxlRWRpdG9yR3JvdXAoY29udGV4dCwgbmFtZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBncm91cC5zZXRFeHBhbmRhYmxlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBEYXRhRm9ybUNyZWF0ZUdyb3VwQ2xhc3MgPSBEYXRhRm9ybUNyZWF0ZUdyb3VwQ2xhc3NJbXBsO1xuICAgIH1cblxuICAgIGlmICghRGF0YUZvcm1WYWxpZGF0aW9uTGlzdGVuZXIpIHtcbiAgICAgICAgQEludGVyZmFjZXMoW2NvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRW50aXR5UHJvcGVydHlWYWxpZGF0aW9uTGlzdGVuZXJdKVxuICAgICAgICBjbGFzcyBEYXRhRm9ybVZhbGlkYXRpb25MaXN0ZW5lckltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5FbnRpdHlQcm9wZXJ0eVZhbGlkYXRpb25MaXN0ZW5lciB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3duZXI6IFJhZERhdGFGb3JtKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbmF0aXZlKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvblZhbGlkYXRlKHByb3BlcnR5OiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLkVudGl0eVByb3BlcnR5KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YUZvcm0gPSB0aGlzLm93bmVyO1xuICAgICAgICAgICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eSA9IGRhdGFGb3JtLmdldFByb3BlcnR5QnlOYW1lKHByb3BlcnR5Lm5hbWUoKSk7XG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gZGF0YUZvcm0uZ2V0R3JvdXBCeU5hbWUocHJvcGVydHkuZ2V0R3JvdXBOYW1lKCkpO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLnByb3BlcnR5VmFsaWRhdGVFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBkYXRhRm9ybSxcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBlbnRpdHlQcm9wZXJ0eS5lZGl0b3IsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBlbnRpdHlQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eS5uYW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wZXJ0eS5nZXRHcm91cE5hbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFGb3JtLm5vdGlmeShhcmdzKTtcbiAgICAgICAgICAgICAgICBpZiAocHJvcGVydHkgaW5zdGFuY2VvZiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLkVudGl0eVByb3BlcnR5Q29yZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gUHJvbWlzZS5yZXNvbHZlKGFyZ3MucmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eS5vblZhbGlkYXRpb25TdGFydGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uVmFsdWUgPSBlbnRpdHlQcm9wZXJ0eS52YWx1ZUNhbmRpZGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnRoZW4oKGFuc3dlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5Lm9uVmFsaWRhdGlvblJlc3VsdCh2YWxpZGF0aW9uVmFsdWUsIGZhbHNlLCBlbnRpdHlQcm9wZXJ0eS5lcnJvck1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eS5vblZhbGlkYXRpb25SZXN1bHQodmFsaWRhdGlvblZhbHVlLCB0cnVlLCBlbnRpdHlQcm9wZXJ0eS5zdWNjZXNzTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uRGlkVmFsaWRhdGUocHJvcGVydHk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRW50aXR5UHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhRm9ybSA9IHRoaXMub3duZXI7XG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhRm9ybSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gZGF0YUZvcm0uZ2V0UHJvcGVydHlCeU5hbWUocHJvcGVydHkubmFtZSgpKTtcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXAgPSBkYXRhRm9ybS5nZXRHcm91cEJ5TmFtZShwcm9wZXJ0eS5nZXRHcm91cE5hbWUoKSk7XG4gICAgICAgICAgICAgICAgbGV0IGFyZ3M6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiBjb21tb25Nb2R1bGUuUmFkRGF0YUZvcm0ucHJvcGVydHlWYWxpZGF0ZWRFdmVudCxcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBkYXRhRm9ybSxcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBlbnRpdHlQcm9wZXJ0eS5lZGl0b3IsXG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByb3BlcnR5OiBlbnRpdHlQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eS5uYW1lKCksXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBncm91cCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wZXJ0eS5nZXRHcm91cE5hbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFGb3JtLm5vdGlmeShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIERhdGFGb3JtVmFsaWRhdGlvbkxpc3RlbmVyID0gRGF0YUZvcm1WYWxpZGF0aW9uTGlzdGVuZXJJbXBsO1xuICAgIH1cblxuICAgIGlmICghRGF0YUZvcm1FZGl0b3JDdXN0b21pemF0aW9ucykge1xuICAgICAgICBASW50ZXJmYWNlcyhbY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlXSlcbiAgICAgICAgY2xhc3MgRGF0YUZvcm1FZGl0b3JDdXN0b21pemF0aW9uc0ltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmNvcmUuRW50aXR5UHJvcGVydHlWaWV3ZXI+IHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvd25lcjogUmFkRGF0YUZvcm0pIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFwcGx5KGVkaXRvcjogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uY29yZS5FbnRpdHlQcm9wZXJ0eVZpZXdlcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFGb3JtID0gdGhpcy5vd25lcjtcbiAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHkgPSBkYXRhRm9ybS5nZXRQcm9wZXJ0eUJ5TmFtZShlZGl0b3IucHJvcGVydHkoKS5uYW1lKCkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5LmVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5hcHBseVN0eWxlKHByb3BlcnR5LmVkaXRvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwTmFtZSA9IHByb3BlcnR5LmFuZHJvaWQgPyBwcm9wZXJ0eS5hbmRyb2lkLmdldEdyb3VwTmFtZSgpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLmVkaXRvclVwZGF0ZUV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGRhdGFGb3JtLFxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IGVkaXRvcixcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHk6IHByb3BlcnR5LmFuZHJvaWQsXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBncm91cE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBkYXRhRm9ybS5ub3RpZnkoYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBEYXRhRm9ybUVkaXRvckN1c3RvbWl6YXRpb25zID0gRGF0YUZvcm1FZGl0b3JDdXN0b21pemF0aW9uc0ltcGw7XG4gICAgfVxuXG4gICAgaWYgKCFEYXRhRm9ybUVkaXRvckdyb3VwQ3VzdG9taXphdGlvbnMpIHtcbiAgICAgICAgQEludGVyZmFjZXMoW2NvbS50ZWxlcmlrLmFuZHJvaWQuY29tbW9uLlByb2NlZHVyZV0pXG4gICAgICAgIGNsYXNzIERhdGFGb3JtRWRpdG9yR3JvdXBDdXN0b21pemF0aW9uc0ltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkVkaXRvckdyb3VwPiB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb3duZXI6IFJhZERhdGFGb3JtKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbmF0aXZlKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcml2YXRlIF9hcHBseUdyb3VwVGl0bGVTdHlsZShuYXRpdmVHcm91cDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uRWRpdG9yR3JvdXAsXG4gICAgICAgICAgICAgICAgdGl0bGVTdHlsZTogY29tbW9uTW9kdWxlLkdyb3VwVGl0bGVTdHlsZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlU3R5bGUuZmlsbENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUdyb3VwLmdldEhlYWRlckNvbnRhaW5lcigpLnNldEJhY2tncm91bmRDb2xvcih0aXRsZVN0eWxlLmZpbGxDb2xvci5hbmRyb2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlU3R5bGUuc3Ryb2tlQ29sb3IgfHwgdGl0bGVTdHlsZS5zdHJva2VXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZHJhd2FibGU6IGFuZHJvaWQuZ3JhcGhpY3MuZHJhd2FibGUuR3JhZGllbnREcmF3YWJsZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5HcmFkaWVudERyYXdhYmxlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cm9rZVdpZHRoRGlwcyA9IHRpdGxlU3R5bGUuc3Ryb2tlV2lkdGggPyB0aXRsZVN0eWxlLnN0cm9rZVdpZHRoIDogMjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cm9rZVdpZHRoID0gc3Ryb2tlV2lkdGhEaXBzICogbGF5b3V0LmdldERpc3BsYXlEZW5zaXR5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0cm9rZUNvbG9yID0gdGl0bGVTdHlsZS5zdHJva2VDb2xvciA/XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZVN0eWxlLnN0cm9rZUNvbG9yLmFuZHJvaWQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgYW5kcm9pZC5ncmFwaGljcy5Db2xvci5CTEFDSztcblxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsbENvbG9yID0gdGl0bGVTdHlsZS5maWxsQ29sb3IgP1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGVTdHlsZS5maWxsQ29sb3IuYW5kcm9pZCA6XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmRyb2lkLmdyYXBoaWNzLkNvbG9yLlRSQU5TUEFSRU5UO1xuXG4gICAgICAgICAgICAgICAgICAgIGRyYXdhYmxlLnNldFN0cm9rZShzdHJva2VXaWR0aCwgc3Ryb2tlQ29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBkcmF3YWJsZS5zZXRDb2xvcihmaWxsQ29sb3IpO1xuXG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUdyb3VwLmdldEhlYWRlckNvbnRhaW5lcigpLnNldEJhY2tncm91bmREcmF3YWJsZShkcmF3YWJsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aXRsZVN0eWxlLmxhYmVsVGV4dENvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICg8YW5kcm9pZC53aWRnZXQuVGV4dFZpZXc+bmF0aXZlR3JvdXAuZ2V0SGVhZGVyVmlldygpKS5zZXRUZXh0Q29sb3IodGl0bGVTdHlsZS5sYWJlbFRleHRDb2xvci5hbmRyb2lkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpdGxlU3R5bGUubGFiZWxGb250TmFtZSB8fCB0aXRsZVN0eWxlLmxhYmVsRm9udFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlZGl0b3JUeXBlZmFjZTogYW5kcm9pZC5ncmFwaGljcy5UeXBlZmFjZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBSYWREYXRhRm9ybS5fbWFrZVR5cGVmYWNlKHRpdGxlU3R5bGUubGFiZWxGb250TmFtZSwgdGl0bGVTdHlsZS5sYWJlbEZvbnRTdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgICg8YW5kcm9pZC53aWRnZXQuVGV4dFZpZXc+bmF0aXZlR3JvdXAuZ2V0SGVhZGVyVmlldygpKS5zZXRUeXBlZmFjZShlZGl0b3JUeXBlZmFjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aXRsZVN0eWxlLmxhYmVsVGV4dFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbmRyb2lkLndpZGdldC5UZXh0Vmlldz5uYXRpdmVHcm91cC5nZXRIZWFkZXJWaWV3KCkpLnNldFRleHRTaXplKHRpdGxlU3R5bGUubGFiZWxUZXh0U2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhcHBseShlZGl0b3JHcm91cDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uRWRpdG9yR3JvdXApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhRm9ybSA9IHRoaXMub3duZXI7XG4gICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gZGF0YUZvcm0uZ2V0R3JvdXBCeU5hbWUoZWRpdG9yR3JvdXAubmFtZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXAgIT09IG51bGwgJiYgZ3JvdXAudGl0bGVTdHlsZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcHBseUdyb3VwVGl0bGVTdHlsZShlZGl0b3JHcm91cCwgZ3JvdXAudGl0bGVTdHlsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgZXZlbnQgZm9yIGFkZGl0aW9uYWwgY3VzdG9taXphdGlvbnNcbiAgICAgICAgICAgICAgICBsZXQgZ3JvdXBOYW1lID0gZWRpdG9yR3JvdXAubmFtZSgpO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLmdyb3VwVXBkYXRlRXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogZGF0YUZvcm0sXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IGVkaXRvckdyb3VwLFxuICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IGdyb3VwTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWU6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGRhdGFGb3JtLm5vdGlmeShhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIERhdGFGb3JtRWRpdG9yR3JvdXBDdXN0b21pemF0aW9ucyA9IERhdGFGb3JtRWRpdG9yR3JvdXBDdXN0b21pemF0aW9uc0ltcGw7XG4gICAgfVxuXG4gICAgaWYgKCFEYXRhRm9ybUVudGl0eVByb3BlcnR5Q29tbWl0TGlzdGVuZXIpIHtcbiAgICAgICAgQEludGVyZmFjZXMoW2NvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRW50aXR5UHJvcGVydHlDb21taXRMaXN0ZW5lcl0pXG4gICAgICAgIGNsYXNzIERhdGFGb3JtRW50aXR5UHJvcGVydHlDb21taXRMaXN0ZW5lckltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5FbnRpdHlQcm9wZXJ0eUNvbW1pdExpc3RlbmVyIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvd25lcjogUmFkRGF0YUZvcm0pIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByaXZhdGUgaXNVc2luZ0RhdGVUaW1lRWRpdG9yKHByb3BlcnR5OiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLkVudGl0eVByb3BlcnR5KTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5LmdldEVkaXRvclR5cGUoKSA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybURhdGVFZGl0b3IuY2xhc3MgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkuZ2V0RWRpdG9yVHlwZSgpID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtVGltZUVkaXRvci5jbGFzcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJpdmF0ZSBjb252ZXJ0VG9UeXBlZFZhbHVlKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnksIG5hdGl2ZVByb3BlcnR5OiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLkVudGl0eVByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIG5ld1ZhbHVlIGlzIG9mIHR5cGUgb2JqZWN0LCB3ZSB0cnkgdG8gZGVkdWN0IHRoZSBkZXNpcmVkIHR5cGUgbW9zdGx5IGJhc2VkXG4gICAgICAgICAgICAgICAgLy8gb24gdGhlIHR5cGUgb2YgdGhlIG9sZCB2YWx1ZSwgc28gd2UgY2FuIGNhc3QgdGhlIG5ld1ZhbHVlIHRvIHRoZSBjb3JyZWN0IHR5cGVcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIobmV3VmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbHVlID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG5ld1ZhbHVlKSA9PT0gXCJ0cnVlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVXNpbmdEYXRlVGltZUVkaXRvcihuYXRpdmVQcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIERhdGUvVGltZSBFZGl0b3JzIGNhbiBlZGl0IHByb3BlcnRpZXMgb2YgdHlwZXMgRGF0ZSBhbmQgU3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9sZFZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgamF2YS51dGlsLkFycmF5TGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQganNBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld1ZhbHVlLnNpemUoKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqc0FycmF5LnB1c2gobmV3VmFsdWUuZ2V0KGkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ganNBcnJheTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbkJlZm9yZUNvbW1pdChwcm9wZXJ0eTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5FbnRpdHlQcm9wZXJ0eSk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFmb3JtID0gdGhpcy5vd25lcjtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5UHJvcGVydHkgPSBkYXRhZm9ybS5nZXRQcm9wZXJ0eUJ5TmFtZShwcm9wZXJ0eS5uYW1lKCkpO1xuICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtLnByb3BlcnR5Q29tbWl0RXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogZGF0YWZvcm0sXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eTogZW50aXR5UHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcGVydHkubmFtZSgpLFxuICAgICAgICAgICAgICAgICAgICBncm91cDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICBncm91cE5hbWU6IHByb3BlcnR5LmdldEdyb3VwTmFtZSgpLFxuICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZGF0YWZvcm0ubm90aWZ5KGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhYXJncy5yZXR1cm5WYWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25BZnRlckNvbW1pdChwcm9wZXJ0eTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5FbnRpdHlQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFmb3JtID0gdGhpcy5vd25lcjtcbiAgICAgICAgICAgICAgICBsZXQgZW50aXR5UHJvcGVydHkgPSBkYXRhZm9ybS5nZXRQcm9wZXJ0eUJ5TmFtZShwcm9wZXJ0eS5uYW1lKCkpO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhZm9ybS5zb3VyY2UuaGFzT3duUHJvcGVydHkocHJvcGVydHkubmFtZSgpKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRWYWx1ZSA9IGRhdGFmb3JtLnNvdXJjZVtwcm9wZXJ0eS5uYW1lKCldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9ICg8b3JnLmpzb24uSlNPTk9iamVjdD5kYXRhZm9ybS5hbmRyb2lkLmdldEVkaXRlZE9iamVjdCgpKS5nZXQocHJvcGVydHkubmFtZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZWRWYWx1ZSA9IHRoaXMuY29udmVydFRvVHlwZWRWYWx1ZShvbGRWYWx1ZSwgbmV3VmFsdWUsIHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YWZvcm0uc291cmNlW3Byb3BlcnR5Lm5hbWUoKV0gPSB0eXBlZFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FdmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5SYWREYXRhRm9ybS5wcm9wZXJ0eUNvbW1pdHRlZEV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBkYXRhZm9ybSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHk6IGVudGl0eVByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wZXJ0eS5uYW1lKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wZXJ0eS5nZXRHcm91cE5hbWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGRhdGFmb3JtLm5vdGlmeShhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBEYXRhRm9ybUVudGl0eVByb3BlcnR5Q29tbWl0TGlzdGVuZXIgPSBEYXRhRm9ybUVudGl0eVByb3BlcnR5Q29tbWl0TGlzdGVuZXJJbXBsO1xuICAgIH1cblxuICAgIGlmICghRGF0YUZvcm1WYWxpZGF0aW9uSW5mb1Byb2NlZHVyZSkge1xuICAgICAgICBASW50ZXJmYWNlcyhbY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlXSlcbiAgICAgICAgY2xhc3MgRGF0YUZvcm1WYWxpZGF0aW9uSW5mb1Byb2NlZHVyZUltcGwgZXh0ZW5kcyBqYXZhLmxhbmcuT2JqZWN0IGltcGxlbWVudHMgY29tLnRlbGVyaWsuYW5kcm9pZC5jb21tb24uUHJvY2VkdXJlPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLkRhdGFGb3JtVmFsaWRhdGlvbkluZm8+IHtcbiAgICAgICAgICAgIHB1YmxpYyB2YWxpZGF0ZVJlc29sdmU6IEZ1bmN0aW9uO1xuICAgICAgICAgICAgY29uc3RydWN0b3IocHVibGljIG93bmVyOiBSYWREYXRhRm9ybSkge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXBwbHkoaW5mbzogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uRGF0YUZvcm1WYWxpZGF0aW9uSW5mbykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlUmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlUmVzb2x2ZSghaW5mby5oYXNFcnJvcnMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgRGF0YUZvcm1WYWxpZGF0aW9uSW5mb1Byb2NlZHVyZSA9IERhdGFGb3JtVmFsaWRhdGlvbkluZm9Qcm9jZWR1cmVJbXBsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJhZERhdGFGb3JtIGV4dGVuZHMgY29tbW9uTW9kdWxlLlJhZERhdGFGb3JtIHtcbiAgICBfbmdLZXk7XG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uUmFkRGF0YUZvcm07XG4gICAgcHJpdmF0ZSBfbGF5b3V0TWFuYWdlcjogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uRGF0YUZvcm1Hcm91cExheW91dE1hbmFnZXI7XG4gICAgcHJpdmF0ZSBfbG9hZGVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZ3JvdXBMaXN0ZW5lcnM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBwdWJsaWMgZ2V0IGdyb3VwTGlzdGVuZXJzKCk6IEFycmF5PGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3JvdXBMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIGluaXRpYWxpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLlJhZERhdGFGb3JtKHRoaXMuX2NvbnRleHQpO1xuICAgICAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlciA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5EYXRhRm9ybUdyb3VwTGF5b3V0TWFuYWdlcih0aGlzLl9jb250ZXh0KTtcbiAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0TGF5b3V0TWFuYWdlcih0aGlzLl9sYXlvdXRNYW5hZ2VyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX25nS2V5ID0gT2JqZWN0LmtleXModGhpcykuZmluZChrZXkgPT4ga2V5LnN0YXJ0c1dpdGgoJ19uZ2NvbnRlbnQnKSk7XG4gICAgICAgIGNvbnN0IF9lbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gZnVuY3Rpb24gKHRoaXM6IFJhZERhdGFGb3JtLCBwcm9wZXJ0eUNoYW5nZURhdGE6IFByb3BlcnR5Q2hhbmdlRGF0YSkge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gPEVudGl0eVByb3BlcnR5PnByb3BlcnR5Q2hhbmdlRGF0YS5vYmplY3Q7XG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5Ll9zaG91bGRTa2lwRWRpdG9yVXBkYXRlIHx8IHByb3BlcnR5Q2hhbmdlRGF0YS5wcm9wZXJ0eU5hbWUgIT09IFwiZWRpdG9yXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMgfHwgIXRoaXMuX2FuZHJvaWQgfHwgIXRoaXMuX2xvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHlDaGFuZ2VEYXRhLnByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbmRleCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2hpZGRlbic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VkaXRvcic6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVudGl0eVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBfZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGNvbnN0IF9ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gZnVuY3Rpb24gKHRoaXM6IFJhZERhdGFGb3JtLCBwcm9wZXJ0eUNoYW5nZURhdGE6IFByb3BlcnR5Q2hhbmdlRGF0YSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzIHx8ICF0aGlzLl9hbmRyb2lkIHx8ICF0aGlzLl9sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIuYXBwbHlFZGl0b3JHcm91cEN1c3RvbWl6YXRpb25zKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlciA9IF9ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICAgICAgY29uc3QgX2dyb3VwTGF5b3V0UHJvcGVydHlDaGFuZ2VkSGFuZGxlciA9IGZ1bmN0aW9uICh0aGlzOiBSYWREYXRhRm9ybSwgcHJvcGVydHlDaGFuZ2VEYXRhOiBQcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcyB8fCAhdGhpcy5fYW5kcm9pZCB8fCAhdGhpcy5fbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAoPGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLlJhZERhdGFGb3JtPnRoaXMuYW5kcm9pZCkuYXJyYW5nZUVkaXRvcnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ncm91cExheW91dFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBfZ3JvdXBMYXlvdXRQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICAgICAgY29uc3QgX2dyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlciA9IGZ1bmN0aW9uICh0aGlzOiBSYWREYXRhRm9ybSwgcHJvcGVydHlDaGFuZ2VEYXRhOiBQcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgICAgIGlmICghdGhpcyB8fCAhdGhpcy5fYW5kcm9pZCB8fCAhdGhpcy5fbG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5Q2hhbmdlRGF0YS5wcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGFwc2VkXCI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wZXJ0eUdyb3VwID0gPGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUdyb3VwPnByb3BlcnR5Q2hhbmdlRGF0YS5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlHcm91cC5jb2xsYXBzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGdyb3VwIGlzIG5vdCBjb2xsYXBzaWJsZSwgd2UgZG9uJ3Qgd2FudCB0byBjb2xsYXBzZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eUNoYW5nZURhdGEudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldBUk5JTkc6IGNvbGxhcHNpYmxlIHNob3VsZCBiZSB0cnVlIGJlZm9yZSBjb2xsYXBzaW5nIGEgZ3JvdXAuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBuYXRpdmVHcm91cCA9IHRoaXMuZ2V0TmF0aXZlR3JvdXAocHJvcGVydHlHcm91cC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgbmF0aXZlR3JvdXAuc2V0SXNFeHBhbmRlZCghcHJvcGVydHlDaGFuZ2VEYXRhLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImhpZGRlblwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRsZUhpZGRlblwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsYXBzaWJsZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJsYXlvdXRcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5hcnJhbmdlRWRpdG9ycygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydHlDaGFuZ2VEYXRhLnByb3BlcnR5TmFtZSA9PT0gJ2xheW91dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEdyb3VwTGF5b3V0Q2hhbmdlTGlzdGVuZXIodW5kZWZpbmVkLCBwcm9wZXJ0eUNoYW5nZURhdGEudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRsZVN0eWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIuYXBwbHlFZGl0b3JHcm91cEN1c3RvbWl6YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaEdyb3VwVGl0bGVTdHlsZUNoYW5nZUxpc3RlbmVyKHVuZGVmaW5lZCwgcHJvcGVydHlDaGFuZ2VEYXRhLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwID0gPGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUdyb3VwPnByb3BlcnR5Q2hhbmdlRGF0YS5vYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgIGlmIChncm91cC5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLnByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcGVydHkgPSBncm91cC5wcm9wZXJ0aWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5LmFuZHJvaWQuc2V0R3JvdXBOYW1lKGdyb3VwLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ3JvdXBQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gX2dyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3NldHVwR3JvdXBzKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUVkaXRvclN0eWxlcygpO1xuICAgICAgICB0aGlzLl91cGRhdGVHcm91cFN0eWxlcygpO1xuICAgICAgICB0aGlzLl91cGRhdGVTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5fdXBkYXRlSXNSZWFkT25seSgpO1xuICAgICAgICB0aGlzLl91cGRhdGVDb21taXRNb2RlKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVZhbGlkYXRpb25Nb2RlKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU1ldGFkYXRhKCk7XG4gICAgICAgIHRoaXMuX2FkZFZhbGlkYXRpb25MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLl9hZGRDb21taXRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwb3NlTmF0aXZlVmlldygpIHtcbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2FuZHJvaWQpLl9jcmVhdGVHcm91cEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fY3JlYXRlR3JvdXBGdW5jdGlvbi5vd25lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5fYW5kcm9pZCkuX2VkaXRvckN1c3RvbWl6YXRpb25zKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fZWRpdG9yQ3VzdG9taXphdGlvbnMub3duZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2FuZHJvaWQpLl9lZGl0b3JHcm91cEN1c3RvbWl6YXRpb25zKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fZWRpdG9yR3JvdXBDdXN0b21pemF0aW9ucy5vd25lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5fYW5kcm9pZCkuX3ZhbGlkYXRpb25MaXN0ZW5lcikge1xuICAgICAgICAgICAgKDxhbnk+dGhpcy5fYW5kcm9pZCkuX3ZhbGlkYXRpb25MaXN0ZW5lci5vd25lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKDxhbnk+dGhpcy5fYW5kcm9pZCkuX2VudGl0eVByb3BlcnR5Q29tbWl0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2FuZHJvaWQpLl9lbnRpdHlQcm9wZXJ0eUNvbW1pdExpc3RlbmVyLm93bmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoPGFueT50aGlzLl9hbmRyb2lkKS5fdmFsaWRhdGlvbkluZm9Qcm9jZWR1cmUpIHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2FuZHJvaWQpLl92YWxpZGF0aW9uSW5mb1Byb2NlZHVyZS5vd25lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5ncm91cExpc3RlbmVycy5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5ncm91cExpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcnNbaV0ub3duZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBMaXN0ZW5lcnNbaV0uZ3JvdXAgPSBudWxsO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci5kaXNwb3NlTmF0aXZlVmlldygpO1xuICAgIH1cbiAgICBwdWJsaWMgbm90aWZ5VmFsaWRhdGVkKHByb3BlcnR5TmFtZTogc3RyaW5nLCByZXN1bHQ6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5nZXRQcm9wZXJ0eUJ5TmFtZShwcm9wZXJ0eU5hbWUpO1xuICAgICAgICBpZiAocHJvcGVydHkuYW5kcm9pZCkge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSByZXN1bHQgPyBwcm9wZXJ0eS5zdWNjZXNzTWVzc2FnZSA6IHByb3BlcnR5LmVycm9yTWVzc2FnZTtcbiAgICAgICAgICAgIHByb3BlcnR5LmFuZHJvaWQub25WYWxpZGF0aW9uUmVzdWx0KHByb3BlcnR5LnZhbHVlQ2FuZGlkYXRlLCByZXN1bHQsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0dXBHcm91cHMoKSB7XG4gICAgICAgICg8YW55PnRoaXMuX2FuZHJvaWQpLl9jcmVhdGVHcm91cEZ1bmN0aW9uID0gbmV3IERhdGFGb3JtQ3JlYXRlR3JvdXBDbGFzcyh0aGlzKTtcbiAgICAgICAgdGhpcy5fbGF5b3V0TWFuYWdlci5zZXRDcmVhdGVHcm91cCgoPGFueT50aGlzLl9hbmRyb2lkKS5fY3JlYXRlR3JvdXBGdW5jdGlvbik7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuYXJyYW5nZUVkaXRvcnMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVTb3VyY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCB8fCAhdGhpcy5zb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0UmVsb2FkU3VzcGVuZGVkKHRydWUpO1xuXG4gICAgICAgIGxldCBvYmpKU09OID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zb3VyY2UpO1xuICAgICAgICBsZXQganNvbk9iamVjdCA9IG5ldyBvcmcuanNvbi5KU09OT2JqZWN0KG9iakpTT04pO1xuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldEVudGl0eShqc29uT2JqZWN0KTtcblxuICAgICAgICB0aGlzLl9zeW5jUHJvcGVydGllc1dpdGhOYXRpdmVQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZU5hdGl2ZUdyb3VwcygpO1xuXG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0UmVsb2FkU3VzcGVuZGVkKGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVNZXRhZGF0YSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8ICF0aGlzLm1ldGFkYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRSZWxvYWRTdXNwZW5kZWQodHJ1ZSk7XG5cbiAgICAgICAgbGV0IG9iakpTT04gPSBKU09OLnN0cmluZ2lmeSh0aGlzLm1ldGFkYXRhKTtcbiAgICAgICAgbGV0IGpzb25PYmplY3QgPSBuZXcgb3JnLmpzb24uSlNPTk9iamVjdChvYmpKU09OKTtcbiAgICAgICAgbGV0IG1ldGFkYXRhID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRGF0YUZvcm1NZXRhZGF0YShqc29uT2JqZWN0KTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRNZXRhZGF0YShtZXRhZGF0YSk7XG5cbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRSZWxvYWRTdXNwZW5kZWQoZmFsc2UpO1xuICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3N5bmNQcm9wZXJ0aWVzV2l0aE5hdGl2ZVByb3BlcnRpZXMoKSB7XG4gICAgICAgIGxldCBuYXRpdmVFbnRpdHkgPSB0aGlzLl9hbmRyb2lkLmdldEVudGl0eSgpO1xuICAgICAgICBsZXQgbmF0aXZlUHJvcGVydGllczogamF2YS51dGlsLkFycmF5TGlzdDxhbnk+ID0gPGphdmEudXRpbC5BcnJheUxpc3Q8YW55Pj5uYXRpdmVFbnRpdHkucHJvcGVydGllcygpO1xuICAgICAgICAvLyBXZSBwcm9iYWJseSBuZWVkIHRvIHVzZSB0aGUgZm9yKGxldCAgKSBsb29wIGhlcmVcbiAgICAgICAgbGV0IGxlbmd0aCA9IG5hdGl2ZVByb3BlcnRpZXMuc2l6ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmF0aXZlUHJvcGVydHkgPSBuYXRpdmVQcm9wZXJ0aWVzLmdldChpKTtcbiAgICAgICAgICAgIGxldCBwcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLmdldFByb3BlcnR5QnlOYW1lKG5hdGl2ZVByb3BlcnR5Lm5hbWUoKSk7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5ID0gdGhpcy5fY3JlYXRlUHJvcGVydHlGcm9tTmF0aXZlKG5hdGl2ZVByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgQXJyYXk8RW50aXR5UHJvcGVydHk+KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHkuX2xpbmtQcm9wZXJ0eVdpdGhOYXRpdmUobmF0aXZlUHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYXR0YWNoRW50aXR5UHJvcGVydHlQcm9wZXJ0eUNoYW5nZUxpc3RlbmVyKHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTmF0aXZlUHJvcGVydHlFZGl0b3JEaXNwbGF5TW9kZShlZGl0b3I6IGFueSwgdmFsdWU6IEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlKSB7XG4gICAgICAgIGxldCBuYXRpdmVWYWx1ZTtcbiAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBBdXRvQ29tcGxldGVEaXNwbGF5TW9kZS5QbGFpbjpcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IGNvbS50ZWxlcmlrLndpZGdldC5hdXRvY29tcGxldGUuRGlzcGxheU1vZGUuUExBSU47XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlLlRva2VuczpcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IGNvbS50ZWxlcmlrLndpZGdldC5hdXRvY29tcGxldGUuRGlzcGxheU1vZGUuVE9LRU5TO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlICYmIGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLnNldERpc3BsYXlNb2RlKG5hdGl2ZVZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXV0b0NvbXBsZXRlRGlzcGxheU1vZGUgY2Fubm90IGJlIHNldCB0bzogXCIgKyB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVOYXRpdmVHcm91cHMoKSB7XG4gICAgICAgIGlmICghdGhpcy5zb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdvIHRocm91Z2ggYWxsIGdyb3VwcyAvIGVudGl0eSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncm91cHNbaV0ucHJvcGVydGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eVByb3BlcnR5LmFuZHJvaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eS5hbmRyb2lkLnNldEdyb3VwTmFtZSh0aGlzLmdyb3Vwc1tpXS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0TmF0aXZlR3JvdXAobmFtZSkge1xuICAgICAgICBsZXQgZ3JvdXBDb3VudCA9IHRoaXMuX2xheW91dE1hbmFnZXIuZWRpdG9yR3JvdXBzKCkuc2l6ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZ3JvdXAgPSB0aGlzLl9sYXlvdXRNYW5hZ2VyLmVkaXRvckdyb3VwcygpLmdldChpKTtcbiAgICAgICAgICAgIGlmIChncm91cC5uYW1lKCkgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3JvdXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlRWRpdG9yU3R5bGVzKCkge1xuICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fZWRpdG9yQ3VzdG9taXphdGlvbnMgPSBuZXcgRGF0YUZvcm1FZGl0b3JDdXN0b21pemF0aW9ucyh0aGlzKTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRFZGl0b3JDdXN0b21pemF0aW9ucygoPGFueT50aGlzLl9hbmRyb2lkKS5fZWRpdG9yQ3VzdG9taXphdGlvbnMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZUdyb3VwU3R5bGVzKCkge1xuICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fZWRpdG9yR3JvdXBDdXN0b21pemF0aW9ucyA9IG5ldyBEYXRhRm9ybUVkaXRvckdyb3VwQ3VzdG9taXphdGlvbnModGhpcyk7XG4gICAgICAgIHRoaXMuX2xheW91dE1hbmFnZXIuc2V0RWRpdG9yR3JvdXBDdXN0b21pemF0aW9ucygoPGFueT50aGlzLl9hbmRyb2lkKS5fZWRpdG9yR3JvdXBDdXN0b21pemF0aW9ucyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY3JlYXRlUHJvcGVydHlGcm9tTmF0aXZlKG5hdGl2ZVByb3BlcnR5OiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLkVudGl0eVByb3BlcnR5KSB7XG4gICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eTogRW50aXR5UHJvcGVydHkgPSBuZXcgRW50aXR5UHJvcGVydHkoKTtcbiAgICAgICAgZW50aXR5UHJvcGVydHkubmFtZSA9IG5hdGl2ZVByb3BlcnR5Lm5hbWUoKTtcbiAgICAgICAgZW50aXR5UHJvcGVydHkuX2xpbmtQcm9wZXJ0eVdpdGhOYXRpdmUobmF0aXZlUHJvcGVydHkpO1xuICAgICAgICByZXR1cm4gZW50aXR5UHJvcGVydHk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYWRkVmFsaWRhdGlvbkxpc3RlbmVyKCkge1xuICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fdmFsaWRhdGlvbkxpc3RlbmVyID0gbmV3IERhdGFGb3JtVmFsaWRhdGlvbkxpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkLmFkZFZhbGlkYXRpb25MaXN0ZW5lcigoPGFueT50aGlzLl9hbmRyb2lkKS5fdmFsaWRhdGlvbkxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hZGRDb21taXRMaXN0ZW5lcigpIHtcbiAgICAgICAgKDxhbnk+dGhpcy5fYW5kcm9pZCkuX2VudGl0eVByb3BlcnR5Q29tbWl0TGlzdGVuZXIgPSBuZXcgRGF0YUZvcm1FbnRpdHlQcm9wZXJ0eUNvbW1pdExpc3RlbmVyKHRoaXMpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkLmFkZENvbW1pdExpc3RlbmVyKCg8YW55PnRoaXMuX2FuZHJvaWQpLl9lbnRpdHlQcm9wZXJ0eUNvbW1pdExpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBnZXQgZWRpdGVkT2JqZWN0KCkge1xuICAgICAgICBsZXQgZWRpdGVkT2JqZWN0ID0gdGhpcy5fYW5kcm9pZC5nZXRFZGl0ZWRPYmplY3QoKTtcbiAgICAgICAgaWYgKGVkaXRlZE9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRlZE9iamVjdC50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25Jc1JlYWRPbmx5UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl91cGRhdGVJc1JlYWRPbmx5KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vbkNvbW1pdE1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUNvbW1pdE1vZGUsIG5ld1ZhbHVlOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1Db21taXRNb2RlKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNvbW1pdE1vZGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uVmFsaWRhdGlvbk1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGNvbW1vbk1vZHVsZS5EYXRhRm9ybVZhbGlkYXRpb25Nb2RlLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLkRhdGFGb3JtVmFsaWRhdGlvbk1vZGUpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlVmFsaWRhdGlvbk1vZGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF91cGRhdGVJc1JlYWRPbmx5KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2FuZHJvaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldEVuYWJsZWQoIXRoaXMuaXNSZWFkT25seSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlQ29tbWl0TW9kZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbW1pdE1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtQ29tbWl0TW9kZS5JbW1lZGlhdGU6XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRDb21taXRNb2RlKGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmNvcmUuQ29tbWl0TW9kZS5JTU1FRElBVEUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1Db21taXRNb2RlLk1hbnVhbDpcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmRyb2lkLnNldENvbW1pdE1vZGUoY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uY29yZS5Db21taXRNb2RlLk1BTlVBTCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUNvbW1pdE1vZGUuT25Mb3N0Rm9jdXM6XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRDb21taXRNb2RlKGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmNvcmUuQ29tbWl0TW9kZS5PTl9MT1NUX0ZPQ1VTKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVZhbGlkYXRpb25Nb2RlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2FuZHJvaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMudmFsaWRhdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtVmFsaWRhdGlvbk1vZGUuSW1tZWRpYXRlOlxuICAgICAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0VmFsaWRhdGlvbk1vZGUoY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uY29yZS5WYWxpZGF0aW9uTW9kZS5JTU1FRElBVEUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1WYWxpZGF0aW9uTW9kZS5NYW51YWw6XG4gICAgICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRWYWxpZGF0aW9uTW9kZShjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5jb3JlLlZhbGlkYXRpb25Nb2RlLk1BTlVBTCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybVZhbGlkYXRpb25Nb2RlLk9uTG9zdEZvY3VzOlxuICAgICAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0VmFsaWRhdGlvbk1vZGUoY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uY29yZS5WYWxpZGF0aW9uTW9kZS5PTl9MT1NUX0ZPQ1VTKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZWxvYWQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkLnJlbG9hZCgpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkLmlzUmVsb2FkU3VzcGVuZGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zeW5jRWRpdG9yc1dpdGhOYXRpdmVFZGl0b3JzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGVBbGwoKTogUHJvbWlzZTxCb29sZWFuPiB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoISg8YW55PnRoaXMuX2FuZHJvaWQpLl92YWxpZGF0aW9uSW5mb1Byb2NlZHVyZSB8fCAhKDxhbnk+dGhpcy5fYW5kcm9pZCkuX3ZhbGlkYXRpb25JbmZvUHJvY2VkdXJlLm93bmVyKSB7XG4gICAgICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fdmFsaWRhdGlvbkluZm9Qcm9jZWR1cmUgPSBuZXcgRGF0YUZvcm1WYWxpZGF0aW9uSW5mb1Byb2NlZHVyZSh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VSZXNvbHZlID0gZnVuY3Rpb24odGhpczogUmFkRGF0YUZvcm0sIHJlc29sdmU6IEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBpZiAodGhpcyAmJiAoPGFueT50aGlzLl9hbmRyb2lkKS5fdmFsaWRhdGlvbkluZm9Qcm9jZWR1cmUpIHtcbiAgICAgICAgICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fdmFsaWRhdGlvbkluZm9Qcm9jZWR1cmUudmFsaWRhdGVSZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPEJvb2xlYW4+KHByb21pc2VSZXNvbHZlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX2FuZHJvaWQudmFsaWRhdGVDaGFuZ2VzKCg8YW55PnRoaXMuX2FuZHJvaWQpLl92YWxpZGF0aW9uSW5mb1Byb2NlZHVyZSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWxpZGF0ZUFuZENvbW1pdEFsbCgpOiBQcm9taXNlPEJvb2xlYW4+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb21pc2VSZXNvbHZlID0gZnVuY3Rpb24gKHRoaXM6IFJhZERhdGFGb3JtLCByZXNvbHZlOiBGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUFsbCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmRyb2lkLmNvbW1pdEZvcmNlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Qm9vbGVhbj4ocHJvbWlzZVJlc29sdmUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbW1pdEFsbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5kcm9pZC5jb21taXRGb3JjZWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzVmFsaWRhdGlvbkVycm9ycygpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuX2FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQudmFsaWRhdGVDaGFuZ2VzKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZC5oYXNWYWxpZGF0aW9uRXJyb3JzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25Tb3VyY2VQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl91cGRhdGVTb3VyY2UoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uTWV0YWRhdGFQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl91cGRhdGVNZXRhZGF0YSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZU5hdGl2ZUVkaXRvcihlbnRpdHlQcm9wZXJ0eTogRW50aXR5UHJvcGVydHkpIHtcbiAgICAgICAgbGV0IG5hdGl2ZUVkaXRvciA9IHRoaXMuX2FuZHJvaWQuZ2V0RXhpc3RpbmdFZGl0b3JGb3JQcm9wZXJ0eShlbnRpdHlQcm9wZXJ0eS5uYW1lKTtcbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvciA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFlbnRpdHlQcm9wZXJ0eS5lZGl0b3IpIHtcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5Ll9jcmVhdGVFZGl0b3JGcm9tTmF0aXZlKG5hdGl2ZUVkaXRvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fbGlua0VkaXRvcldpdGhOYXRpdmUoZW50aXR5UHJvcGVydHkuZWRpdG9yLCBuYXRpdmVFZGl0b3IpO1xuICAgICAgICAgICAgaWYgKGVudGl0eVByb3BlcnR5LmF1dG9Db21wbGV0ZURpc3BsYXlNb2RlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVQcm9wZXJ0eUVkaXRvckRpc3BsYXlNb2RlKG5hdGl2ZUVkaXRvciwgZW50aXR5UHJvcGVydHkuYXV0b0NvbXBsZXRlRGlzcGxheU1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3luY0VkaXRvcnNXaXRoTmF0aXZlRWRpdG9ycygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNvdXJjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXBzW2ldLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5UHJvcGVydHk6IEVudGl0eVByb3BlcnR5ID0gPEVudGl0eVByb3BlcnR5PnRoaXMuZ3JvdXBzW2ldLnByb3BlcnRpZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVOYXRpdmVFZGl0b3IoZW50aXR5UHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLnByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlTmF0aXZlRWRpdG9yKGVudGl0eVByb3BlcnR5KTtcblxuICAgICAgICAgICAgICAgIGlmICghZW50aXR5UHJvcGVydHkuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGFuIEVudGl0eVByb3BlcnR5IGlzIGhpZGRlbixcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5hdGl2ZSBhbmRyb2lkIG5ldmVyIGNyZWF0ZXMgYW4gZWRpdG9yIGZvciBpdC5cbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFlbnRpdHlQcm9wZXJ0eS5wYXJlbnQgJiYgIWVudGl0eVByb3BlcnR5LmVkaXRvci5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkVmlldyhlbnRpdHlQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByb3BlcnR5Ll9hZGRWaWV3KGVudGl0eVByb3BlcnR5LmVkaXRvcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG5nS2V5ID0gdGhpcy5fbmdLZXk7XG4gICAgICAgICAgICAgICAgaWYgKG5nS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCBhbnkgbmV3bHkgY3JlYXRlZCBlZGl0b3JzIHRvIHRoZSBzYW1lIHNjb3BlIGFzIFJhZERhdGFGb3JtXG4gICAgICAgICAgICAgICAgICAgIC8vIGluIG9yZGVyIHRvIGFwcGx5IGNvbXBvbmVudC1zcGVjaWZpYyBjc3MgaW4gYW5ndWxhclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmdWYWx1ZSA9IHRoaXNbbmdLZXldO1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eVtuZ0tleV0gPSBuZ1ZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eS5lZGl0b3JbbmdLZXldID0gbmdWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHkuZWRpdG9yLmxhYmVsW25nS2V5XSA9IG5nVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eVByb3BlcnR5LmVkaXRvci5lZGl0b3JDb3JlW25nS2V5XSA9IG5nVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29uQ3NzU3RhdGVDaGFuZ2UoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX21ha2VUeXBlZmFjZShmb250TmFtZTogc3RyaW5nLCBzdHlsZTogY29tbW9uTW9kdWxlLkRhdGFGb3JtRm9udFN0eWxlKSB7XG4gICAgICAgIGxldCBmb250U3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlR5cGVmYWNlLk5PUk1BTDtcbiAgICAgICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1Gb250U3R5bGUuQm9sZDpcbiAgICAgICAgICAgICAgICBmb250U3R5bGUgPSBhbmRyb2lkLmdyYXBoaWNzLlR5cGVmYWNlLkJPTEQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUZvbnRTdHlsZS5JdGFsaWM6XG4gICAgICAgICAgICAgICAgZm9udFN0eWxlID0gYW5kcm9pZC5ncmFwaGljcy5UeXBlZmFjZS5JVEFMSUM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUZvbnRTdHlsZS5Cb2xkSXRhbGljOlxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZSA9IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UuQk9MRF9JVEFMSUM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UuY3JlYXRlKGZvbnROYW1lLCBmb250U3R5bGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVudGl0eVByb3BlcnR5IGV4dGVuZHMgY29tbW9uTW9kdWxlLkVudGl0eVByb3BlcnR5IHtcbiAgICBfc2hvdWxkU2tpcEVkaXRvclVwZGF0ZSA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5FbnRpdHlQcm9wZXJ0eTtcbiAgICBwdWJsaWMgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5FbnRpdHlQcm9wZXJ0eSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmRyb2lkLmlzVmFsaWQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hbmRyb2lkLmdldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgdmFsdWVDYW5kaWRhdGUoKTogYW55IHtcbiAgICAgICAgaWYgKHRoaXMuYW5kcm9pZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYW5kcm9pZC5nZXRWYWx1ZUNhbmRpZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgX2xpbmtQcm9wZXJ0eVdpdGhOYXRpdmUodmFsdWU6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuRW50aXR5UHJvcGVydHkpIHtcbiAgICAgICAgdGhpcy5fYW5kcm9pZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLl9vbk5hdGl2ZVNldCgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVFZGl0b3JGcm9tTmF0aXZlKG5hdGl2ZUVkaXRvcikge1xuICAgICAgICBsZXQgdHlwZSA9IFByb3BlcnR5RWRpdG9yLl9nZXROYXRpdmVFZGl0b3JUeXBlKG5hdGl2ZUVkaXRvcik7XG4gICAgICAgIHRoaXMuX3Nob3VsZFNraXBFZGl0b3JVcGRhdGUgPSB0cnVlO1xuICAgICAgICBsZXQgcHJvcGVydHlFZGl0b3IgPSBuZXcgUHJvcGVydHlFZGl0b3IoKTtcbiAgICAgICAgcHJvcGVydHlFZGl0b3IudHlwZSA9IHR5cGU7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl9saW5rRWRpdG9yV2l0aE5hdGl2ZShwcm9wZXJ0eUVkaXRvciwgbmF0aXZlRWRpdG9yKTtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBwcm9wZXJ0eUVkaXRvcjtcbiAgICAgICAgdGhpcy5fc2hvdWxkU2tpcEVkaXRvclVwZGF0ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVkaXRvckNoYW5nZWQob2xkVmFsdWU6IFByb3BlcnR5RWRpdG9yLCBuZXdWYWx1ZTogUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSBmdW5jdGlvbiAodGhpczogRW50aXR5UHJvcGVydHksIHByb3BlcnR5Q2hhbmdlRGF0YTogUHJvcGVydHlDaGFuZ2VEYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BlcnR5Q2hhbmdlRGF0YS5wcm9wZXJ0eU5hbWUgPT09IFwidHlwZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uRWRpdG9yVHlwZUNoYW5nZWQocHJvcGVydHlDaGFuZ2VEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgbmV3VmFsdWUub24oT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBwcm9wZXJ0eUNoYW5nZWRIYW5kbGVyLCB0aGlzKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zaG91bGRTa2lwRWRpdG9yVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVFZGl0b3IobmV3VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25FZGl0b3JUeXBlQ2hhbmdlZChkYXRhOiBQcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgbGV0IG5ld0VkaXRvciA9IG5ldyBQcm9wZXJ0eUVkaXRvcigpO1xuICAgICAgICBuZXdFZGl0b3IudHlwZSA9IHRoaXMuZWRpdG9yLnR5cGU7XG4gICAgICAgIG5ld0VkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlID0gdGhpcy5lZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZTtcbiAgICAgICAgbmV3RWRpdG9yLnBhcmFtcyA9IHRoaXMuZWRpdG9yLnBhcmFtcztcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBuZXdFZGl0b3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfb25OYXRpdmVTZXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlRWRpdG9yKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVWYWxpZGF0b3JzKHRoaXMudmFsaWRhdG9ycyk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlQ29udmVydGVyKHRoaXMuY29udmVydGVyKTtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVWYWx1ZXNQcm92aWRlcih0aGlzLnZhbHVlc1Byb3ZpZGVyQXJyYXkpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZURpc3BsYXlOYW1lKHRoaXMuZGlzcGxheU5hbWUpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUluZGV4KHRoaXMuaW5kZXgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUNvbHVtbkluZGV4KHRoaXMuY29sdW1uSW5kZXgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUhpZGRlbih0aGlzLmhpZGRlbik7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlUmVhZE9ubHkodGhpcy5yZWFkT25seSk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlUmVxdWlyZWQodGhpcy5yZXF1aXJlZCk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlSGludFRleHQodGhpcy5oaW50VGV4dCk7XG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlSW1hZ2VSZXNvdXJjZSh0aGlzLmltYWdlUmVzb3VyY2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVFZGl0b3IodmFsdWU6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FuZHJvaWQgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDdXN0b21Qcm9wZXJ0eUVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRFZGl0b3JUeXBlKGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1DdXN0b21FZGl0b3IuY2xhc3MpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0RWRpdG9yVHlwZSgoPFByb3BlcnR5RWRpdG9yPnZhbHVlKS5lZGl0b3JDbGFzcyk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0RWRpdG9yUGFyYW1zKCg8UHJvcGVydHlFZGl0b3I+dmFsdWUpLmVkaXRvclBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVZhbGlkYXRvcnModmFsdWU6IEFycmF5PGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eVZhbGlkYXRvcj4pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8ICF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHZhbGlkYXRvclNldDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Qcm9wZXJ0eVZhbGlkYXRvclNldCA9XG4gICAgICAgICAgICBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Qcm9wZXJ0eVZhbGlkYXRvclNldCgpO1xuICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IHZhbHVlLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdG9yQmFzZSA9IHZhbHVlW2tdO1xuICAgICAgICAgICAgbGV0IGFWYWxpZGF0b3IgPSB2YWxpZGF0b3JCYXNlLmFuZHJvaWQ7XG4gICAgICAgICAgICB2YWxpZGF0b3JTZXQuYWRkKGFWYWxpZGF0b3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0VmFsaWRhdG9yKHZhbGlkYXRvclNldCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVZhbHVlc1Byb3ZpZGVyKHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCB8fCAhdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuYXRpdmVTb3VyY2UgPSBuZXcgamF2YS51dGlsLkFycmF5TGlzdCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbmF0aXZlVmFsdWUgPSB2YWx1ZVtpXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmF0aXZlVmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IG5hdGl2ZVZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmF0aXZlVmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVWYWx1ZSA9IG5ldyBqYXZhLmxhbmcuSW50ZWdlcihuYXRpdmVWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuYXRpdmVTb3VyY2UuYWRkKG5hdGl2ZVZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmF0aXZlTGlzdCA9IG5hdGl2ZVNvdXJjZS50b0FycmF5KCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQudXBkYXRlVmFsdWVzKG5hdGl2ZUxpc3QpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuYW5kcm9pZC5ub3RpZnlFbnRpdHlQcm9wZXJ0eUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVJbWFnZVJlc291cmNlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbmF0aXZlVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGxldCBhcHBSZXNvdXJjZXMgPSBhZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKS5nZXRSZXNvdXJjZXMoKTtcbiAgICAgICAgICAgIGxldCBwYWNrYWdlTmFtZSA9IGFkLmdldEFwcGxpY2F0aW9uKCkuZ2V0UGFja2FnZU5hbWUoKTtcbiAgICAgICAgICAgIGlmIChhcHBSZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpZmllciA9IGFwcFJlc291cmNlcy5nZXRJZGVudGlmaWVyKG5hdGl2ZVZhbHVlLCAnZHJhd2FibGUnLCBwYWNrYWdlTmFtZSk7XG4gICAgICAgICAgICAgICAgbmF0aXZlVmFsdWUgPSBpZGVudGlmaWVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkLnNldEltYWdlUmVzb3VyY2UobmF0aXZlVmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRJbWFnZVJlc291cmNlKDApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5hbmRyb2lkLm5vdGlmeUVudGl0eVByb3BlcnR5Q2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZURpc3BsYXlOYW1lKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldEhlYWRlcih2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5hbmRyb2lkLm5vdGlmeUVudGl0eVByb3BlcnR5Q2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZUluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldFBvc2l0aW9uKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlQ29udmVydGVyKHZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlDb252ZXJ0ZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldENvbnZlcnRlcihuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Qcm9wZXJ0eUNvbnZlcnRlcih7XG4gICAgICAgICAgICBjb252ZXJ0VG8oc291cmNlOiBqYXZhLmxhbmcuT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLmNvbnZlcnRUbyhzb3VyY2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udmVydEZyb20oc291cmNlOiBqYXZhLmxhbmcuT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHZhbHVlLmNvbnZlcnRGcm9tKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuYW5kcm9pZCkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuYW5kcm9pZC5sb2FkUHJvcGVydHlWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZUNvbHVtbkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldENvbHVtblBvc2l0aW9uKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlSGlkZGVuKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW5kcm9pZCB8fCB2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRTa2lwKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlUmVhZE9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuc2V0UmVhZE9ubHkodGhpcy5lZGl0b3IsIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvci5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IuYW5kcm9pZC5zZXRFbmFibGVkKCF2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlUmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbmRyb2lkIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldFJlcXVpcmVkKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlSGludFRleHQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuX2FuZHJvaWQgfHwgIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRIaW50VGV4dCh2YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5hbmRyb2lkLm5vdGlmeUVudGl0eVByb3BlcnR5Q2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YUZvcm1FZGl0b3JMYWJlbCBleHRlbmRzIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvckxhYmVsIHtcbiAgICBwcml2YXRlIF9hbmRyb2lkOiBhbmRyb2lkLndpZGdldC5UZXh0VmlldztcbiAgICBwcml2YXRlIF9lZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcjtcblxuICAgIGdldCBhbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSA8YW5kcm9pZC53aWRnZXQuVGV4dFZpZXc+ZWRpdG9yLmFuZHJvaWQuZ2V0SGVhZGVyVmlldygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVOYXRpdmVWaWV3KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzcG9zZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHRoaXMuX2VkaXRvciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSBudWxsO1xuICAgIH1cblxuICAgIFtjb2xvclByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlciB8IENvbG9yKSB7XG4gICAgICAgIGNvbnN0IG5zQ29sb3IgPSB2YWx1ZSBpbnN0YW5jZW9mIENvbG9yID8gdmFsdWUuYW5kcm9pZCA6IHZhbHVlO1xuICAgICAgICB0aGlzLl9hbmRyb2lkLnNldFRleHRDb2xvcihuc0NvbG9yKTtcbiAgICB9XG5cbiAgICBbZm9udFNpemVQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIgfCB7IG5hdGl2ZVNpemU6IG51bWJlciB9KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0VGV4dFNpemUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRUZXh0U2l6ZShhbmRyb2lkLnV0aWwuVHlwZWRWYWx1ZS5DT01QTEVYX1VOSVRfUFgsIHZhbHVlLm5hdGl2ZVNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgW2ZvbnRJbnRlcm5hbFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IEZvbnQgfCBhbmRyb2lkLmdyYXBoaWNzLlR5cGVmYWNlKSB7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0VHlwZWZhY2UodmFsdWUgaW5zdGFuY2VvZiBGb250ID8gdmFsdWUuZ2V0QW5kcm9pZFR5cGVmYWNlKCkgOiB2YWx1ZSk7XG4gICAgfVxuXG4gICAgW3dpZHRoUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFdpZHRoKHRoaXMuX2VkaXRvciwgdmFsdWUpO1xuICAgIH1cblxuICAgIFtjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3IucG9zaXRpb25Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBcImxlZnRcIiB8IFwidG9wXCIpIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsUG9zaXRpb24odGhpcy5fZWRpdG9yLCBjb21tb25Nb2R1bGUuRGF0YUZvcm1MYWJlbFBvc2l0aW9uLkxlZnQpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLnRvTG93ZXJDYXNlKCkgPT09IFwidG9wXCIpIHtcbiAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFBvc2l0aW9uKHRoaXMuX2VkaXRvciwgY29tbW9uTW9kdWxlLkRhdGFGb3JtTGFiZWxQb3NpdGlvbi5Ub3ApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YUZvcm1FZGl0b3JDb3JlIGV4dGVuZHMgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yQ29yZSB7XG4gICAgX2FuZHJvaWQ6IGFuZHJvaWQudmlldy5WaWV3O1xuICAgIF9lZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcjtcblxuICAgIGdldCBhbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSB0aGlzLl9lZGl0b3IuYW5kcm9pZC5nZXRFZGl0b3JWaWV3KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwb3NlTmF0aXZlVmlldygpIHtcbiAgICAgICAgdGhpcy5fZWRpdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5fYW5kcm9pZCA9IG51bGw7XG4gICAgfVxuXG4gICAgW2NvbG9yUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyIHwgQ29sb3IpIHtcbiAgICAgICAgY29uc3QgbnNDb2xvciA9IHZhbHVlIGluc3RhbmNlb2YgQ29sb3IgPyB2YWx1ZS5hbmRyb2lkIDogdmFsdWU7XG4gICAgICAgIHRoaXMuX2VkaXRvci5hbmRyb2lkLnNldEVkaXRvckNvbG9yKG5zQ29sb3IpO1xuICAgIH1cblxuICAgIFtmb250U2l6ZVByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlciB8IHsgbmF0aXZlU2l6ZTogbnVtYmVyIH0pIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiA/IHZhbHVlIDogdmFsdWUubmF0aXZlU2l6ZTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmFuZHJvaWQuc2V0RWRpdG9yVGV4dFNpemUoc2l6ZSk7XG4gICAgfVxuXG4gICAgW2ZvbnRJbnRlcm5hbFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IEZvbnQgfCBhbmRyb2lkLmdyYXBoaWNzLlR5cGVmYWNlKSB7XG4gICAgICAgIGNvbnN0IGVkaXRvclR5cGVmYWNlID0gdmFsdWUgaW5zdGFuY2VvZiBGb250ID8gdmFsdWUuZ2V0QW5kcm9pZFR5cGVmYWNlKCkgOiB2YWx1ZTtcbiAgICAgICAgdGhpcy5fZWRpdG9yLmFuZHJvaWQuc2V0RWRpdG9yVHlwZWZhY2UoZWRpdG9yVHlwZWZhY2UpO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRWRpdG9yc1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5RWRpdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yIHtcbiAgICBfcmVhZE9ubHk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX2xhYmVsOiBEYXRhRm9ybUVkaXRvckxhYmVsO1xuICAgIHByaXZhdGUgX2VkaXRvckNvcmU6IERhdGFGb3JtRWRpdG9yQ29yZTtcbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5jb3JlLkVudGl0eVByb3BlcnR5Vmlld2VyO1xuICAgIHByaXZhdGUgX2VkaXRvckNsYXNzOiBhbnk7XG4gICAgcHJpdmF0ZSBfZWRpdG9yUGFyYW1zOiBhbnk7XG5cbiAgICBwdWJsaWMgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uY29yZS5FbnRpdHlQcm9wZXJ0eVZpZXdlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgYW5kcm9pZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2V0TmF0aXZlVmlldyh2YWx1ZS5yb290TGF5b3V0KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLl9sYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlVmlldyh0aGlzLl9sYWJlbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2VkaXRvckNvcmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpZXcodGhpcy5fZWRpdG9yQ29yZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2FuZHJvaWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbmV3IERhdGFGb3JtRWRpdG9yTGFiZWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3JDb3JlID0gbmV3IERhdGFGb3JtRWRpdG9yQ29yZSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFZpZXcodGhpcy5fbGFiZWwpO1xuICAgICAgICAgICAgdGhpcy5fYWRkVmlldyh0aGlzLl9lZGl0b3JDb3JlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhYmVsID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2VkaXRvckNvcmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWw7XG4gICAgfVxuXG4gICAgZ2V0IGVkaXRvckNvcmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3JDb3JlO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZWRpdG9yQ2xhc3MoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VkaXRvckNsYXNzO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgZWRpdG9yUGFyYW1zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3JQYXJhbXM7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdMZWZ0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICg8YW5kcm9pZC52aWV3LlZpZXdHcm91cC5NYXJnaW5MYXlvdXRQYXJhbXM+dGhpcy5hbmRyb2lkLmdldE1haW5MYXlvdXQoKS5nZXRMYXlvdXRQYXJhbXMoKSkubGVmdE1hcmdpbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIFtwYWRkaW5nVG9wUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICg8YW5kcm9pZC52aWV3LlZpZXdHcm91cC5NYXJnaW5MYXlvdXRQYXJhbXM+dGhpcy5hbmRyb2lkLmdldE1haW5MYXlvdXQoKS5nZXRMYXlvdXRQYXJhbXMoKSkudG9wTWFyZ2luID0gdmFsdWU7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdSaWdodFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICAoPGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTWFyZ2luTGF5b3V0UGFyYW1zPnRoaXMuYW5kcm9pZC5nZXRNYWluTGF5b3V0KCkuZ2V0TGF5b3V0UGFyYW1zKCkpLnJpZ2h0TWFyZ2luID0gdmFsdWU7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdCb3R0b21Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgKDxhbmRyb2lkLnZpZXcuVmlld0dyb3VwLk1hcmdpbkxheW91dFBhcmFtcz50aGlzLmFuZHJvaWQuZ2V0TWFpbkxheW91dCgpLmdldExheW91dFBhcmFtcygpKS5ib3R0b21NYXJnaW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlTmF0aXZlVmlldygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQgPyA8YW55PnRoaXMuX2FuZHJvaWQucm9vdExheW91dCgpIDogc3VwZXIuY3JlYXRlTmF0aXZlVmlldygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblByb3BlcnR5RWRpdG9yU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvclN0eWxlKTogdm9pZCB7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLmFwcGx5U3R5bGUodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3R5bGVQcm9wZXJ0eUNoYW5nZWQocHJvcGVydHlOYW1lOiBTdHJpbmcpIHtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuYXBwbHlTdHlsZUZvclByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUGFyYW1zQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yUGFyYW1zLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yUGFyYW1zKTogdm9pZCB7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLmFwcGx5UGFyYW1zKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblBhcmFtc1Byb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5hcHBseVBhcmFtcyh0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UeXBlQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUVkaXRvckNsYXNzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdXBkYXRlRWRpdG9yQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5UZXh0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybVRleHRFZGl0b3IuY2xhc3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuTXVsdGlsaW5lVGV4dDpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1NdWx0aWxpbmVUZXh0RWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkVtYWlsOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybUVtYWlsRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlBhc3N3b3JkOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybVBhc3N3b3JkRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlBob25lOlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybVBob25lRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkRlY2ltYWw6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtRGVjaW1hbEVkaXRvci5jbGFzcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5OdW1iZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtSW50ZWdlckVkaXRvci5jbGFzcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5Td2l0Y2g6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtU3dpdGNoRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlN0ZXBwZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtTnVtYmVyUGlja2VyRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlNsaWRlcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1TZWVrQmFyRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlNlZ21lbnRlZEVkaXRvcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1TZWdtZW50ZWRFZGl0b3IuY2xhc3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuRGF0ZVBpY2tlcjpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1EYXRlRWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlRpbWVQaWNrZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtVGltZUVkaXRvci5jbGFzcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QaWNrZXI6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtU3Bpbm5lckVkaXRvci5jbGFzcztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5MaXN0OlxuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRvckNsYXNzID0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybUxpc3RWaWV3RWRpdG9yLmNsYXNzO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkF1dG9Db21wbGV0ZUlubGluZTpcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0b3JDbGFzcyA9IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1SYWRBdXRvQ29tcGxldGVFZGl0b3IuY2xhc3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuTGFiZWw6XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ2xhc3MgPSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtTGFiZWxFZGl0b3IuY2xhc3M7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogVW5zdXBwb3J0ZWQgZWRpdG9yIHR5cGU6IFwiICsgdGhpcy50eXBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBfZ2V0TmF0aXZlRWRpdG9yVHlwZShuYXRpdmVFZGl0b3IpIHtcblxuICAgICAgICBsZXQgbmF0aXZlRWRpdG9yQ2xhc3MgPSBuYXRpdmVFZGl0b3IuZ2V0Q2xhc3MoKTtcbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtTXVsdGlsaW5lVGV4dEVkaXRvci5jbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuTXVsdGlsaW5lVGV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yQ2xhc3MgPT09IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1FbWFpbEVkaXRvci5jbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuRW1haWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtUGFzc3dvcmRFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlBhc3N3b3JkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3JDbGFzcyA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybVBob25lRWRpdG9yLmNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QaG9uZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yQ2xhc3MgPT09IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1EZWNpbWFsRWRpdG9yLmNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5EZWNpbWFsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3JDbGFzcyA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybUludGVnZXJFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLk51bWJlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yQ2xhc3MgPT09IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1Td2l0Y2hFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlN3aXRjaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yQ2xhc3MgPT09IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1OdW1iZXJQaWNrZXJFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLlN0ZXBwZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtU2Vla0JhckVkaXRvci5jbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU2xpZGVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3JDbGFzcyA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybVNlZ21lbnRlZEVkaXRvci5jbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuU2VnbWVudGVkRWRpdG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVFZGl0b3JDbGFzcyA9PT0gY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybURhdGVFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkRhdGVQaWNrZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtVGltZUVkaXRvci5jbGFzcykge1xuICAgICAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuVGltZVBpY2tlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmF0aXZlRWRpdG9yQ2xhc3MgPT09IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1TcGlubmVyRWRpdG9yLmNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5QaWNrZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtTGlzdFZpZXdFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtUmFkQXV0b0NvbXBsZXRlRWRpdG9yLmNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tbW9uTW9kdWxlLkRhdGFGb3JtRWRpdG9yVHlwZS5BdXRvQ29tcGxldGVJbmxpbmU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5hdGl2ZUVkaXRvckNsYXNzID09PSBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtTGFiZWxFZGl0b3IuY2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21tb25Nb2R1bGUuRGF0YUZvcm1FZGl0b3JUeXBlLkxhYmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZS5EYXRhRm9ybUVkaXRvclR5cGUuVGV4dDtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Qcm9wZXJ0eUVkaXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5DdXN0b21Qcm9wZXJ0eUVkaXRvciB7XG4gICAgX3JlYWRPbmx5OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIF9sYWJlbDogRGF0YUZvcm1FZGl0b3JMYWJlbDtcbiAgICBwcml2YXRlIF9lZGl0b3JDb3JlOiBEYXRhRm9ybUVkaXRvckNvcmU7XG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLnZpc3VhbGl6YXRpb24uZWRpdG9ycy5EYXRhRm9ybUN1c3RvbUVkaXRvcjtcbiAgICBwcml2YXRlIF9lZGl0b3JDbGFzczogYW55O1xuICAgIHByaXZhdGUgX2VkaXRvclBhcmFtczogYW55O1xuXG4gICAgcHVibGljIGdldCBhbmRyb2lkKCk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmVkaXRvcnMuRGF0YUZvcm1DdXN0b21FZGl0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGFuZHJvaWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fYW5kcm9pZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNldE5hdGl2ZVZpZXcodmFsdWUucm9vdExheW91dCgpKTtcblxuICAgICAgICBpZiAodGhpcy5fbGFiZWwpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZVZpZXcodGhpcy5fbGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9lZGl0b3JDb3JlKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVWaWV3KHRoaXMuX2VkaXRvckNvcmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG5ldyBEYXRhRm9ybUVkaXRvckxhYmVsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fZWRpdG9yQ29yZSA9IG5ldyBEYXRhRm9ybUVkaXRvckNvcmUodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9hZGRWaWV3KHRoaXMuX2xhYmVsKTtcbiAgICAgICAgICAgIHRoaXMuX2FkZFZpZXcodGhpcy5fZWRpdG9yQ29yZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYWJlbCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9lZGl0b3JDb3JlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhYmVsO1xuICAgIH1cblxuICAgIGdldCBlZGl0b3JDb3JlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yQ29yZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGVkaXRvckNsYXNzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9lZGl0b3JDbGFzcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGVkaXRvclBhcmFtcygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdG9yUGFyYW1zO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblByb3BlcnR5RWRpdG9yU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JTdHlsZSwgbmV3VmFsdWU6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvclN0eWxlKTogdm9pZCB7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLmFwcGx5U3R5bGUodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3R5bGVQcm9wZXJ0eUNoYW5nZWQocHJvcGVydHlOYW1lOiBTdHJpbmcpIHtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuYXBwbHlTdHlsZUZvclByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUGFyYW1zQ2hhbmdlZChvbGRWYWx1ZTogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yUGFyYW1zLCBuZXdWYWx1ZTogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yUGFyYW1zKTogdm9pZCB7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLmFwcGx5UGFyYW1zKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblBhcmFtc1Byb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5hcHBseVBhcmFtcyh0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UeXBlQ2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiV0FSTklORzogWW91IGNhbid0IGNoYW5nZSBDdXN0b21Qcm9wZXJ0eUVkaXRvcidzIHR5cGVcIik7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdMZWZ0UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICg8YW5kcm9pZC52aWV3LlZpZXdHcm91cC5NYXJnaW5MYXlvdXRQYXJhbXM+dGhpcy5hbmRyb2lkLmdldE1haW5MYXlvdXQoKS5nZXRMYXlvdXRQYXJhbXMoKSkubGVmdE1hcmdpbiA9IHZhbHVlO1xuICAgIH1cblxuICAgIFtwYWRkaW5nVG9wUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgICg8YW5kcm9pZC52aWV3LlZpZXdHcm91cC5NYXJnaW5MYXlvdXRQYXJhbXM+dGhpcy5hbmRyb2lkLmdldE1haW5MYXlvdXQoKS5nZXRMYXlvdXRQYXJhbXMoKSkudG9wTWFyZ2luID0gdmFsdWU7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdSaWdodFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xuICAgICAgICAoPGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTWFyZ2luTGF5b3V0UGFyYW1zPnRoaXMuYW5kcm9pZC5nZXRNYWluTGF5b3V0KCkuZ2V0TGF5b3V0UGFyYW1zKCkpLnJpZ2h0TWFyZ2luID0gdmFsdWU7XG4gICAgfVxuXG4gICAgW3BhZGRpbmdCb3R0b21Qcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgKDxhbmRyb2lkLnZpZXcuVmlld0dyb3VwLk1hcmdpbkxheW91dFBhcmFtcz50aGlzLmFuZHJvaWQuZ2V0TWFpbkxheW91dCgpLmdldExheW91dFBhcmFtcygpKS5ib3R0b21NYXJnaW4gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVmlldyhjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtQ3VzdG9tUHJvcGVydHlFZGl0b3JFdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5DdXN0b21Qcm9wZXJ0eUVkaXRvci5lZGl0b3JOZWVkc1ZpZXdFdmVudCxcbiAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgIHZpZXc6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm90aWZ5KGFyZ3MpO1xuICAgICAgICByZXR1cm4gYXJncy52aWV3O1xuICAgIH1cblxuICAgIHB1YmxpYyBhcHBseVZhbHVlVG9FZGl0b3IodmFsdWU6IGFueSwgdmlldzogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBhcmdzOiBjb21tb25Nb2R1bGUuRGF0YUZvcm1DdXN0b21Qcm9wZXJ0eUVkaXRvckV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY29tbW9uTW9kdWxlLkN1c3RvbVByb3BlcnR5RWRpdG9yLmVkaXRvckhhc1RvQXBwbHlWYWx1ZUV2ZW50LFxuICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgdmlldzogdmlldyxcbiAgICAgICAgICAgIGNvbnRleHQ6IHZpZXcuZ2V0Q29udGV4dCgpLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm90aWZ5KGFyZ3MpO1xuICAgIH1cblxuICAgIHB1YmxpYyB2YWx1ZSh2aWV3OiBhbnkpOiBhbnkge1xuICAgICAgICBsZXQgYXJnczogY29tbW9uTW9kdWxlLkRhdGFGb3JtQ3VzdG9tUHJvcGVydHlFZGl0b3JFdmVudERhdGEgPSB7XG4gICAgICAgICAgICBldmVudE5hbWU6IGNvbW1vbk1vZHVsZS5DdXN0b21Qcm9wZXJ0eUVkaXRvci5lZGl0b3JOZWVkc1ZhbHVlRXZlbnQsXG4gICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICAgICAgY29udGV4dDogdmlldy5nZXRDb250ZXh0KCksXG4gICAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm90aWZ5KGFyZ3MpO1xuICAgICAgICByZXR1cm4gYXJncy52YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5VmFsdWVDaGFuZ2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkKSB7XG4gICAgICAgICAgICB0aGlzLmFuZHJvaWQubm90aWZ5RWRpdG9yVmFsdWVDaGFuZ2VkKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUVkaXRvckhlbHBlciB7XG4gICAgc3RhdGljIF9saW5rRWRpdG9yV2l0aE5hdGl2ZShlZGl0b3I6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvciwgdmFsdWU6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS52aXN1YWxpemF0aW9uLmNvcmUuRW50aXR5UHJvcGVydHlWaWV3ZXIpIHtcbiAgICAgICAgaWYgKGVkaXRvciBpbnN0YW5jZW9mIEN1c3RvbVByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgICAgICAoPEN1c3RvbVByb3BlcnR5RWRpdG9yPmVkaXRvcikuYW5kcm9pZCA9IDxjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtQ3VzdG9tRWRpdG9yPnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgKDxQcm9wZXJ0eUVkaXRvcj5lZGl0b3IpLmFuZHJvaWQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlKSB7XG4gICAgICAgICAgICBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZSA9IG5ldyBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JTdHlsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWRpdG9yLnBhcmFtcykge1xuICAgICAgICAgICAgZWRpdG9yLnBhcmFtcyA9IG5ldyBjb21tb25Nb2R1bGUuUHJvcGVydHlFZGl0b3JQYXJhbXMoKTtcbiAgICAgICAgfVxuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fb25OYXRpdmVTZXQoZWRpdG9yKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX29uTmF0aXZlU2V0KGVkaXRvcjogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZWRpdG9yIGluc3RhbmNlb2YgQ3VzdG9tUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5hbmRyb2lkLnNldFByb3ZpZGVyKG5ldyBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0udmlzdWFsaXphdGlvbi5lZGl0b3JzLkRhdGFGb3JtQ3VzdG9tRWRpdG9yLkRhdGFGb3JtQ3VzdG9tRWRpdG9yUHJvdmlkZXIoe1xuICAgICAgICAgICAgICAgIGNyZWF0ZVZpZXcoY29udGV4dDogYW5kcm9pZC5jb250ZW50LkNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8Q3VzdG9tUHJvcGVydHlFZGl0b3I+ZWRpdG9yKS5jcmVhdGVWaWV3KGNvbnRleHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYXBwbHlWYWx1ZVRvRWRpdG9yKHZhbHVlOiBqYXZhLmxhbmcuT2JqZWN0LCB2aWV3OiBhbmRyb2lkLnZpZXcuVmlldykge1xuICAgICAgICAgICAgICAgICAgICAoPEN1c3RvbVByb3BlcnR5RWRpdG9yPmVkaXRvcikuYXBwbHlWYWx1ZVRvRWRpdG9yKHZhbHVlLCB2aWV3KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGdldFZhbHVlKHZpZXc6IGFuZHJvaWQudmlldy5WaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoPEN1c3RvbVByb3BlcnR5RWRpdG9yPmVkaXRvcikudmFsdWUodmlldyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWRpdG9yLnR5cGUgPSBQcm9wZXJ0eUVkaXRvci5fZ2V0TmF0aXZlRWRpdG9yVHlwZShlZGl0b3IuYW5kcm9pZCk7XG4gICAgICAgIH1cblxuICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5hcHBseVN0eWxlKGVkaXRvcik7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLmFwcGx5UGFyYW1zKGVkaXRvcik7XG5cbiAgICAgICAgbGV0IGVkaXRvckVuYWJsZWQgPSAhUHJvcGVydHlFZGl0b3JIZWxwZXIuaXNSZWFkT25seShlZGl0b3IpO1xuICAgICAgICBlZGl0b3IuYW5kcm9pZC5zZXRFbmFibGVkKGVkaXRvckVuYWJsZWQpO1xuICAgICAgICBlZGl0b3IuYW5kcm9pZC5ub3RpZnlFbnRpdHlQcm9wZXJ0eUNoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3VwZGF0ZUxhYmVsVGV4dENvbG9yKGVkaXRvciwgbGFiZWxUZXh0Q29sb3IpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuYW5kcm9pZCB8fCBsYWJlbFRleHRDb2xvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLmFuZHJvaWQuZ2V0SGVhZGVyVmlldygpLnNldFRleHRDb2xvcihsYWJlbFRleHRDb2xvci5hbmRyb2lkKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgX3VwZGF0ZUxhYmVsRm9udChlZGl0b3IsIGxhYmVsRm9udE5hbWUsIGxhYmVsRm9udFN0eWxlKSB7XG4gICAgICAgIGlmICghZWRpdG9yLl9hbmRyb2lkIHx8IChsYWJlbEZvbnROYW1lID09PSB1bmRlZmluZWQgJiYgbGFiZWxGb250U3R5bGUgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZWRpdG9yVHlwZWZhY2U6IGFuZHJvaWQuZ3JhcGhpY3MuVHlwZWZhY2UgPVxuICAgICAgICAgICAgUmFkRGF0YUZvcm0uX21ha2VUeXBlZmFjZShsYWJlbEZvbnROYW1lLCBsYWJlbEZvbnRTdHlsZSk7XG4gICAgICAgIGVkaXRvci5hbmRyb2lkLmdldEhlYWRlclZpZXcoKS5zZXRUeXBlZmFjZShlZGl0b3JUeXBlZmFjZSk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVMYWJlbFRleHRTaXplKGVkaXRvciwgbGFiZWxUZXh0U2l6ZSkge1xuICAgICAgICBpZiAoIWVkaXRvci5hbmRyb2lkIHx8IGxhYmVsVGV4dFNpemUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZWRpdG9yLmFuZHJvaWQuZ2V0SGVhZGVyVmlldygpLnNldFRleHRTaXplKGxhYmVsVGV4dFNpemUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTGFiZWxIb3Jpem9udGFsT2Zmc2V0KGVkaXRvciwgbGFiZWxIb3Jpem9udGFsT2Zmc2V0KSB7XG4gICAgICAgIGlmICghZWRpdG9yLmFuZHJvaWQgfHwgbGFiZWxIb3Jpem9udGFsT2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3IuYW5kcm9pZC5nZXRIZWFkZXJWaWV3KCkuc2V0VHJhbnNsYXRpb25YKGxhYmVsSG9yaXpvbnRhbE9mZnNldCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVMYWJlbFZlcnRpY2FsT2Zmc2V0KGVkaXRvciwgbGFiZWxWZXJ0aWNhbE9mZnNldCkge1xuICAgICAgICBpZiAoIWVkaXRvci5hbmRyb2lkIHx8IGxhYmVsVmVydGljYWxPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5hbmRyb2lkLmdldEhlYWRlclZpZXcoKS5zZXRUcmFuc2xhdGlvblkobGFiZWxWZXJ0aWNhbE9mZnNldCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVFZGl0b3JIb3Jpem9udGFsT2Zmc2V0KGVkaXRvciwgZWRpdG9ySG9yaXpvbnRhbE9mZnNldCkge1xuICAgICAgICBpZiAoIWVkaXRvci5hbmRyb2lkIHx8IGVkaXRvckhvcml6b250YWxPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5hbmRyb2lkLmdldEVkaXRvclZpZXcoKS5zZXRUcmFuc2xhdGlvblgoZWRpdG9ySG9yaXpvbnRhbE9mZnNldCk7XG4gICAgfVxuXG4gICAgc3RhdGljIF91cGRhdGVFZGl0b3JWZXJ0aWNhbE9mZnNldChlZGl0b3IsIGVkaXRvclZlcnRpY2FsT2Zmc2V0KSB7XG4gICAgICAgIGlmICghZWRpdG9yLmFuZHJvaWQgfHwgZWRpdG9yVmVydGljYWxPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5hbmRyb2lkLmdldEVkaXRvclZpZXcoKS5zZXRUcmFuc2xhdGlvblkoZWRpdG9yVmVydGljYWxPZmZzZXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlRWRpdG9yRmlsbENvbG9yKGVkaXRvciwgZWRpdG9yRmlsbENvbG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yLmFuZHJvaWQgfHwgZWRpdG9yRmlsbENvbG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGVkaXRvci5hbmRyb2lkLnJvb3RMYXlvdXQoKS5zZXRCYWNrZ3JvdW5kQ29sb3IoZWRpdG9yRmlsbENvbG9yLmFuZHJvaWQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlRWRpdG9yU3Ryb2tlKGVkaXRvciwgZWRpdG9yU3Ryb2tlQ29sb3IsIGVkaXRvclN0cm9rZVdpZHRoLCBlZGl0b3JGaWxsQ29sb3IpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuYW5kcm9pZCB8fCAoZWRpdG9yU3Ryb2tlQ29sb3IgPT09IHVuZGVmaW5lZCAmJiBlZGl0b3JTdHJva2VXaWR0aCA9PT0gdW5kZWZpbmVkKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkcmF3YWJsZTogYW5kcm9pZC5ncmFwaGljcy5kcmF3YWJsZS5HcmFkaWVudERyYXdhYmxlID1cbiAgICAgICAgICAgIG5ldyBhbmRyb2lkLmdyYXBoaWNzLmRyYXdhYmxlLkdyYWRpZW50RHJhd2FibGUoKTtcblxuICAgICAgICBsZXQgc3Ryb2tlV2lkdGhEaXBzID0gZWRpdG9yU3Ryb2tlV2lkdGggPyBlZGl0b3JTdHJva2VXaWR0aCA6IDI7XG4gICAgICAgIGxldCBzdHJva2VXaWR0aCA9IHN0cm9rZVdpZHRoRGlwcyAqIGxheW91dC5nZXREaXNwbGF5RGVuc2l0eSgpO1xuXG4gICAgICAgIGxldCBzdHJva2VDb2xvciA9IGVkaXRvclN0cm9rZUNvbG9yID9cbiAgICAgICAgICAgIGVkaXRvclN0cm9rZUNvbG9yLmFuZHJvaWQgOlxuICAgICAgICAgICAgYW5kcm9pZC5ncmFwaGljcy5Db2xvci5CTEFDSztcblxuICAgICAgICBsZXQgZmlsbENvbG9yID0gZWRpdG9yRmlsbENvbG9yID9cbiAgICAgICAgICAgIGVkaXRvckZpbGxDb2xvci5hbmRyb2lkIDpcbiAgICAgICAgICAgIGFuZHJvaWQuZ3JhcGhpY3MuQ29sb3IuVFJBTlNQQVJFTlQ7XG5cbiAgICAgICAgZHJhd2FibGUuc2V0U3Ryb2tlKHN0cm9rZVdpZHRoLCBzdHJva2VDb2xvcik7XG4gICAgICAgIGRyYXdhYmxlLnNldENvbG9yKGZpbGxDb2xvcik7XG4gICAgICAgIGVkaXRvci5hbmRyb2lkLnJvb3RMYXlvdXQoKS5zZXRCYWNrZ3JvdW5kRHJhd2FibGUoZHJhd2FibGUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTGFiZWxIaWRkZW4oZWRpdG9yLCBsYWJlbEhpZGRlbikge1xuICAgICAgICBpZiAoIWVkaXRvci5hbmRyb2lkIHx8IGxhYmVsSGlkZGVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IGxhYmVsSGlkZGVuID8gYW5kcm9pZC52aWV3LlZpZXcuR09ORSA6IGFuZHJvaWQudmlldy5WaWV3LlZJU0lCTEU7XG4gICAgICAgIGVkaXRvci5hbmRyb2lkLmdldEhlYWRlclZpZXcoKS5zZXRWaXNpYmlsaXR5KHZpc2liaWxpdHkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTGFiZWxQb3NpdGlvbihlZGl0b3IsIGxhYmVsUG9zaXRpb246IGNvbW1vbk1vZHVsZS5EYXRhRm9ybUxhYmVsUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuYW5kcm9pZCB8fCBsYWJlbFBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFiZWxQb3NpdGlvbiA9PT0gY29tbW9uTW9kdWxlLkRhdGFGb3JtTGFiZWxQb3NpdGlvbi5MZWZ0KSB7XG4gICAgICAgICAgICBlZGl0b3IuYW5kcm9pZC5zZXRMYWJlbFBvc2l0aW9uKGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTGFiZWxQb3NpdGlvbi5MRUZUKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYWJlbFBvc2l0aW9uID09PSBjb21tb25Nb2R1bGUuRGF0YUZvcm1MYWJlbFBvc2l0aW9uLlRvcCkge1xuICAgICAgICAgICAgZWRpdG9yLmFuZHJvaWQuc2V0TGFiZWxQb3NpdGlvbihjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLkxhYmVsUG9zaXRpb24uVE9QKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBfdXBkYXRlTGFiZWxXaWR0aChlZGl0b3IsIGxhYmVsV2lkdGgpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IuYW5kcm9pZCB8fCBsYWJlbFdpZHRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmF0aXZlTGFiZWxXaWR0aCA9IGxhYmVsV2lkdGggKiBsYXlvdXQuZ2V0RGlzcGxheURlbnNpdHkoKTtcbiAgICAgICAgZWRpdG9yLmFuZHJvaWQuc2V0TGFiZWxXaWR0aChuYXRpdmVMYWJlbFdpZHRoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwbHlQYXJhbXMoZWRpdG9yKSB7XG4gICAgICAgIGxldCBlZGl0b3JQYXJhbXM6IGNvbW1vbk1vZHVsZS5Qcm9wZXJ0eUVkaXRvclBhcmFtcyA9IGVkaXRvci5wYXJhbXM7XG4gICAgICAgIGlmICghZWRpdG9yUGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLl9lZGl0b3JQYXJhbXMgPSBuZXcgamF2YS51dGlsLkhhc2hNYXAoKTtcbiAgICAgICAgaWYgKGVkaXRvclBhcmFtcy5taW5pbXVtKSB7XG4gICAgICAgICAgICBsZXQgbWluID0gbmV3IGphdmEubGFuZy5GbG9hdChlZGl0b3JQYXJhbXMubWluaW11bSk7XG4gICAgICAgICAgICBlZGl0b3IuX2VkaXRvclBhcmFtcy5wdXQoXCJtaW5pbXVtXCIsIG1pbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvclBhcmFtcy5tYXhpbXVtKSB7XG4gICAgICAgICAgICBsZXQgbWF4ID0gbmV3IGphdmEubGFuZy5GbG9hdChlZGl0b3JQYXJhbXMubWF4aW11bSk7XG4gICAgICAgICAgICBlZGl0b3IuX2VkaXRvclBhcmFtcy5wdXQoXCJtYXhpbXVtXCIsIG1heCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVkaXRvclBhcmFtcy5zdGVwKSB7XG4gICAgICAgICAgICBsZXQgc3RlcCA9IG5ldyBqYXZhLmxhbmcuRmxvYXQoZWRpdG9yUGFyYW1zLnN0ZXApO1xuICAgICAgICAgICAgZWRpdG9yLl9lZGl0b3JQYXJhbXMucHV0KFwic3RlcFwiLCBzdGVwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlZGl0b3IuYW5kcm9pZCkge1xuICAgICAgICAgICAgZWRpdG9yLmFuZHJvaWQuYXBwbHlQYXJhbXMoZWRpdG9yLmVkaXRvclBhcmFtcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwbHlTdHlsZShlZGl0b3IpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFRleHRDb2xvcihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsVGV4dENvbG9yKTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsRm9udChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsRm9udE5hbWUsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsRm9udFN0eWxlKTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsVGV4dFNpemUoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbFRleHRTaXplKTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsSG9yaXpvbnRhbE9mZnNldChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsSG9yaXpvbnRhbE9mZnNldCk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFZlcnRpY2FsT2Zmc2V0KGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxWZXJ0aWNhbE9mZnNldCk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JIb3Jpem9udGFsT2Zmc2V0KGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuZWRpdG9ySG9yaXpvbnRhbE9mZnNldCk7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JWZXJ0aWNhbE9mZnNldChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmVkaXRvclZlcnRpY2FsT2Zmc2V0KTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUVkaXRvckZpbGxDb2xvcihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmZpbGxDb2xvcik7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JTdHJva2UoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5zdHJva2VDb2xvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuc3Ryb2tlV2lkdGgsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmZpbGxDb2xvcik7XG4gICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbEhpZGRlbihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsSGlkZGVuKTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsUG9zaXRpb24oZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbFBvc2l0aW9uKTtcbiAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUxhYmVsV2lkdGgoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbFdpZHRoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYXBwbHlTdHlsZUZvclByb3BlcnR5KGVkaXRvcjogY29tbW9uTW9kdWxlLlByb3BlcnR5RWRpdG9yLCBwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgICAgICBpZiAoIWVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJsYWJlbFRleHRDb2xvclwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFRleHRDb2xvcihlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsVGV4dENvbG9yKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsYWJlbEZvbnROYW1lXCI6XG4gICAgICAgICAgICBjYXNlIFwibGFiZWxGb250U3R5bGVcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxGb250KGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxGb250TmFtZSwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxGb250U3R5bGUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsVGV4dFNpemVcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxUZXh0U2l6ZShlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsVGV4dFNpemUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsSG9yaXpvbnRhbE9mZnNldFwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbEhvcml6b250YWxPZmZzZXQoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbEhvcml6b250YWxPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhYmVsVmVydGljYWxPZmZzZXRcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxWZXJ0aWNhbE9mZnNldChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsVmVydGljYWxPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVkaXRvckhvcml6b250YWxPZmZzZXRcIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlRWRpdG9ySG9yaXpvbnRhbE9mZnNldChlZGl0b3IsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmVkaXRvckhvcml6b250YWxPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVkaXRvclZlcnRpY2FsT2Zmc2V0XCI6XG4gICAgICAgICAgICAgICAgUHJvcGVydHlFZGl0b3JIZWxwZXIuX3VwZGF0ZUVkaXRvclZlcnRpY2FsT2Zmc2V0KGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuZWRpdG9yVmVydGljYWxPZmZzZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImZpbGxDb2xvclwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JGaWxsQ29sb3IoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5maWxsQ29sb3IpO1xuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JTdHJva2UoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5zdHJva2VDb2xvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuc3Ryb2tlV2lkdGgsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmZpbGxDb2xvcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3Ryb2tlQ29sb3JcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdHJva2VXaWR0aFwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVFZGl0b3JTdHJva2UoZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5zdHJva2VDb2xvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUuc3Ryb2tlV2lkdGgsIGVkaXRvci5wcm9wZXJ0eUVkaXRvclN0eWxlLmZpbGxDb2xvcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFiZWxIaWRkZW5cIjpcbiAgICAgICAgICAgICAgICBQcm9wZXJ0eUVkaXRvckhlbHBlci5fdXBkYXRlTGFiZWxIaWRkZW4oZWRpdG9yLCBlZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbEhpZGRlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFiZWxQb3NpdGlvblwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFBvc2l0aW9uKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFiZWxXaWR0aFwiOlxuICAgICAgICAgICAgICAgIFByb3BlcnR5RWRpdG9ySGVscGVyLl91cGRhdGVMYWJlbFdpZHRoKGVkaXRvciwgZWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxXaWR0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgaXNSZWFkT25seShlZGl0b3IpIHtcbiAgICAgICAgaWYgKGVkaXRvciBpbnN0YW5jZW9mIEN1c3RvbVByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gKDxDdXN0b21Qcm9wZXJ0eUVkaXRvcj5lZGl0b3IpLl9yZWFkT25seTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKDxQcm9wZXJ0eUVkaXRvcj5lZGl0b3IpLl9yZWFkT25seTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0UmVhZE9ubHkoZWRpdG9yLCB2YWx1ZSkge1xuICAgICAgICBpZiAoZWRpdG9yIGluc3RhbmNlb2YgQ3VzdG9tUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgICAgICg8Q3VzdG9tUHJvcGVydHlFZGl0b3I+ZWRpdG9yKS5fcmVhZE9ubHkgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAoPFByb3BlcnR5RWRpdG9yPmVkaXRvcikuX3JlYWRPbmx5ID0gdmFsdWU7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBWYWxpZGF0b3JzXG5cbmludGVyZmFjZSBNYW51YWxWYWxpZGF0aW9uUHJvdmlkZXIge1xuICAgIG5ldyhvd25lcjogUHJvcGVydHlWYWxpZGF0b3IpOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlByb3BlcnR5VmFsaWRhdG9yTWFudWFsLlZhbGlkYXRpb25Qcm92aWRlcjtcbn1cblxubGV0IE1hbnVhbFZhbGlkYXRpb25Qcm92aWRlcjogTWFudWFsVmFsaWRhdGlvblByb3ZpZGVyO1xuXG5mdW5jdGlvbiBpbml0aWFsaXplVmFsaWRhdGlvblByb3ZpZGVycygpIHtcbiAgICBpZiAoIU1hbnVhbFZhbGlkYXRpb25Qcm92aWRlcikge1xuICAgICAgICBASW50ZXJmYWNlcyhbY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Qcm9wZXJ0eVZhbGlkYXRvck1hbnVhbC5WYWxpZGF0aW9uUHJvdmlkZXJdKVxuICAgICAgICBjbGFzcyBNYW51YWxWYWxpZGF0aW9uUHJvdmlkZXJJbXBsIGV4dGVuZHMgamF2YS5sYW5nLk9iamVjdCBpbXBsZW1lbnRzIGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuUHJvcGVydHlWYWxpZGF0b3JNYW51YWwuVmFsaWRhdGlvblByb3ZpZGVyIHtcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvd25lcjogUHJvcGVydHlWYWxpZGF0b3IpIHtcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbGlkYXRlKHZhbHVlOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3duZXIudmFsaWRhdGUodmFsdWUsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBNYW51YWxWYWxpZGF0aW9uUHJvdmlkZXIgPSBNYW51YWxWYWxpZGF0aW9uUHJvdmlkZXJJbXBsO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFByb3BlcnR5VmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLlByb3BlcnR5VmFsaWRhdG9yIHtcbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlByb3BlcnR5VmFsaWRhdG9yTWFudWFsO1xuICAgIHB1YmxpYyBnZXQgYW5kcm9pZCgpOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlByb3BlcnR5VmFsaWRhdG9yTWFudWFsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGluaXRpYWxpemVWYWxpZGF0aW9uUHJvdmlkZXJzKCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Qcm9wZXJ0eVZhbGlkYXRvck1hbnVhbCgpO1xuICAgICAgICAoPGFueT50aGlzLl9hbmRyb2lkKS5fbWFudWFsVmFsaWRhdGlvblByb3ZpZGVyID0gbmV3IE1hbnVhbFZhbGlkYXRpb25Qcm92aWRlcih0aGlzKTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRWYWxpZGF0aW9uUHJvdmlkZXIoKDxhbnk+dGhpcy5fYW5kcm9pZCkuX21hbnVhbFZhbGlkYXRpb25Qcm92aWRlcik7XG5cbiAgICAgICAgaWYgKHRoaXMuZXJyb3JNZXNzYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gXCJUaGlzIGlzIG5vdCB2YWxpZC5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkaXNwb3NlTmF0aXZlVmlldygpIHtcbiAgICAgICAgaWYgKCg8YW55PnRoaXMuX2FuZHJvaWQpLl9tYW51YWxWYWxpZGF0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuX2FuZHJvaWQpLl9tYW51YWxWYWxpZGF0aW9uUHJvdmlkZXIub3duZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmRpc3Bvc2VOYXRpdmVWaWV3KCk7XG4gICAgfVxuXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1pbmltdW1MZW5ndGhWYWxpZGF0b3IgZXh0ZW5kcyBjb21tb25Nb2R1bGUuTWluaW11bUxlbmd0aFZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLk1pbmltdW1MZW5ndGhWYWxpZGF0b3I7XG4gICAgcHVibGljIGdldCBhbmRyb2lkKCk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTWluaW11bUxlbmd0aFZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTWluaW11bUxlbmd0aFZhbGlkYXRvcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxlbmd0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXRNaW5pbXVtTGVuZ3RoKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1heGltdW1MZW5ndGhWYWxpZGF0b3IgZXh0ZW5kcyBjb21tb25Nb2R1bGUuTWF4aW11bUxlbmd0aFZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLk1heGltdW1MZW5ndGhWYWxpZGF0b3I7XG4gICAgcHVibGljIGdldCBhbmRyb2lkKCk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTWF4aW11bUxlbmd0aFZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTWF4aW11bUxlbmd0aFZhbGlkYXRvcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxlbmd0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAoIWlzTmFOKCtuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuYW5kcm9pZC5zZXRNYXhpbXVtTGVuZ3RoKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWRhdG9yIGV4dGVuZHMgY29tbW9uTW9kdWxlLkVtYWlsVmFsaWRhdG9yIHtcblxuICAgIHByaXZhdGUgX2FuZHJvaWQ6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTWFpbFZhbGlkYXRvcjtcbiAgICBwdWJsaWMgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5NYWlsVmFsaWRhdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5NYWlsVmFsaWRhdG9yKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgTm9uRW1wdHlWYWxpZGF0b3IgZXh0ZW5kcyBjb21tb25Nb2R1bGUuTm9uRW1wdHlWYWxpZGF0b3Ige1xuXG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Ob25FbXB0eVZhbGlkYXRvcjtcbiAgICBwdWJsaWMgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5Ob25FbXB0eVZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuTm9uRW1wdHlWYWxpZGF0b3IoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSYW5nZVZhbGlkYXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5SYW5nZVZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlJhbmdlVmFsaWRhdG9yO1xuICAgIHB1YmxpYyBnZXQgYW5kcm9pZCgpOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlJhbmdlVmFsaWRhdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5SYW5nZVZhbGlkYXRvcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1pbmltdW1DaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc05hTigrbmV3VmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9hbmRyb2lkLnNldE1pbihuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25NYXhpbXVtQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICghaXNOYU4oK25ld1ZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fYW5kcm9pZC5zZXRNYXgobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGhvbmVWYWxpZGF0b3IgZXh0ZW5kcyBjb21tb25Nb2R1bGUuUGhvbmVWYWxpZGF0b3Ige1xuXG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5QaG9uZVZhbGlkYXRvcjtcbiAgICBwdWJsaWMgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5QaG9uZVZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuUGhvbmVWYWxpZGF0b3IoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWdFeFZhbGlkYXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5SZWdFeFZhbGlkYXRvciB7XG5cbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlJlZ0V4VmFsaWRhdG9yO1xuICAgIHB1YmxpYyBnZXQgYW5kcm9pZCgpOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlJlZ0V4VmFsaWRhdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5SZWdFeFZhbGlkYXRvcigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblJlZ0V4Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQuc2V0UmVnRXgobmV3VmFsdWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIElzVHJ1ZVZhbGlkYXRvciBleHRlbmRzIGNvbW1vbk1vZHVsZS5Jc1RydWVWYWxpZGF0b3Ige1xuICAgIHByaXZhdGUgX2FuZHJvaWQ6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuSXNUcnVlVmFsaWRhdG9yO1xuICAgIHB1YmxpYyBnZXQgYW5kcm9pZCgpOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLklzVHJ1ZVZhbGlkYXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9hbmRyb2lkID0gbmV3IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuSXNUcnVlVmFsaWRhdG9yKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RyaW5nVG9EYXRlQ29udmVydGVyIGV4dGVuZHMgY29tbW9uTW9kdWxlLlN0cmluZ1RvRGF0ZUNvbnZlcnRlciB7XG4gICAgcHJpdmF0ZSBfYW5kcm9pZDogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5TdHJpbmdUb0RhdGVDb252ZXJ0ZXI7XG4gICAgcHVibGljIGdldCBhbmRyb2lkKCk6IGNvbS50ZWxlcmlrLndpZGdldC5kYXRhZm9ybS5lbmdpbmUuU3RyaW5nVG9EYXRlQ29udmVydGVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2FuZHJvaWQgPSBuZXcgY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5TdHJpbmdUb0RhdGVDb252ZXJ0ZXIoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdUb1RpbWVDb252ZXJ0ZXIgZXh0ZW5kcyBjb21tb25Nb2R1bGUuU3RyaW5nVG9UaW1lQ29udmVydGVyIHtcbiAgICBwcml2YXRlIF9hbmRyb2lkOiBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlN0cmluZ1RvVGltZUNvbnZlcnRlcjtcbiAgICBwdWJsaWMgZ2V0IGFuZHJvaWQoKTogY29tLnRlbGVyaWsud2lkZ2V0LmRhdGFmb3JtLmVuZ2luZS5TdHJpbmdUb1RpbWVDb252ZXJ0ZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBjb20udGVsZXJpay53aWRnZXQuZGF0YWZvcm0uZW5naW5lLlN0cmluZ1RvVGltZUNvbnZlcnRlcigpO1xuICAgIH1cbn1cbiJdfQ==