"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var view_2 = require("tns-core-modules/ui/core/view");
var enums = require("tns-core-modules/ui/enums");
var utils = require("tns-core-modules/utils/utils");
var color_1 = require("tns-core-modules/color");
var style_1 = require("tns-core-modules/ui/styling/style");
var nativescript_ui_autocomplete_1 = require("nativescript-ui-autocomplete");
var nativescript_ui_autocomplete_2 = require("nativescript-ui-autocomplete");
exports.AutoCompleteDisplayMode = nativescript_ui_autocomplete_2.AutoCompleteDisplayMode;
var knownCollections;
(function (knownCollections) {
    knownCollections.properties = "properties";
    knownCollections.groups = "groups";
    knownCollections.validators = "validators";
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
/*
* Lists the possible commit modes.
*/
var DataFormCommitMode;
(function (DataFormCommitMode) {
    DataFormCommitMode["Immediate"] = "Immediate";
    DataFormCommitMode["OnLostFocus"] = "OnLostFocus";
    DataFormCommitMode["Manual"] = "Manual";
})(DataFormCommitMode = exports.DataFormCommitMode || (exports.DataFormCommitMode = {}));
/*
* Lists the possible validation modes.
*/
var DataFormValidationMode;
(function (DataFormValidationMode) {
    DataFormValidationMode["Immediate"] = "Immediate";
    DataFormValidationMode["OnLostFocus"] = "OnLostFocus";
    DataFormValidationMode["Manual"] = "Manual";
})(DataFormValidationMode = exports.DataFormValidationMode || (exports.DataFormValidationMode = {}));
/*
* Lists the possible data form label position modes.
*/
var DataFormLabelPosition;
(function (DataFormLabelPosition) {
    DataFormLabelPosition["Left"] = "Left";
    DataFormLabelPosition["Top"] = "Top";
})(DataFormLabelPosition = exports.DataFormLabelPosition || (exports.DataFormLabelPosition = {}));
/*
* Lists the possible editors.
*/
var DataFormEditorType;
(function (DataFormEditorType) {
    DataFormEditorType["Text"] = "Text";
    DataFormEditorType["MultilineText"] = "MultilineText";
    DataFormEditorType["Email"] = "Email";
    DataFormEditorType["Password"] = "Password";
    DataFormEditorType["Phone"] = "Phone";
    DataFormEditorType["Decimal"] = "Decimal";
    DataFormEditorType["Number"] = "Number";
    DataFormEditorType["Switch"] = "Switch";
    DataFormEditorType["Stepper"] = "Stepper";
    DataFormEditorType["Slider"] = "Slider";
    DataFormEditorType["SegmentedEditor"] = "SegmentedEditor";
    DataFormEditorType["DatePicker"] = "DatePicker";
    DataFormEditorType["TimePicker"] = "TimePicker";
    DataFormEditorType["Picker"] = "Picker";
    DataFormEditorType["List"] = "List";
    DataFormEditorType["AutoCompleteInline"] = "AutoCompleteInline";
    DataFormEditorType["Label"] = "Label";
})(DataFormEditorType = exports.DataFormEditorType || (exports.DataFormEditorType = {}));
/**
 * Font styles
 */
var DataFormFontStyle;
(function (DataFormFontStyle) {
    DataFormFontStyle["Normal"] = "Normal";
    DataFormFontStyle["Bold"] = "Bold";
    DataFormFontStyle["Italic"] = "Italic";
    DataFormFontStyle["BoldItalic"] = "BoldItalic";
})(DataFormFontStyle = exports.DataFormFontStyle || (exports.DataFormFontStyle = {}));
/**
 * A class that provides common arguments of {@link RadDataForm} events.
 */
var DataFormEventData = /** @class */ (function () {
    function DataFormEventData() {
    }
    return DataFormEventData;
}());
exports.DataFormEventData = DataFormEventData;
/**
 * A class that provides common arguments of {@link CustomPropertyEditor} events.
 */
var DataFormCustomPropertyEditorEventData = /** @class */ (function () {
    function DataFormCustomPropertyEditorEventData() {
    }
    return DataFormCustomPropertyEditorEventData;
}());
exports.DataFormCustomPropertyEditorEventData = DataFormCustomPropertyEditorEventData;
///////////////////////////////////////////////////////////////////////////////
var RadDataForm = /** @class */ (function (_super) {
    __extends(RadDataForm, _super);
    function RadDataForm() {
        var _this = _super.call(this) || this;
        _this.on("bindingContextChange", _this.bindingContextChanged, _this);
        return _this;
    }
    RadDataForm.prototype.eachChild = function (callback) {
        var properties = this.properties;
        if (properties) {
            properties.forEach(function (item, i) {
                callback(item);
            });
        }
    };
    RadDataForm.prototype.disposeNativeView = function () {
        this.entityPropertyChangedHandler = undefined;
        this.groupPropertyChangedHandler = undefined;
        this.groupTitleStylePropertyChangedHandler = undefined;
        this.groupLayoutPropertyChangedHandler = undefined;
    };
    RadDataForm.prototype.notifyValidated = function (propertyName, result) {
    };
    RadDataForm.prototype.onIsReadOnlyPropertyChanged = function (oldValue, newValue) {
        this._onIsReadOnlyPropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.onValidationModePropertyChanged = function (oldValue, newValue) {
        this._onValidationModePropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.onCommitModePropertyChanged = function (oldValue, newValue) {
        this._onCommitModePropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.onSourcePropertyChanged = function (oldValue, newValue) {
        this._onSourcePropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.onMetadataPropertyChanged = function (oldValue, newValue) {
        this._onMetadataPropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.onGroupsPropertyChanged = function (oldValue, newValue) {
        this._onGroupsPropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.onPropertiesPropertyChanged = function (oldValue, newValue) {
        this._onPropertiesPropertyChanged(oldValue, newValue);
    };
    RadDataForm.prototype.bindingContextChanged = function (data) {
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].bindingContext = data.value;
                if (this.groups[i].properties) {
                    for (var j = 0; j < this.groups[i].properties.length; j++) {
                        var entityProperty = this.groups[i].properties[j];
                        entityProperty.bindingContext = data.value;
                    }
                }
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var entityProperty = this.properties[i];
                entityProperty.bindingContext = data.value;
            }
        }
    };
    RadDataForm.prototype._attachEntityPropertyPropertyChangeListener = function (property) {
        property.off('indexChange', this.entityPropertyChangedHandler);
        property.off('hiddenChange', this.entityPropertyChangedHandler);
        property.off('editorChange', this.entityPropertyChangedHandler);
        property.off('readOnlyChange', this.entityPropertyChangedHandler);
        property.off('hintTextChange', this.entityPropertyChangedHandler);
        property.off('displayNameChange', this.entityPropertyChangedHandler);
        property.off('valuesProviderChange', this.entityPropertyChangedHandler);
        property.on('indexChange', this.entityPropertyChangedHandler);
        property.on('hiddenChange', this.entityPropertyChangedHandler);
        property.on('editorChange', this.entityPropertyChangedHandler);
        property.on('readOnlyChange', this.entityPropertyChangedHandler);
        property.on('hintTextChange', this.entityPropertyChangedHandler);
        property.on('displayNameChange', this.entityPropertyChangedHandler);
        property.on('valuesProviderChange', this.entityPropertyChangedHandler);
    };
    RadDataForm.prototype._attachGroupLayoutChangeListener = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.off('orientationChange', this.groupLayoutPropertyChangedHandler);
        }
        if (newValue) {
            newValue.on('orientationChange', this.groupLayoutPropertyChangedHandler);
        }
    };
    RadDataForm.prototype._attachGroupTitleStyleChangeListener = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.off('strokeColorChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('strokeWidthChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('fillColorChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('separatorColorChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('labelTextColorChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('labelTextSizeChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('labelFontNameChange', this.groupTitleStylePropertyChangedHandler);
            oldValue.off('labelFontStyleChange', this.groupTitleStylePropertyChangedHandler);
        }
        if (newValue) {
            newValue.on('strokeColorChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('strokeWidthChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('fillColorChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('separatorColorChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('labelTextColorChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('labelTextSizeChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('labelFontNameChange', this.groupTitleStylePropertyChangedHandler);
            newValue.on('labelFontStyleChange', this.groupTitleStylePropertyChangedHandler);
        }
    };
    RadDataForm.prototype._attachGroupChangeListener = function (group) {
        group.off('layoutChange', this.groupPropertyChangedHandler);
        group.off('titleStyleChange', this.groupPropertyChangedHandler);
        group.off('hiddenChange', this.groupPropertyChangedHandler);
        group.off('nameChange', this.groupPropertyChangedHandler);
        group.off('collapsibleChange', this.groupPropertyChangedHandler);
        group.off('collapsedChange', this.groupPropertyChangedHandler);
        group.off('titleHiddenChange', this.groupPropertyChangedHandler);
        group.on('layoutChange', this.groupPropertyChangedHandler);
        group.on('titleStyleChange', this.groupPropertyChangedHandler);
        group.on('hiddenChange', this.groupPropertyChangedHandler);
        group.on('nameChange', this.groupPropertyChangedHandler);
        group.on('collapsibleChange', this.groupPropertyChangedHandler);
        group.on('collapsedChange', this.groupPropertyChangedHandler);
        group.on('titleHiddenChange', this.groupPropertyChangedHandler);
        this._attachGroupLayoutChangeListener(undefined, group.layout);
        this._attachGroupTitleStyleChangeListener(undefined, group.titleStyle);
    };
    RadDataForm.prototype._onIsReadOnlyPropertyChanged = function (oldValue, newValue) { };
    RadDataForm.prototype._onCommitModePropertyChanged = function (oldValue, newValue) { };
    RadDataForm.prototype._onValidationModePropertyChanged = function (oldValue, newValue) { };
    RadDataForm.prototype._onSourcePropertyChanged = function (oldValue, newValue) { };
    RadDataForm.prototype._onMetadataPropertyChanged = function (oldValue, newValue) { };
    RadDataForm.prototype._onGroupsPropertyChanged = function (oldValue, newValue) { };
    RadDataForm.prototype._onPropertiesPropertyChanged = function (oldValue, newValue) { };
    Object.defineProperty(RadDataForm.prototype, "editedObject", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    RadDataForm.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "groups") {
            this.groups = value;
        }
        if (name === "properties") {
            this.properties = value;
        }
    };
    RadDataForm.prototype.getPropertyByName = function (propertyName) {
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].properties) {
                    for (var j = 0; j < this.groups[i].properties.length; j++) {
                        var entityProperty = this.groups[i].properties[j];
                        if (entityProperty.name === propertyName) {
                            return entityProperty;
                        }
                    }
                }
            }
        }
        if (this.properties) {
            for (var i = 0; i < this.properties.length; i++) {
                var entityProperty = this.properties[i];
                if (entityProperty.name === propertyName) {
                    return entityProperty;
                }
            }
        }
        return null;
    };
    RadDataForm.prototype.getGroupByName = function (groupName) {
        if (this.groups) {
            for (var i = 0; i < this.groups.length; i++) {
                if (groupName === this.groups[i].name) {
                    return this.groups[i];
                }
            }
        }
        return null;
    };
    RadDataForm.prototype.reload = function () { };
    RadDataForm.prototype.validateAll = function () { return null; };
    RadDataForm.prototype.validateAndCommitAll = function () { return null; };
    RadDataForm.prototype.commitAll = function () { };
    RadDataForm.editorSelectedEvent = "editorSelected";
    RadDataForm.editorDeselectedEvent = "editorDeselected";
    RadDataForm.propertyEditedEvent = "propertyEdited";
    RadDataForm.propertyValidateEvent = "propertyValidate";
    RadDataForm.propertyValidatedEvent = "propertyValidated";
    RadDataForm.editorSetupEvent = "editorSetup";
    RadDataForm.editorUpdateEvent = "editorUpdate";
    RadDataForm.groupUpdateEvent = "groupUpdate";
    RadDataForm.propertyCommitEvent = "propertyCommit";
    RadDataForm.propertyCommittedEvent = "propertyCommitted";
    RadDataForm.groupExpandedEvent = "groupExpanded";
    RadDataForm.groupCollapsedEvent = "groupCollapsed";
    RadDataForm.isReadOnlyProperty = new view_1.Property({
        name: "isReadOnly",
        defaultValue: undefined,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onIsReadOnlyPropertyChanged(oldValue, newValue);
        },
    });
    RadDataForm.commitModeProperty = new view_1.Property({
        name: "commitMode",
        defaultValue: DataFormCommitMode.Immediate,
        valueConverter: function (value) { return DataFormCommitMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onCommitModePropertyChanged(oldValue, newValue);
        },
    });
    RadDataForm.validationModeProperty = new view_1.Property({
        name: "validationMode",
        defaultValue: DataFormValidationMode.Immediate,
        valueConverter: function (value) { return DataFormValidationMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onValidationModePropertyChanged(oldValue, newValue);
        },
    });
    RadDataForm.sourceProperty = new view_1.Property({
        name: "source",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onSourcePropertyChanged(oldValue, newValue);
        },
    });
    RadDataForm.metadataProperty = new view_1.Property({
        name: "metadata",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onMetadataPropertyChanged(oldValue, newValue);
        },
    });
    RadDataForm.groupsProperty = new view_1.Property({
        name: "groups",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onGroupsPropertyChanged(oldValue, newValue);
        },
    });
    RadDataForm.propertiesProperty = new view_1.Property({
        name: "properties",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPropertiesPropertyChanged(oldValue, newValue);
        },
    });
    return RadDataForm;
}(view_1.View));
exports.RadDataForm = RadDataForm;
RadDataForm.isReadOnlyProperty.register(RadDataForm);
RadDataForm.commitModeProperty.register(RadDataForm);
RadDataForm.validationModeProperty.register(RadDataForm);
RadDataForm.sourceProperty.register(RadDataForm);
RadDataForm.metadataProperty.register(RadDataForm);
RadDataForm.groupsProperty.register(RadDataForm);
RadDataForm.propertiesProperty.register(RadDataForm);
///////////////////////////////////////////////////////////////////////////////
var PropertyGroup = /** @class */ (function (_super) {
    __extends(PropertyGroup, _super);
    function PropertyGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyGroup.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "properties") {
            this.properties = value;
        }
    };
    PropertyGroup.prototype.onNamePropertyChanged = function (oldValue, newValue) {
        this.onNameChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onHiddenPropertyChanged = function (oldValue, newValue) {
        this.onHiddenChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onTitleHiddenPropertyChanged = function (oldValue, newValue) {
        this.onTitleHiddenChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onCollapsiblePropertyChanged = function (oldValue, newValue) {
        this.onCollapsibleChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onCollapsedPropertyChanged = function (oldValue, newValue) {
        this.onCollapsedChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onTitleStylePropertyChanged = function (oldValue, newValue) {
        this.onTitleStyleChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onPropertiesPropertyChanged = function (oldValue, newValue) {
        this.onPropertiesChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onLayoutPropertyChanged = function (oldValue, newValue) {
        this.onLayoutChanged(oldValue, newValue);
    };
    PropertyGroup.prototype.onNameChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onHiddenChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onTitleHiddenChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onCollapsibleChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onCollapsedChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onTitleStyleChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onPropertiesChanged = function (oldValue, newValue) {
    };
    PropertyGroup.prototype.onLayoutChanged = function (oldValue, newValue) {
    };
    PropertyGroup.nameProperty = new view_1.Property({
        name: "name",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onNamePropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.hiddenProperty = new view_1.Property({
        name: "hidden",
        defaultValue: false,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onHiddenPropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.titleHiddenProperty = new view_1.Property({
        name: "titleHidden",
        defaultValue: false,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onTitleHiddenPropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.collapsibleProperty = new view_1.Property({
        name: "collapsible",
        defaultValue: false,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onCollapsiblePropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.collapsedProperty = new view_1.Property({
        name: "collapsed",
        defaultValue: false,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onCollapsedPropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.titleStyleProperty = new view_1.Property({
        name: "titleStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onTitleStylePropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.propertiesProperty = new view_1.Property({
        name: "properties",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPropertiesPropertyChanged(oldValue, newValue);
        },
    });
    PropertyGroup.layoutProperty = new view_1.Property({
        name: "layout",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLayoutPropertyChanged(oldValue, newValue);
        },
    });
    return PropertyGroup;
}(view_1.ViewBase));
exports.PropertyGroup = PropertyGroup;
PropertyGroup.nameProperty.register(PropertyGroup);
PropertyGroup.hiddenProperty.register(PropertyGroup);
PropertyGroup.titleHiddenProperty.register(PropertyGroup);
PropertyGroup.collapsibleProperty.register(PropertyGroup);
PropertyGroup.collapsedProperty.register(PropertyGroup);
PropertyGroup.titleStyleProperty.register(PropertyGroup);
PropertyGroup.propertiesProperty.register(PropertyGroup);
PropertyGroup.layoutProperty.register(PropertyGroup);
///////////////////////////////////////////////////////////////////////////////
var PropertyEditorParams = /** @class */ (function (_super) {
    __extends(PropertyEditorParams, _super);
    function PropertyEditorParams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyEditorParams.prototype.onMinimumPropertyChanged = function (oldValue, newValue) {
        this.onMinimumChanged(oldValue, newValue);
    };
    PropertyEditorParams.prototype.onMaximumPropertyChanged = function (oldValue, newValue) {
        this.onMaximumChanged(oldValue, newValue);
    };
    PropertyEditorParams.prototype.onStepPropertyChanged = function (oldValue, newValue) {
        this.onStepChanged(oldValue, newValue);
    };
    PropertyEditorParams.prototype.onMinimumChanged = function (oldValue, newValue) {
    };
    PropertyEditorParams.prototype.onMaximumChanged = function (oldValue, newValue) {
    };
    PropertyEditorParams.prototype.onStepChanged = function (oldValue, newValue) {
    };
    PropertyEditorParams.minimumProperty = new view_1.Property({
        name: "minimum",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMinimumPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorParams.maximumProperty = new view_1.Property({
        name: "maximum",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMaximumPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorParams.stepProperty = new view_1.Property({
        name: "step",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onStepPropertyChanged(oldValue, newValue);
        },
    });
    return PropertyEditorParams;
}(view_1.ViewBase));
exports.PropertyEditorParams = PropertyEditorParams;
PropertyEditorParams.minimumProperty.register(PropertyEditorParams);
PropertyEditorParams.maximumProperty.register(PropertyEditorParams);
PropertyEditorParams.stepProperty.register(PropertyEditorParams);
///////////////////////////////////////////////////////////////////////////////
var DataFormStyleBase = /** @class */ (function (_super) {
    __extends(DataFormStyleBase, _super);
    function DataFormStyleBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataFormStyleBase.prototype.onStrokeColorPropertyChanged = function (oldValue, newValue) {
        this.onStrokeColorChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onStrokeColorChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onStrokeWidthPropertyChanged = function (oldValue, newValue) {
        this.onStrokeWidthChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onStrokeWidthChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onFillColorPropertyChanged = function (oldValue, newValue) {
        this.onFillColorChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onFillColorChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onSeparatorColorPropertyChanged = function (oldValue, newValue) {
        this.onSeparatorColorChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onSeparatorColorChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onLabelTextColorPropertyChanged = function (oldValue, newValue) {
        this.onLabelTextColorChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onLabelTextColorChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onLabelTextSizePropertyChanged = function (oldValue, newValue) {
        this.onLabelTextSizeChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onLabelTextSizeChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onLabelFontNamePropertyChanged = function (oldValue, newValue) {
        this.onLabelFontNameChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onLabelFontNameChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.prototype.onLabelFontStylePropertyChanged = function (oldValue, newValue) {
        this.onLabelFontStyleChanged(oldValue, newValue);
    };
    DataFormStyleBase.prototype.onLabelFontStyleChanged = function (oldValue, newValue) {
    };
    DataFormStyleBase.strokeColorProperty = new view_1.Property({
        name: "strokeColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onStrokeColorPropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.strokeWidthProperty = new view_1.Property({
        name: "strokeWidth",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onStrokeWidthPropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.fillColorProperty = new view_1.Property({
        name: "fillColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onFillColorPropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.separatorColorProperty = new view_1.Property({
        name: "separatorColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onSeparatorColorPropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.labelTextColorProperty = new view_1.Property({
        name: "labelTextColor",
        defaultValue: undefined,
        equalityComparer: color_1.Color.equals,
        valueConverter: function (v) { return new color_1.Color(v); },
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelTextColorPropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.labelTextSizeProperty = new view_1.Property({
        name: "labelTextSize",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelTextSizePropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.labelFontNameProperty = new view_1.Property({
        name: "labelFontName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelFontNamePropertyChanged(oldValue, newValue);
        },
    });
    DataFormStyleBase.labelFontStyleProperty = new view_1.Property({
        name: "labelFontStyle",
        defaultValue: undefined,
        valueConverter: function (value) { return DataFormFontStyle[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelFontStylePropertyChanged(oldValue, newValue);
        },
    });
    return DataFormStyleBase;
}(view_1.ViewBase));
exports.DataFormStyleBase = DataFormStyleBase;
DataFormStyleBase.strokeColorProperty.register(DataFormStyleBase);
DataFormStyleBase.strokeWidthProperty.register(DataFormStyleBase);
DataFormStyleBase.fillColorProperty.register(DataFormStyleBase);
DataFormStyleBase.separatorColorProperty.register(DataFormStyleBase);
DataFormStyleBase.labelTextColorProperty.register(DataFormStyleBase);
DataFormStyleBase.labelTextSizeProperty.register(DataFormStyleBase);
DataFormStyleBase.labelFontNameProperty.register(DataFormStyleBase);
DataFormStyleBase.labelFontStyleProperty.register(DataFormStyleBase);
// todo: add properties for separator Leading/Trailing Space , insets
var GroupTitleStyle = /** @class */ (function (_super) {
    __extends(GroupTitleStyle, _super);
    function GroupTitleStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GroupTitleStyle;
}(DataFormStyleBase));
exports.GroupTitleStyle = GroupTitleStyle;
// declare class TKDataFormEditorStyle extends NSObject {
// from base class:
// 	stroke: TKStroke;
// 	fill: TKFill;
// 	separatorColor: TKFill;
// implemented
// 	editorOffset: UIOffset;
// 	textLabelOffset: UIOffset;
// 	textLabelDisplayMode: TKDataFormEditorTextLabelDisplayMode;
// todo: add required properties
// 	accessoryArrowSize: CGSize; //ios specific
// 	accessoryArrowStroke: TKStroke; //ios specific
// 	feedbackImageViewOffset: UIOffset;
// 	feedbackLabelOffset: UIOffset;
// 	imageViewOffset: UIOffset; //add when image view is added as feature
// 	insets: UIEdgeInsets;
// 	separatorLeadingSpace: number; //iOS specific
// 	separatorTrailingSpace: number; //iOS specific
// }
var PropertyEditorStyle = /** @class */ (function (_super) {
    __extends(PropertyEditorStyle, _super);
    function PropertyEditorStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertyEditorStyle.prototype.onEditorHorizontalOffsetPropertyChanged = function (oldValue, newValue) {
        this.onEditorHorizontalOffsetChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onEditorHorizontalOffsetChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.prototype.onEditorVerticalOffsetPropertyChanged = function (oldValue, newValue) {
        this.onEditorVerticalOffsetChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onEditorVerticalOffsetChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.prototype.onLabelHorizontalOffsetPropertyChanged = function (oldValue, newValue) {
        this.onLabelHorizontalOffsetChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onLabelHorizontalOffsetChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.prototype.onLabelVerticalOffsetPropertyChanged = function (oldValue, newValue) {
        this.onLabelVerticalOffsetChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onLabelVerticalOffsetChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.prototype.onLabelHiddenPropertyChanged = function (oldValue, newValue) {
        this.onLabelHiddenChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onLabelHiddenChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.prototype.onLabelPositionPropertyChanged = function (oldValue, newValue) {
        this.onLabelPositionChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onLabelPositionChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.prototype.onLabelWidthPropertyChanged = function (oldValue, newValue) {
        this.onLabelWidthChanged(oldValue, newValue);
    };
    PropertyEditorStyle.prototype.onLabelWidthChanged = function (oldValue, newValue) {
    };
    PropertyEditorStyle.editorHorizontalOffsetProperty = new view_1.Property({
        name: "editorHorizontalOffset",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onEditorHorizontalOffsetPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorStyle.editorVerticalOffsetProperty = new view_1.Property({
        name: "editorVerticalOffset",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onEditorVerticalOffsetPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorStyle.labelHorizontalOffsetProperty = new view_1.Property({
        name: "labelHorizontalOffset",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelHorizontalOffsetPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorStyle.labelVerticalOffsetProperty = new view_1.Property({
        name: "labelVerticalOffset",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelVerticalOffsetPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorStyle.labelHiddenProperty = new view_1.Property({
        name: "labelHidden",
        defaultValue: undefined,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelHiddenPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorStyle.labelPositionProperty = new view_1.Property({
        name: "labelPosition",
        defaultValue: undefined,
        valueConverter: function (value) { return DataFormLabelPosition[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelPositionPropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditorStyle.labelWidthProperty = new view_1.Property({
        name: "labelWidth",
        defaultValue: -1,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onLabelWidthPropertyChanged(oldValue, newValue);
        },
    });
    return PropertyEditorStyle;
}(DataFormStyleBase));
exports.PropertyEditorStyle = PropertyEditorStyle;
PropertyEditorStyle.editorHorizontalOffsetProperty.register(PropertyEditorStyle);
PropertyEditorStyle.editorVerticalOffsetProperty.register(PropertyEditorStyle);
PropertyEditorStyle.labelHorizontalOffsetProperty.register(PropertyEditorStyle);
PropertyEditorStyle.labelVerticalOffsetProperty.register(PropertyEditorStyle);
PropertyEditorStyle.labelHiddenProperty.register(PropertyEditorStyle);
PropertyEditorStyle.labelPositionProperty.register(PropertyEditorStyle);
PropertyEditorStyle.labelWidthProperty.register(PropertyEditorStyle);
////////////////////////////////////////////////////////////////////
// name : the name of bound entity property
// displayName  : the label to be shown for editor
// index : the index in group
// hidden : boolean for show/hide of editor
// readOnly : boolean , read only state
// required : boolean , if the value is required. Note: consider to move this to validator
// hintText : string, the gray text shown as hint in empty editor
// editor : PropertyEditor derived instance with specific properties for editors
// valuesProvider : an array or comma separated string with values used by some editors
// converter : PropertyConverter derived instance with specific properties for data conversion
// validator : PropertyValidator
///////////////////////////////////////////////////////////////////////////////
var EntityProperty = /** @class */ (function (_super) {
    __extends(EntityProperty, _super);
    function EntityProperty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.namePropertySilentUpdate = false;
        _this.errorMessage = "This is not valid.";
        return _this;
    }
    Object.defineProperty(EntityProperty.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "value", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "valueCandidate", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityProperty.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    EntityProperty.prototype.onEditorPropertyChanged = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.off('typeChange');
        }
        if (newValue) {
            var typeChangeFunction = function (propertyChangeData) {
                if (this) {
                    this.onEditorTypeChanged();
                }
            };
            newValue.on('typeChange', typeChangeFunction.bind(this));
        }
        this.onEditorChanged(oldValue, newValue);
    };
    EntityProperty.prototype.eachChild = function (callback) {
        if (this.editor) {
            callback(this.editor);
        }
    };
    EntityProperty.prototype.onEditorTypeChanged = function () {
        this.updateNativeEditor(this.editor);
    };
    EntityProperty.prototype.onValidatorsPropertyChanged = function (oldValue, newValue) {
        this.onValidatorsChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onConverterPropertyChanged = function (oldValue, newValue) {
        this.onConverterChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onValuesProviderPropertyChanged = function (oldValue, newValue) {
        this.onValuesProviderChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onAutoCompleteDisplayModePropertyChanged = function (oldValue, newValue) {
        this.onAutoCompleteDisplayModeChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onNamePropertyChanged = function (oldValue, newValue) {
        if (this.namePropertySilentUpdate) {
            this.namePropertySilentUpdate = false;
            return;
        }
        if (oldValue == null) {
            this.onNameChanged(oldValue, newValue);
        }
        else {
            this.namePropertySilentUpdate = true;
            this.name = oldValue;
            console.log("Warring: EntityProperty's name is already set and can't be changed.");
        }
    };
    EntityProperty.prototype.onDisplayNamePropertyChanged = function (oldValue, newValue) {
        this.onDisplayNameChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onIndexPropertyChanged = function (oldValue, newValue) {
        this.onIndexChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onColumnIndexPropertyChanged = function (oldValue, newValue) {
        this.onColumnIndexChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onHiddenPropertyChanged = function (oldValue, newValue) {
        this.onHiddenChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onReadOnlyPropertyChanged = function (oldValue, newValue) {
        this.onReadOnlyChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onRequiredPropertyChanged = function (oldValue, newValue) {
        this.onRequiredChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onHintTextPropertyChanged = function (oldValue, newValue) {
        this.onHintTextChanged(oldValue, newValue);
    };
    EntityProperty.prototype.onImageResourcePropertyChanged = function (oldValue, newValue) {
        this.onImageResourceChanged(oldValue, newValue);
    };
    EntityProperty.prototype._addArrayFromBuilder = function (name, value) {
        if (name === "validators") {
            this.validators = value;
        }
    };
    EntityProperty.prototype.onEditorChanged = function (oldValue, newValue) {
        if (newValue instanceof PropertyEditor) {
            this.updateNativeEditor(newValue);
        }
    };
    EntityProperty.prototype.onValidatorsChanged = function (oldValue, newValue) {
        if (newValue && newValue instanceof Array) {
            this.updateNativeValidators(newValue);
        }
    };
    EntityProperty.prototype.onConverterChanged = function (oldValue, newValue) {
        if (newValue) {
            this.updateNativeConverter(newValue);
        }
    };
    EntityProperty.prototype.onValuesProviderChanged = function (oldValue, newValue) {
        if (newValue) {
            var simplifiedArray = void 0;
            if (newValue instanceof Map) {
                simplifiedArray = Array.from(newValue.values());
                this._setupConverterWith(null, null, newValue);
            }
            else if (this._containsItemsArray(newValue)) {
                var keyProperty = this._getKeyProperty(this.valuesProvider);
                var labelProperty_1 = this._getLabelProperty(this.valuesProvider);
                simplifiedArray = newValue.items.map(function (item) { return item[labelProperty_1]; });
                this._setupConverterWith(keyProperty, labelProperty_1, newValue.items);
            }
            else if (this._isKeyLabelsArray(newValue)) {
                simplifiedArray = newValue.map(function (item) { return item["label"]; });
                this._setupConverterWith("key", "label", newValue);
            }
            else if (typeof newValue === "string") {
                simplifiedArray = newValue.split(',');
            }
            else {
                simplifiedArray = newValue;
            }
            this.valuesProviderArray = simplifiedArray;
            this.updateNativeValuesProvider(simplifiedArray);
        }
    };
    EntityProperty.prototype._setupConverterWith = function (key, label, items) {
        var converter;
        if (items instanceof Map) {
            converter = new ValuesProviderMapConverter(items);
        }
        else {
            converter = new ValuesProviderArrayConverter(key, label, items);
        }
        this.converter = converter;
    };
    EntityProperty.prototype._containsItemsArray = function (value) {
        if (value.hasOwnProperty("items")) {
            if (value["items"] instanceof Array) {
                return true;
            }
        }
        return false;
    };
    EntityProperty.prototype._isKeyLabelsArray = function (value) {
        if (value instanceof Array) {
            if (value.length > 0) {
                var item = value[0];
                if (item.hasOwnProperty("key") &&
                    (item.hasOwnProperty("label"))) {
                    return true;
                }
            }
        }
        return false;
    };
    EntityProperty.prototype._getKeyProperty = function (value) {
        if (value.hasOwnProperty("key")) {
            return value["key"];
        }
        if (value.hasOwnProperty("keyProperty")) {
            return value["keyProperty"];
        }
        return "key";
    };
    EntityProperty.prototype._getLabelProperty = function (value) {
        if (value.hasOwnProperty("label")) {
            return value["label"];
        }
        if (value.hasOwnProperty("labelProperty")) {
            return value["labelProperty"];
        }
        return "label";
    };
    EntityProperty.prototype.onAutoCompleteDisplayModeChanged = function (oldValue, newValue) {
        if (newValue) {
            this.updateNativeAutoCompleteDisplayMode(newValue);
        }
    };
    EntityProperty.prototype.onNameChanged = function (oldValue, newValue) {
    };
    EntityProperty.prototype.onDisplayNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.updateNativeDisplayName(newValue);
        }
    };
    EntityProperty.prototype.onIndexChanged = function (oldValue, newValue) {
        if (!isNaN(newValue)) {
            this.updateNativeIndex(newValue);
        }
    };
    EntityProperty.prototype.onColumnIndexChanged = function (oldValue, newValue) {
        if (!isNaN(newValue)) {
            this.updateNativeColumnIndex(newValue);
        }
    };
    EntityProperty.prototype.onHiddenChanged = function (oldValue, newValue) {
        this.updateNativeHidden(newValue);
    };
    EntityProperty.prototype.onReadOnlyChanged = function (oldValue, newValue) {
        this.updateNativeReadOnly(newValue);
    };
    EntityProperty.prototype.onRequiredChanged = function (oldValue, newValue) {
        this.updateNativeRequired(newValue);
    };
    EntityProperty.prototype.onHintTextChanged = function (oldValue, newValue) {
        this.updateNativeHintText(newValue);
    };
    EntityProperty.prototype.onImageResourceChanged = function (oldValue, newValue) {
        if (this.imageResource != null) {
            if (this.imageResource.indexOf(utils.RESOURCE_PREFIX) === 0) {
                this.imageResource = this.imageResource.substr(utils.RESOURCE_PREFIX.length);
                return;
            }
        }
        this.updateNativeImageResource(this.imageResource);
    };
    EntityProperty.prototype.updateNativeEditor = function (value) {
    };
    EntityProperty.prototype.updateNativeValidators = function (value) {
    };
    EntityProperty.prototype.updateNativeConverter = function (value) {
    };
    EntityProperty.prototype.updateNativeValuesProvider = function (value) {
    };
    EntityProperty.prototype.updateNativeAutoCompleteDisplayMode = function (value) {
    };
    EntityProperty.prototype.updateNativeDisplayName = function (value) {
    };
    EntityProperty.prototype.updateNativeIndex = function (value) {
    };
    EntityProperty.prototype.updateNativeColumnIndex = function (value) {
    };
    EntityProperty.prototype.updateNativeHidden = function (value) {
    };
    EntityProperty.prototype.updateNativeReadOnly = function (value) {
    };
    EntityProperty.prototype.updateNativeRequired = function (value) {
    };
    EntityProperty.prototype.updateNativeHintText = function (value) {
    };
    EntityProperty.prototype.updateNativeImageResource = function (value) {
    };
    EntityProperty.editorProperty = new view_1.Property({
        name: "editor",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onEditorPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.validatorsProperty = new view_1.Property({
        name: "validators",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onValidatorsPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.converterProperty = new view_1.Property({
        name: "converter",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onConverterPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.valuesProviderProperty = new view_1.Property({
        name: "valuesProvider",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onValuesProviderPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.autoCompleteDisplayModeProperty = new view_1.Property({
        name: "autoCompleteDisplayMode",
        defaultValue: undefined,
        valueConverter: function (value) { return nativescript_ui_autocomplete_1.AutoCompleteDisplayMode[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onAutoCompleteDisplayModePropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.nameProperty = new view_1.Property({
        name: "name",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onNamePropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.displayNameProperty = new view_1.Property({
        name: "displayName",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onDisplayNamePropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.indexProperty = new view_1.Property({
        name: "index",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onIndexPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.columnIndexProperty = new view_1.Property({
        name: "columnIndex",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onColumnIndexPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.hiddenProperty = new view_1.Property({
        name: "hidden",
        defaultValue: undefined,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onHiddenPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.readOnlyProperty = new view_1.Property({
        name: "readOnly",
        defaultValue: undefined,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onReadOnlyPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.requiredProperty = new view_1.Property({
        name: "required",
        defaultValue: undefined,
        valueConverter: view_2.booleanConverter,
        valueChanged: function (target, oldValue, newValue) {
            target.onRequiredPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.hintTextProperty = new view_1.Property({
        name: "hintText",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onHintTextPropertyChanged(oldValue, newValue);
        },
    });
    EntityProperty.imageResourceProperty = new view_1.Property({
        name: "imageResource",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onImageResourcePropertyChanged(oldValue, newValue);
        },
    });
    return EntityProperty;
}(view_1.View));
exports.EntityProperty = EntityProperty;
EntityProperty.editorProperty.register(EntityProperty);
EntityProperty.validatorsProperty.register(EntityProperty);
EntityProperty.converterProperty.register(EntityProperty);
EntityProperty.valuesProviderProperty.register(EntityProperty);
EntityProperty.autoCompleteDisplayModeProperty.register(EntityProperty);
EntityProperty.nameProperty.register(EntityProperty);
EntityProperty.displayNameProperty.register(EntityProperty);
EntityProperty.indexProperty.register(EntityProperty);
EntityProperty.columnIndexProperty.register(EntityProperty);
EntityProperty.hiddenProperty.register(EntityProperty);
EntityProperty.readOnlyProperty.register(EntityProperty);
EntityProperty.requiredProperty.register(EntityProperty);
EntityProperty.hintTextProperty.register(EntityProperty);
EntityProperty.imageResourceProperty.register(EntityProperty);
var DataFormEditorLabel = /** @class */ (function (_super) {
    __extends(DataFormEditorLabel, _super);
    function DataFormEditorLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataFormEditorLabel.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormEditorLabel.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return DataFormEditorLabel;
}(view_1.View));
exports.DataFormEditorLabel = DataFormEditorLabel;
var DataFormEditorCore = /** @class */ (function (_super) {
    __extends(DataFormEditorCore, _super);
    function DataFormEditorCore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataFormEditorCore.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFormEditorCore.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    return DataFormEditorCore;
}(view_1.View));
exports.DataFormEditorCore = DataFormEditorCore;
//////////////////////////////////////////////////////
// type : tye type of the editor to be used for this property
// style : EditorStyle instance
// todo: extend with common editor properties
var PropertyEditor = /** @class */ (function (_super) {
    __extends(PropertyEditor, _super);
    function PropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PropertyEditor.prototype, "editorCore", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "label", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyEditor.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    PropertyEditor.prototype.eachChild = function (callback) {
        if (this.label && this.editorCore) {
            callback(this.label);
            callback(this.editorCore);
        }
    };
    PropertyEditor.prototype.onTypePropertyChanged = function (oldValue, newValue) {
        this.onTypeChanged(oldValue, newValue);
    };
    PropertyEditor.prototype.onPropertyEditorStylePropertyChanged = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.off('editorHorizontalOffsetChange');
            oldValue.off('editorVerticalOffsetChange');
            oldValue.off('labelHorizontalOffsetChange');
            oldValue.off('labelVerticalOffsetChange');
            oldValue.off('labelHiddenChange');
            oldValue.off('labelPositionChange');
            oldValue.off('labelWidthChange');
            oldValue.off('strokeColorChange');
            oldValue.off('strokeWidthChange');
            oldValue.off('fillColorChange');
            oldValue.off('separatorColorChange');
            oldValue.off('labelTextColorChange');
            oldValue.off('labelTextSizeChange');
            oldValue.off('labelFontNameChange');
            oldValue.off('labelFontStyleChange');
        }
        if (newValue) {
            var changeHandler = (function (propertyChangeData) {
                if (this) {
                    this.onStylePropertyChanged(propertyChangeData.propertyName);
                }
            }).bind(this);
            newValue.on('editorHorizontalOffsetChange', changeHandler);
            newValue.on('editorVerticalOffsetChange', changeHandler);
            newValue.on('labelHorizontalOffsetChange', changeHandler);
            newValue.on('labelVerticalOffsetChange', changeHandler);
            newValue.on('labelHiddenChange', changeHandler);
            newValue.on('labelPositionChange', changeHandler);
            newValue.on('labelWidthChange', changeHandler);
            newValue.on('strokeColorChange', changeHandler);
            newValue.on('strokeWidthChange', changeHandler);
            newValue.on('fillColorChange', changeHandler);
            newValue.on('separatorColorChange', changeHandler);
            newValue.on('labelTextColorChange', changeHandler);
            newValue.on('labelTextSizeChange', changeHandler);
            newValue.on('labelFontNameChange', changeHandler);
            newValue.on('labelFontStyleChange', changeHandler);
        }
        this.onPropertyEditorStyleChanged(oldValue, newValue);
    };
    PropertyEditor.prototype.onParamsPropertyInternalChanged = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.off('minimumChange');
            oldValue.off('maximumChange');
            oldValue.off('stepChange');
        }
        if (newValue) {
            var changeHandler = (function (propertyChangeData) {
                if (this) {
                    this.onParamsPropertyChanged(propertyChangeData.propertyName);
                }
            }).bind(this);
            newValue.on('minimumChange', changeHandler);
            newValue.on('maximumChange', changeHandler);
            newValue.on('stepChange', changeHandler);
        }
        this.onParamsChanged(oldValue, newValue);
    };
    PropertyEditor.prototype.onStylePropertyChanged = function (propertyName) {
    };
    PropertyEditor.prototype.onParamsPropertyChanged = function (propertyName) {
    };
    PropertyEditor.prototype.onTypeChanged = function (oldValue, newValue) {
    };
    PropertyEditor.prototype.onPropertyEditorStyleChanged = function (oldValue, newValue) {
    };
    PropertyEditor.prototype.onParamsChanged = function (oldValue, newValue) {
    };
    PropertyEditor.typeProperty = new view_1.Property({
        name: "type",
        defaultValue: undefined,
        valueConverter: function (value) { return DataFormEditorType[value]; },
        valueChanged: function (target, oldValue, newValue) {
            target.onTypePropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditor.propertyEditorStyleProperty = new view_1.Property({
        name: "propertyEditorStyle",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onPropertyEditorStylePropertyChanged(oldValue, newValue);
        },
    });
    PropertyEditor.paramsProperty = new view_1.Property({
        name: "params",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onParamsPropertyInternalChanged(oldValue, newValue);
        },
    });
    PropertyEditor.positionProperty = new view_1.CssProperty({ name: "position", cssName: "position" });
    PropertyEditor.separatorColorProperty = new view_1.CssProperty({ name: "separatorColor", cssName: "separator-color" });
    return PropertyEditor;
}(view_1.View));
exports.PropertyEditor = PropertyEditor;
PropertyEditor.typeProperty.register(PropertyEditor);
PropertyEditor.propertyEditorStyleProperty.register(PropertyEditor);
PropertyEditor.paramsProperty.register(PropertyEditor);
PropertyEditor.positionProperty.register(style_1.Style);
PropertyEditor.separatorColorProperty.register(style_1.Style);
var CustomPropertyEditor = /** @class */ (function (_super) {
    __extends(CustomPropertyEditor, _super);
    function CustomPropertyEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CustomPropertyEditor.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomPropertyEditor.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    CustomPropertyEditor.prototype.notifyValueChanged = function () {
    };
    CustomPropertyEditor.editorNeedsViewEvent = "editorNeedsView";
    CustomPropertyEditor.editorHasToApplyValueEvent = "editorHasToApplyValue";
    CustomPropertyEditor.editorNeedsValueEvent = "editorNeedsValue";
    return CustomPropertyEditor;
}(PropertyEditor));
exports.CustomPropertyEditor = CustomPropertyEditor;
//////////////////////////////////////////////////////
// errorMessage : message on error
// successMessage : message on success
var PropertyValidator = /** @class */ (function (_super) {
    __extends(PropertyValidator, _super);
    function PropertyValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PropertyValidator.prototype, "android", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PropertyValidator.prototype, "ios", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    PropertyValidator.prototype.onErrorMessagePropertyChanged = function (oldValue, newValue) {
        this.onErrorMessageChanged(oldValue, newValue);
    };
    PropertyValidator.prototype.onSuccessMessagePropertyChanged = function (oldValue, newValue) {
        this.onSuccessMessageChanged(oldValue, newValue);
    };
    PropertyValidator.prototype.onErrorMessageChanged = function (oldValue, newValue) {
        if (newValue) { // note: not wise but don't want to overwrite this method in all subclasses
            if (this.ios) {
                this.ios.errorMessage = newValue;
            }
            else {
                this.android.setNegativeMessage(newValue);
            }
        }
    };
    PropertyValidator.prototype.onSuccessMessageChanged = function (oldValue, newValue) {
        if (newValue) { // note: not wise but don't want to overwrite this method in all subclasses
            if (this.ios) {
                this.ios.positiveMessage = newValue;
            }
            else {
                this.android.setPositiveMessage(newValue);
            }
        }
    };
    PropertyValidator.prototype.validate = function (value, propertyName) {
        return true;
    };
    PropertyValidator.errorMessageProperty = new view_1.Property({
        name: "errorMessage",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onErrorMessagePropertyChanged(oldValue, newValue);
        },
    });
    PropertyValidator.successMessageProperty = new view_1.Property({
        name: "successMessage",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onSuccessMessagePropertyChanged(oldValue, newValue);
        },
    });
    return PropertyValidator;
}(view_1.ViewBase));
exports.PropertyValidator = PropertyValidator;
PropertyValidator.errorMessageProperty.register(PropertyValidator);
PropertyValidator.successMessageProperty.register(PropertyValidator);
var LengthValidator = /** @class */ (function (_super) {
    __extends(LengthValidator, _super);
    function LengthValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LengthValidator.prototype.onLengthPropertyChanged = function (oldValue, newValue) {
        this.onLengthChanged(oldValue, newValue);
    };
    LengthValidator.prototype.onLengthChanged = function (oldValue, newValue) {
        console.log("Minimum/maximum setter in parent");
    };
    LengthValidator.lengthProperty = new view_1.Property({
        name: "length",
        defaultValue: undefined,
        valueConverter: parseInt,
        valueChanged: function (target, oldValue, newValue) {
            target.onLengthPropertyChanged(oldValue, newValue);
        },
    });
    return LengthValidator;
}(PropertyValidator));
exports.LengthValidator = LengthValidator;
LengthValidator.lengthProperty.register(LengthValidator);
var MinimumLengthValidator = /** @class */ (function (_super) {
    __extends(MinimumLengthValidator, _super);
    function MinimumLengthValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MinimumLengthValidator;
}(LengthValidator));
exports.MinimumLengthValidator = MinimumLengthValidator;
var MaximumLengthValidator = /** @class */ (function (_super) {
    __extends(MaximumLengthValidator, _super);
    function MaximumLengthValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MaximumLengthValidator;
}(LengthValidator));
exports.MaximumLengthValidator = MaximumLengthValidator;
var EmailValidator = /** @class */ (function (_super) {
    __extends(EmailValidator, _super);
    function EmailValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmailValidator;
}(PropertyValidator));
exports.EmailValidator = EmailValidator;
var NonEmptyValidator = /** @class */ (function (_super) {
    __extends(NonEmptyValidator, _super);
    function NonEmptyValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NonEmptyValidator;
}(PropertyValidator));
exports.NonEmptyValidator = NonEmptyValidator;
var RangeValidator = /** @class */ (function (_super) {
    __extends(RangeValidator, _super);
    function RangeValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeValidator.prototype.onMinimumPropertyChanged = function (oldValue, newValue) {
        this.onMinimumChanged(oldValue, newValue);
    };
    RangeValidator.prototype.onMaximumPropertyChanged = function (oldValue, newValue) {
        this.onMaximumChanged(oldValue, newValue);
    };
    RangeValidator.prototype.onMinimumChanged = function (oldValue, newValue) {
    };
    RangeValidator.prototype.onMaximumChanged = function (oldValue, newValue) {
    };
    RangeValidator.minimumProperty = new view_1.Property({
        name: "minimum",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMinimumPropertyChanged(oldValue, newValue);
        },
    });
    RangeValidator.maximumProperty = new view_1.Property({
        name: "maximum",
        defaultValue: undefined,
        valueConverter: parseFloat,
        valueChanged: function (target, oldValue, newValue) {
            target.onMaximumPropertyChanged(oldValue, newValue);
        },
    });
    return RangeValidator;
}(PropertyValidator));
exports.RangeValidator = RangeValidator;
RangeValidator.minimumProperty.register(RangeValidator);
RangeValidator.maximumProperty.register(RangeValidator);
var PhoneValidator = /** @class */ (function (_super) {
    __extends(PhoneValidator, _super);
    function PhoneValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PhoneValidator;
}(PropertyValidator));
exports.PhoneValidator = PhoneValidator;
var RegExValidator = /** @class */ (function (_super) {
    __extends(RegExValidator, _super);
    function RegExValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RegExValidator.prototype.onRegExPropertyChanged = function (oldValue, newValue) {
        this.onRegExChanged(oldValue, newValue);
    };
    RegExValidator.prototype.onRegExChanged = function (oldValue, newValue) {
    };
    RegExValidator.regExProperty = new view_1.Property({
        name: "regEx",
        defaultValue: undefined,
        valueChanged: function (target, oldValue, newValue) {
            target.onRegExPropertyChanged(oldValue, newValue);
        },
    });
    return RegExValidator;
}(PropertyValidator));
exports.RegExValidator = RegExValidator;
RegExValidator.regExProperty.register(RegExValidator);
var IsTrueValidator = /** @class */ (function (_super) {
    __extends(IsTrueValidator, _super);
    function IsTrueValidator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IsTrueValidator;
}(PropertyValidator));
exports.IsTrueValidator = IsTrueValidator;
var StringToDateConverter = /** @class */ (function () {
    function StringToDateConverter() {
    }
    StringToDateConverter.prototype.convertFrom = function (value) { };
    StringToDateConverter.prototype.convertTo = function (value) { };
    return StringToDateConverter;
}());
exports.StringToDateConverter = StringToDateConverter;
var StringToTimeConverter = /** @class */ (function () {
    function StringToTimeConverter() {
    }
    StringToTimeConverter.prototype.convertFrom = function (value) { };
    StringToTimeConverter.prototype.convertTo = function (value) { };
    return StringToTimeConverter;
}());
exports.StringToTimeConverter = StringToTimeConverter;
var ValuesProviderArrayConverter = /** @class */ (function () {
    function ValuesProviderArrayConverter(key, label, items) {
        this._key = key;
        this._label = label;
        this._items = items;
    }
    ValuesProviderArrayConverter.prototype.convertFrom = function (source) {
        var key = this._key;
        var label = this._label;
        var returnValue = undefined;
        this._items.forEach(function (item) {
            if (item[key] === source) {
                returnValue = item[label];
            }
        });
        return returnValue;
    };
    ValuesProviderArrayConverter.prototype.convertTo = function (source) {
        var key = this._key;
        var label = this._label;
        var returnValue = -1;
        this._items.forEach(function (item) {
            if (item[label] === source) {
                returnValue = item[key];
            }
        });
        return returnValue;
    };
    return ValuesProviderArrayConverter;
}());
exports.ValuesProviderArrayConverter = ValuesProviderArrayConverter;
var ValuesProviderMapConverter = /** @class */ (function () {
    function ValuesProviderMapConverter(items) {
        this._items = items;
    }
    ValuesProviderMapConverter.prototype.convertFrom = function (source) {
        var returnValue = undefined;
        this._items.forEach(function (value, key) {
            if (key === source) {
                returnValue = value;
            }
        });
        return returnValue;
    };
    ValuesProviderMapConverter.prototype.convertTo = function (source) {
        var returnValue = -1;
        this._items.forEach(function (value, key) {
            if (value === source) {
                returnValue = key;
            }
        });
        return returnValue;
    };
    return ValuesProviderMapConverter;
}());
exports.ValuesProviderMapConverter = ValuesProviderMapConverter;
///////////////////////////////////////////////////////////////////////////////
var DataFormLayout = /** @class */ (function (_super) {
    __extends(DataFormLayout, _super);
    function DataFormLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DataFormLayout;
}(view_1.ViewBase));
exports.DataFormLayout = DataFormLayout;
var DataFormStackLayout = /** @class */ (function (_super) {
    __extends(DataFormStackLayout, _super);
    function DataFormStackLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataFormStackLayout.prototype.onOrientationPropertyChanged = function (oldValue, newValue) {
        this.onOrientationChanged(oldValue, newValue);
    };
    DataFormStackLayout.prototype.onOrientationChanged = function (oldValue, newValue) {
    };
    DataFormStackLayout.orientationProperty = new view_1.Property({
        name: "orientation",
        defaultValue: enums.Orientation.vertical,
        valueChanged: function (target, oldValue, newValue) {
            target.onOrientationPropertyChanged(oldValue, newValue);
        },
    });
    return DataFormStackLayout;
}(DataFormLayout));
exports.DataFormStackLayout = DataFormStackLayout;
var DataFormGridLayout = /** @class */ (function (_super) {
    __extends(DataFormGridLayout, _super);
    function DataFormGridLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DataFormGridLayout;
}(DataFormLayout));
exports.DataFormGridLayout = DataFormGridLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktZGF0YWZvcm0uY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktZGF0YWZvcm0uY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0RBQTZGO0FBQzdGLHNEQUFzRjtBQUV0RixpREFBbUQ7QUFDbkQsb0RBQXNEO0FBQ3RELGdEQUErQztBQUUvQywyREFBMEQ7QUFDMUQsNkVBQXVFO0FBRXZFLDZFQUF1RTtBQUE5RCxpRUFBQSx1QkFBdUIsQ0FBQTtBQUVoQyxJQUFpQixnQkFBZ0IsQ0FJaEM7QUFKRCxXQUFpQixnQkFBZ0I7SUFDaEIsMkJBQVUsR0FBRyxZQUFZLENBQUM7SUFDMUIsdUJBQU0sR0FBRyxRQUFRLENBQUM7SUFDbEIsMkJBQVUsR0FBRyxZQUFZLENBQUM7QUFDM0MsQ0FBQyxFQUpnQixnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUloQztBQUVEOztFQUVFO0FBQ0YsSUFBWSxrQkFJWDtBQUpELFdBQVksa0JBQWtCO0lBQzFCLDZDQUF1QixDQUFBO0lBQ3ZCLGlEQUEyQixDQUFBO0lBQzNCLHVDQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUk3QjtBQUVEOztFQUVFO0FBQ0YsSUFBWSxzQkFJWDtBQUpELFdBQVksc0JBQXNCO0lBQzlCLGlEQUF1QixDQUFBO0lBQ3ZCLHFEQUEyQixDQUFBO0lBQzNCLDJDQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxzQkFBc0IsR0FBdEIsOEJBQXNCLEtBQXRCLDhCQUFzQixRQUlqQztBQUVEOztFQUVFO0FBQ0YsSUFBWSxxQkFHWDtBQUhELFdBQVkscUJBQXFCO0lBQzdCLHNDQUFhLENBQUE7SUFDYixvQ0FBVyxDQUFBO0FBQ2YsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR2hDO0FBRUQ7O0VBRUU7QUFDRixJQUFZLGtCQWtCWDtBQWxCRCxX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M0I7SUFBeUMsdUNBQWM7SUFBdkQ7O0lBa0JBLENBQUM7SUFOVywwREFBNEIsR0FBcEMsVUFBcUMsUUFBYSxFQUFFLFFBQWE7UUFDN0QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRVMsa0RBQW9CLEdBQTlCLFVBQStCLFFBQWEsRUFBRSxRQUFhO0lBQzNELENBQUM7SUFkYSx1Q0FBbUIsR0FBRyxJQUFJLGVBQVEsQ0FDNUM7UUFDSSxJQUFJLEVBQUUsYUFBYTtRQUNuQixZQUFZLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRO1FBQ3hDLFlBQVksRUFBRSxVQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUTtZQUNyQyxNQUFNLENBQUMsNEJBQTRCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVELENBQUM7S0FDSixDQUFDLENBQUM7SUFRWCwwQkFBQztDQUFBLEFBbEJELENBQXlDLGNBQWMsR0FrQnREO0FBbEJZLGtEQUFtQjtBQW9CaEM7SUFBd0Msc0NBQWM7SUFBdEQ7O0lBQ0EsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQURELENBQXdDLGNBQWMsR0FDckQ7QUFEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3LCBQcm9wZXJ0eSwgQ3NzUHJvcGVydHksIFZpZXdCYXNlLCBpc0lPUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgQWRkQXJyYXlGcm9tQnVpbGRlciwgYm9vbGVhbkNvbnZlcnRlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0ICogYXMgb2JzZXJ2YWJsZSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCAqIGFzIGVudW1zIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuaW1wb3J0IHsgUHJvcGVydHlDaGFuZ2VEYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlXCI7XG5pbXBvcnQgeyBTdHlsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGVcIjtcbmltcG9ydCB7IEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGVcIjtcblxuZXhwb3J0IHsgQXV0b0NvbXBsZXRlRGlzcGxheU1vZGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZVwiO1xuXG5leHBvcnQgbmFtZXNwYWNlIGtub3duQ29sbGVjdGlvbnMge1xuICAgIGV4cG9ydCBjb25zdCBwcm9wZXJ0aWVzID0gXCJwcm9wZXJ0aWVzXCI7XG4gICAgZXhwb3J0IGNvbnN0IGdyb3VwcyA9IFwiZ3JvdXBzXCI7XG4gICAgZXhwb3J0IGNvbnN0IHZhbGlkYXRvcnMgPSBcInZhbGlkYXRvcnNcIjtcbn1cblxuLypcbiogTGlzdHMgdGhlIHBvc3NpYmxlIGNvbW1pdCBtb2Rlcy5cbiovXG5leHBvcnQgZW51bSBEYXRhRm9ybUNvbW1pdE1vZGUge1xuICAgIEltbWVkaWF0ZSA9IFwiSW1tZWRpYXRlXCIsXG4gICAgT25Mb3N0Rm9jdXMgPSBcIk9uTG9zdEZvY3VzXCIsXG4gICAgTWFudWFsID0gXCJNYW51YWxcIlxufVxuXG4vKlxuKiBMaXN0cyB0aGUgcG9zc2libGUgdmFsaWRhdGlvbiBtb2Rlcy5cbiovXG5leHBvcnQgZW51bSBEYXRhRm9ybVZhbGlkYXRpb25Nb2RlIHtcbiAgICBJbW1lZGlhdGUgPSBcIkltbWVkaWF0ZVwiLFxuICAgIE9uTG9zdEZvY3VzID0gXCJPbkxvc3RGb2N1c1wiLFxuICAgIE1hbnVhbCA9IFwiTWFudWFsXCJcbn1cblxuLypcbiogTGlzdHMgdGhlIHBvc3NpYmxlIGRhdGEgZm9ybSBsYWJlbCBwb3NpdGlvbiBtb2Rlcy5cbiovXG5leHBvcnQgZW51bSBEYXRhRm9ybUxhYmVsUG9zaXRpb24ge1xuICAgIExlZnQgPSBcIkxlZnRcIixcbiAgICBUb3AgPSBcIlRvcFwiXG59XG5cbi8qXG4qIExpc3RzIHRoZSBwb3NzaWJsZSBlZGl0b3JzLlxuKi9cbmV4cG9ydCBlbnVtIERhdGFGb3JtRWRpdG9yVHlwZSB7XG4gICAgVGV4dCA9IFwiVGV4dFwiLFxuICAgIE11bHRpbGluZVRleHQgPSBcIk11bHRpbGluZVRleHRcIixcbiAgICBFbWFpbCA9IFwiRW1haWxcIixcbiAgICBQYXNzd29yZCA9IFwiUGFzc3dvcmRcIixcbiAgICBQaG9uZSA9IFwiUGhvbmVcIixcbiAgICBEZWNpbWFsID0gXCJEZWNpbWFsXCIsXG4gICAgTnVtYmVyID0gXCJOdW1iZXJcIixcbiAgICBTd2l0Y2ggPSBcIlN3aXRjaFwiLFxuICAgIFN0ZXBwZXIgPSBcIlN0ZXBwZXJcIixcbiAgICBTbGlkZXIgPSBcIlNsaWRlclwiLFxuICAgIFNlZ21lbnRlZEVkaXRvciA9IFwiU2VnbWVudGVkRWRpdG9yXCIsXG4gICAgRGF0ZVBpY2tlciA9IFwiRGF0ZVBpY2tlclwiLFxuICAgIFRpbWVQaWNrZXIgPSBcIlRpbWVQaWNrZXJcIixcbiAgICBQaWNrZXIgPSBcIlBpY2tlclwiLFxuICAgIExpc3QgPSBcIkxpc3RcIixcbiAgICBBdXRvQ29tcGxldGVJbmxpbmUgPSBcIkF1dG9Db21wbGV0ZUlubGluZVwiLFxuICAgIExhYmVsID0gXCJMYWJlbFwiXG59XG5cbi8qKlxuICogRm9udCBzdHlsZXNcbiAqL1xuZXhwb3J0IGVudW0gRGF0YUZvcm1Gb250U3R5bGUge1xuICAgIE5vcm1hbCA9IFwiTm9ybWFsXCIsXG4gICAgQm9sZCA9IFwiQm9sZFwiLFxuICAgIEl0YWxpYyA9IFwiSXRhbGljXCIsXG4gICAgQm9sZEl0YWxpYyA9IFwiQm9sZEl0YWxpY1wiXG59XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHByb3ZpZGVzIGNvbW1vbiBhcmd1bWVudHMgb2Yge0BsaW5rIFJhZERhdGFGb3JtfSBldmVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBEYXRhRm9ybUV2ZW50RGF0YSBpbXBsZW1lbnRzIG9ic2VydmFibGUuRXZlbnREYXRhIHtcblxuICAgIGV2ZW50TmFtZTogc3RyaW5nO1xuICAgIG9iamVjdDogYW55O1xuICAgIGVkaXRvcjogYW55O1xuICAgIGVudGl0eVByb3BlcnR5OiBhbnk7XG4gICAgcHJvcGVydHlOYW1lOiBzdHJpbmc7XG4gICAgZ3JvdXA6IGFueTtcbiAgICBncm91cE5hbWU6IHN0cmluZztcbiAgICByZXR1cm5WYWx1ZTogYW55O1xufVxuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBwcm92aWRlcyBjb21tb24gYXJndW1lbnRzIG9mIHtAbGluayBDdXN0b21Qcm9wZXJ0eUVkaXRvcn0gZXZlbnRzLlxuICovXG5leHBvcnQgY2xhc3MgRGF0YUZvcm1DdXN0b21Qcm9wZXJ0eUVkaXRvckV2ZW50RGF0YSBpbXBsZW1lbnRzIG9ic2VydmFibGUuRXZlbnREYXRhIHtcbiAgICBldmVudE5hbWU6IHN0cmluZztcbiAgICBvYmplY3Q6IGFueTtcbiAgICB2aWV3OiBhbnk7XG4gICAgY29udGV4dDogYW55O1xuICAgIHZhbHVlOiBhbnk7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBSYWREYXRhRm9ybSBleHRlbmRzIFZpZXcgaW1wbGVtZW50cyBBZGRBcnJheUZyb21CdWlsZGVyIHtcblxuICAgIHByb3RlY3RlZCBlbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyOiAocHJvcGVydHlDaGFuZ2VEYXRhOiBvYnNlcnZhYmxlLlByb3BlcnR5Q2hhbmdlRGF0YSkgPT4gdm9pZDtcbiAgICBwcm90ZWN0ZWQgZ3JvdXBQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyOiAocHJvcGVydHlDaGFuZ2VEYXRhOiBvYnNlcnZhYmxlLlByb3BlcnR5Q2hhbmdlRGF0YSkgPT4gdm9pZDtcbiAgICBwcm90ZWN0ZWQgZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlcjogKHByb3BlcnR5Q2hhbmdlRGF0YTogb2JzZXJ2YWJsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpID0+IHZvaWQ7XG4gICAgcHJvdGVjdGVkIGdyb3VwTGF5b3V0UHJvcGVydHlDaGFuZ2VkSGFuZGxlcjogKHByb3BlcnR5Q2hhbmdlRGF0YTogb2JzZXJ2YWJsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpID0+IHZvaWQ7XG5cbiAgICBwdWJsaWMgc3RhdGljIGVkaXRvclNlbGVjdGVkRXZlbnQ6IHN0cmluZyA9IFwiZWRpdG9yU2VsZWN0ZWRcIjtcbiAgICBwdWJsaWMgc3RhdGljIGVkaXRvckRlc2VsZWN0ZWRFdmVudDogc3RyaW5nID0gXCJlZGl0b3JEZXNlbGVjdGVkXCI7XG4gICAgcHVibGljIHN0YXRpYyBwcm9wZXJ0eUVkaXRlZEV2ZW50OiBzdHJpbmcgPSBcInByb3BlcnR5RWRpdGVkXCI7XG4gICAgcHVibGljIHN0YXRpYyBwcm9wZXJ0eVZhbGlkYXRlRXZlbnQ6IHN0cmluZyA9IFwicHJvcGVydHlWYWxpZGF0ZVwiO1xuICAgIHB1YmxpYyBzdGF0aWMgcHJvcGVydHlWYWxpZGF0ZWRFdmVudDogc3RyaW5nID0gXCJwcm9wZXJ0eVZhbGlkYXRlZFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgZWRpdG9yU2V0dXBFdmVudDogc3RyaW5nID0gXCJlZGl0b3JTZXR1cFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgZWRpdG9yVXBkYXRlRXZlbnQ6IHN0cmluZyA9IFwiZWRpdG9yVXBkYXRlXCI7XG4gICAgcHVibGljIHN0YXRpYyBncm91cFVwZGF0ZUV2ZW50OiBzdHJpbmcgPSBcImdyb3VwVXBkYXRlXCI7XG4gICAgcHVibGljIHN0YXRpYyBwcm9wZXJ0eUNvbW1pdEV2ZW50OiBzdHJpbmcgPSBcInByb3BlcnR5Q29tbWl0XCI7XG4gICAgcHVibGljIHN0YXRpYyBwcm9wZXJ0eUNvbW1pdHRlZEV2ZW50OiBzdHJpbmcgPSBcInByb3BlcnR5Q29tbWl0dGVkXCI7XG4gICAgcHVibGljIHN0YXRpYyBncm91cEV4cGFuZGVkRXZlbnQ6IHN0cmluZyA9IFwiZ3JvdXBFeHBhbmRlZFwiO1xuICAgIHB1YmxpYyBzdGF0aWMgZ3JvdXBDb2xsYXBzZWRFdmVudDogc3RyaW5nID0gXCJncm91cENvbGxhcHNlZFwiO1xuXG4gICAgcHVibGljIGlzUmVhZE9ubHk6IGJvb2xlYW47XG4gICAgcHVibGljIGNvbW1pdE1vZGU6IERhdGFGb3JtQ29tbWl0TW9kZTtcbiAgICBwdWJsaWMgdmFsaWRhdGlvbk1vZGU6IERhdGFGb3JtVmFsaWRhdGlvbk1vZGU7XG4gICAgcHVibGljIHNvdXJjZTogYW55O1xuICAgIHB1YmxpYyBtZXRhZGF0YTogYW55O1xuICAgIHB1YmxpYyBncm91cHM6IEFycmF5PFByb3BlcnR5R3JvdXA+O1xuICAgIHB1YmxpYyBwcm9wZXJ0aWVzOiBBcnJheTxFbnRpdHlQcm9wZXJ0eT47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5vbihcImJpbmRpbmdDb250ZXh0Q2hhbmdlXCIsIHRoaXMuYmluZGluZ0NvbnRleHRDaGFuZ2VkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZWFjaENoaWxkKGNhbGxiYWNrOiAoY2hpbGQ6IFZpZXdCYXNlKSA9PiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLnByb3BlcnRpZXM7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGRpc3Bvc2VOYXRpdmVWaWV3KCkge1xuICAgICAgICB0aGlzLmVudGl0eVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JvdXBQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JvdXBMYXlvdXRQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBub3RpZnlWYWxpZGF0ZWQocHJvcGVydHlOYW1lOiBzdHJpbmcsIHJlc3VsdDogYm9vbGVhbikge1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaXNSZWFkT25seVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZERhdGFGb3JtLCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJpc1JlYWRPbmx5XCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBib29sZWFuQ29udmVydGVyLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Jc1JlYWRPbmx5UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgY29tbWl0TW9kZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZERhdGFGb3JtLCBEYXRhRm9ybUNvbW1pdE1vZGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImNvbW1pdE1vZGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogRGF0YUZvcm1Db21taXRNb2RlLkltbWVkaWF0ZSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IERhdGFGb3JtQ29tbWl0TW9kZVt2YWx1ZV0sXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkNvbW1pdE1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyB2YWxpZGF0aW9uTW9kZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZERhdGFGb3JtLCBEYXRhRm9ybVZhbGlkYXRpb25Nb2RlPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0aW9uTW9kZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBEYXRhRm9ybVZhbGlkYXRpb25Nb2RlLkltbWVkaWF0ZSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IERhdGFGb3JtVmFsaWRhdGlvbk1vZGVbdmFsdWVdLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25WYWxpZGF0aW9uTW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNvdXJjZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZERhdGFGb3JtLCBhbnk+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInNvdXJjZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblNvdXJjZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIG1ldGFkYXRhUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UmFkRGF0YUZvcm0sIGFueT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibWV0YWRhdGFcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25NZXRhZGF0YVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGdyb3Vwc1Byb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZERhdGFGb3JtLCBBcnJheTxQcm9wZXJ0eUdyb3VwPj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZ3JvdXBzXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uR3JvdXBzUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25Jc1JlYWRPbmx5UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9vbklzUmVhZE9ubHlQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVmFsaWRhdGlvbk1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IERhdGFGb3JtVmFsaWRhdGlvbk1vZGUsIG5ld1ZhbHVlOiBEYXRhRm9ybVZhbGlkYXRpb25Nb2RlKSB7XG4gICAgICAgIHRoaXMuX29uVmFsaWRhdGlvbk1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29tbWl0TW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF0YUZvcm1Db21taXRNb2RlLCBuZXdWYWx1ZTogRGF0YUZvcm1Db21taXRNb2RlKSB7XG4gICAgICAgIHRoaXMuX29uQ29tbWl0TW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Tb3VyY2VQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9vblNvdXJjZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NZXRhZGF0YVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX29uTWV0YWRhdGFQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR3JvdXBzUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBBcnJheTxQcm9wZXJ0eUdyb3VwPiwgbmV3VmFsdWU6IEFycmF5PFByb3BlcnR5R3JvdXA+KSB7XG4gICAgICAgIHRoaXMuX29uR3JvdXBzUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblByb3BlcnRpZXNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IEFycmF5PEVudGl0eVByb3BlcnR5PiwgbmV3VmFsdWU6IEFycmF5PEVudGl0eVByb3BlcnR5Pikge1xuICAgICAgICB0aGlzLl9vblByb3BlcnRpZXNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGJpbmRpbmdDb250ZXh0Q2hhbmdlZChkYXRhOiBQcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZ3JvdXBzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncm91cHNbaV0uYmluZGluZ0NvbnRleHQgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncm91cHNbaV0ucHJvcGVydGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHkuYmluZGluZ0NvbnRleHQgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLnByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgZW50aXR5UHJvcGVydHkuYmluZGluZ0NvbnRleHQgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2F0dGFjaEVudGl0eVByb3BlcnR5UHJvcGVydHlDaGFuZ2VMaXN0ZW5lcihwcm9wZXJ0eTogRW50aXR5UHJvcGVydHkpIHtcbiAgICAgICAgcHJvcGVydHkub2ZmKCdpbmRleENoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIHByb3BlcnR5Lm9mZignaGlkZGVuQ2hhbmdlJywgdGhpcy5lbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgcHJvcGVydHkub2ZmKCdlZGl0b3JDaGFuZ2UnLCB0aGlzLmVudGl0eVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBwcm9wZXJ0eS5vZmYoJ3JlYWRPbmx5Q2hhbmdlJywgdGhpcy5lbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgcHJvcGVydHkub2ZmKCdoaW50VGV4dENoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIHByb3BlcnR5Lm9mZignZGlzcGxheU5hbWVDaGFuZ2UnLCB0aGlzLmVudGl0eVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBwcm9wZXJ0eS5vZmYoJ3ZhbHVlc1Byb3ZpZGVyQ2hhbmdlJywgdGhpcy5lbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcblxuICAgICAgICBwcm9wZXJ0eS5vbignaW5kZXhDaGFuZ2UnLCB0aGlzLmVudGl0eVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBwcm9wZXJ0eS5vbignaGlkZGVuQ2hhbmdlJywgdGhpcy5lbnRpdHlQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgcHJvcGVydHkub24oJ2VkaXRvckNoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIHByb3BlcnR5Lm9uKCdyZWFkT25seUNoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIHByb3BlcnR5Lm9uKCdoaW50VGV4dENoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIHByb3BlcnR5Lm9uKCdkaXNwbGF5TmFtZUNoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIHByb3BlcnR5Lm9uKCd2YWx1ZXNQcm92aWRlckNoYW5nZScsIHRoaXMuZW50aXR5UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgfVxuXG4gICAgX2F0dGFjaEdyb3VwTGF5b3V0Q2hhbmdlTGlzdGVuZXIob2xkVmFsdWU6IERhdGFGb3JtTGF5b3V0LCBuZXdWYWx1ZTogRGF0YUZvcm1MYXlvdXQpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ29yaWVudGF0aW9uQ2hhbmdlJywgdGhpcy5ncm91cExheW91dFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignb3JpZW50YXRpb25DaGFuZ2UnLCB0aGlzLmdyb3VwTGF5b3V0UHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYXR0YWNoR3JvdXBUaXRsZVN0eWxlQ2hhbmdlTGlzdGVuZXIob2xkVmFsdWU6IEdyb3VwVGl0bGVTdHlsZSwgbmV3VmFsdWU6IEdyb3VwVGl0bGVTdHlsZSkge1xuICAgICAgICBpZiAob2xkVmFsdWUpIHtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignc3Ryb2tlQ29sb3JDaGFuZ2UnLCB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdzdHJva2VXaWR0aENoYW5nZScsIHRoaXMuZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ2ZpbGxDb2xvckNoYW5nZScsIHRoaXMuZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ3NlcGFyYXRvckNvbG9yQ2hhbmdlJywgdGhpcy5ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbGFiZWxUZXh0Q29sb3JDaGFuZ2UnLCB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdsYWJlbFRleHRTaXplQ2hhbmdlJywgdGhpcy5ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbGFiZWxGb250TmFtZUNoYW5nZScsIHRoaXMuZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ2xhYmVsRm9udFN0eWxlQ2hhbmdlJywgdGhpcy5ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ3N0cm9rZUNvbG9yQ2hhbmdlJywgdGhpcy5ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdzdHJva2VXaWR0aENoYW5nZScsIHRoaXMuZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignZmlsbENvbG9yQ2hhbmdlJywgdGhpcy5ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdzZXBhcmF0b3JDb2xvckNoYW5nZScsIHRoaXMuZ3JvdXBUaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignbGFiZWxUZXh0Q29sb3JDaGFuZ2UnLCB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsVGV4dFNpemVDaGFuZ2UnLCB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsRm9udE5hbWVDaGFuZ2UnLCB0aGlzLmdyb3VwVGl0bGVTdHlsZVByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsRm9udFN0eWxlQ2hhbmdlJywgdGhpcy5ncm91cFRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hdHRhY2hHcm91cENoYW5nZUxpc3RlbmVyKGdyb3VwOiBQcm9wZXJ0eUdyb3VwKSB7XG4gICAgICAgIGdyb3VwLm9mZignbGF5b3V0Q2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vZmYoJ3RpdGxlU3R5bGVDaGFuZ2UnLCB0aGlzLmdyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIGdyb3VwLm9mZignaGlkZGVuQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vZmYoJ25hbWVDaGFuZ2UnLCB0aGlzLmdyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIGdyb3VwLm9mZignY29sbGFwc2libGVDaGFuZ2UnLCB0aGlzLmdyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIGdyb3VwLm9mZignY29sbGFwc2VkQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vZmYoJ3RpdGxlSGlkZGVuQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuXG4gICAgICAgIGdyb3VwLm9uKCdsYXlvdXRDaGFuZ2UnLCB0aGlzLmdyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG4gICAgICAgIGdyb3VwLm9uKCd0aXRsZVN0eWxlQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vbignaGlkZGVuQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vbignbmFtZUNoYW5nZScsIHRoaXMuZ3JvdXBQcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgICAgZ3JvdXAub24oJ2NvbGxhcHNpYmxlQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vbignY29sbGFwc2VkQ2hhbmdlJywgdGhpcy5ncm91cFByb3BlcnR5Q2hhbmdlZEhhbmRsZXIpO1xuICAgICAgICBncm91cC5vbigndGl0bGVIaWRkZW5DaGFuZ2UnLCB0aGlzLmdyb3VwUHJvcGVydHlDaGFuZ2VkSGFuZGxlcik7XG5cbiAgICAgICAgdGhpcy5fYXR0YWNoR3JvdXBMYXlvdXRDaGFuZ2VMaXN0ZW5lcih1bmRlZmluZWQsIGdyb3VwLmxheW91dCk7XG5cbiAgICAgICAgdGhpcy5fYXR0YWNoR3JvdXBUaXRsZVN0eWxlQ2hhbmdlTGlzdGVuZXIodW5kZWZpbmVkLCBncm91cC50aXRsZVN0eWxlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uSXNSZWFkT25seVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHsgfVxuICAgIHByb3RlY3RlZCBfb25Db21taXRNb2RlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBEYXRhRm9ybUNvbW1pdE1vZGUsIG5ld1ZhbHVlOiBEYXRhRm9ybUNvbW1pdE1vZGUpIHsgfVxuICAgIHByb3RlY3RlZCBfb25WYWxpZGF0aW9uTW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF0YUZvcm1WYWxpZGF0aW9uTW9kZSwgbmV3VmFsdWU6IERhdGFGb3JtVmFsaWRhdGlvbk1vZGUpIHsgfVxuICAgIHByb3RlY3RlZCBfb25Tb3VyY2VQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSkgeyB9XG4gICAgcHJvdGVjdGVkIF9vbk1ldGFkYXRhUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHsgfVxuICAgIHByb3RlY3RlZCBfb25Hcm91cHNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IEFycmF5PFByb3BlcnR5R3JvdXA+LCBuZXdWYWx1ZTogQXJyYXk8UHJvcGVydHlHcm91cD4pIHsgfVxuICAgIHByb3RlY3RlZCBfb25Qcm9wZXJ0aWVzUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBBcnJheTxFbnRpdHlQcm9wZXJ0eT4sIG5ld1ZhbHVlOiBBcnJheTxFbnRpdHlQcm9wZXJ0eT4pIHsgfVxuXG4gICAgZ2V0IGVkaXRlZE9iamVjdCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcHJvcGVydGllc1Byb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhZERhdGFGb3JtLCBBcnJheTxFbnRpdHlQcm9wZXJ0eT4+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInByb3BlcnRpZXNcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25Qcm9wZXJ0aWVzUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBfYWRkQXJyYXlGcm9tQnVpbGRlcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChuYW1lID09PSBcImdyb3Vwc1wiKSB7XG4gICAgICAgICAgICB0aGlzLmdyb3VwcyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYW1lID09PSBcInByb3BlcnRpZXNcIikge1xuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UHJvcGVydHlCeU5hbWUocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBFbnRpdHlQcm9wZXJ0eSB7XG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncm91cHNbaV0ucHJvcGVydGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLmdyb3Vwc1tpXS5wcm9wZXJ0aWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVudGl0eVByb3BlcnR5Lm5hbWUgPT09IHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbnRpdHlQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5OiBFbnRpdHlQcm9wZXJ0eSA9IDxFbnRpdHlQcm9wZXJ0eT50aGlzLnByb3BlcnRpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGVudGl0eVByb3BlcnR5Lm5hbWUgPT09IHByb3BlcnR5TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW50aXR5UHJvcGVydHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEdyb3VwQnlOYW1lKGdyb3VwTmFtZTogc3RyaW5nKTogUHJvcGVydHlHcm91cCB7XG4gICAgICAgIGlmICh0aGlzLmdyb3Vwcykge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IHRoaXMuZ3JvdXBzW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxQcm9wZXJ0eUdyb3VwPnRoaXMuZ3JvdXBzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVsb2FkKCk6IHZvaWQgeyB9XG4gICAgcHVibGljIHZhbGlkYXRlQWxsKCk6IFByb21pc2U8Qm9vbGVhbj4geyByZXR1cm4gbnVsbDsgfVxuICAgIHB1YmxpYyB2YWxpZGF0ZUFuZENvbW1pdEFsbCgpOiBQcm9taXNlPEJvb2xlYW4+IHsgcmV0dXJuIG51bGw7IH1cbiAgICBwdWJsaWMgY29tbWl0QWxsKCk6IHZvaWQgeyB9XG59XG5SYWREYXRhRm9ybS5pc1JlYWRPbmx5UHJvcGVydHkucmVnaXN0ZXIoUmFkRGF0YUZvcm0pO1xuUmFkRGF0YUZvcm0uY29tbWl0TW9kZVByb3BlcnR5LnJlZ2lzdGVyKFJhZERhdGFGb3JtKTtcblJhZERhdGFGb3JtLnZhbGlkYXRpb25Nb2RlUHJvcGVydHkucmVnaXN0ZXIoUmFkRGF0YUZvcm0pO1xuUmFkRGF0YUZvcm0uc291cmNlUHJvcGVydHkucmVnaXN0ZXIoUmFkRGF0YUZvcm0pO1xuUmFkRGF0YUZvcm0ubWV0YWRhdGFQcm9wZXJ0eS5yZWdpc3RlcihSYWREYXRhRm9ybSk7XG5SYWREYXRhRm9ybS5ncm91cHNQcm9wZXJ0eS5yZWdpc3RlcihSYWREYXRhRm9ybSk7XG5SYWREYXRhRm9ybS5wcm9wZXJ0aWVzUHJvcGVydHkucmVnaXN0ZXIoUmFkRGF0YUZvcm0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUdyb3VwIGV4dGVuZHMgVmlld0Jhc2UgaW1wbGVtZW50cyBBZGRBcnJheUZyb21CdWlsZGVyIHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICAgIHB1YmxpYyBoaWRkZW46IGJvb2xlYW47XG4gICAgcHVibGljIHRpdGxlSGlkZGVuOiBib29sZWFuO1xuICAgIHB1YmxpYyBjb2xsYXBzaWJsZTogYm9vbGVhbjtcbiAgICBwdWJsaWMgY29sbGFwc2VkOiBib29sZWFuO1xuICAgIHB1YmxpYyB0aXRsZVN0eWxlOiBHcm91cFRpdGxlU3R5bGU7XG4gICAgcHVibGljIHByb3BlcnRpZXM6IEFycmF5PEVudGl0eVByb3BlcnR5PjtcbiAgICBwdWJsaWMgbGF5b3V0OiBEYXRhRm9ybUxheW91dDtcblxuICAgIHB1YmxpYyBzdGF0aWMgbmFtZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5R3JvdXAsIHN0cmluZz4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBoaWRkZW5Qcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUdyb3VwLCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJoaWRkZW5cIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uSGlkZGVuUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgdGl0bGVIaWRkZW5Qcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUdyb3VwLCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0aXRsZUhpZGRlblwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBib29sZWFuQ29udmVydGVyLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25UaXRsZUhpZGRlblByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbGxhcHNpYmxlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UHJvcGVydHlHcm91cCwgYm9vbGVhbj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY29sbGFwc2libGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ29sbGFwc2libGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb2xsYXBzZWRQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUdyb3VwLCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJjb2xsYXBzZWRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ29sbGFwc2VkUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgdGl0bGVTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5R3JvdXAsIEdyb3VwVGl0bGVTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidGl0bGVTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblRpdGxlU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBwcm9wZXJ0aWVzUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UHJvcGVydHlHcm91cCwgQXJyYXk8RW50aXR5UHJvcGVydHk+PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJwcm9wZXJ0aWVzXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uUHJvcGVydGllc1Byb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxheW91dFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5R3JvdXAsIERhdGFGb3JtTGF5b3V0PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJsYXlvdXRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25MYXlvdXRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIF9hZGRBcnJheUZyb21CdWlsZGVyKG5hbWU6IHN0cmluZywgdmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IFwicHJvcGVydGllc1wiKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25OYW1lUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vbk5hbWVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkhpZGRlblByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vbkhpZGRlbkNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVGl0bGVIaWRkZW5Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub25UaXRsZUhpZGRlbkNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29sbGFwc2libGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub25Db2xsYXBzaWJsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29sbGFwc2VkUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9uQ29sbGFwc2VkQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25UaXRsZVN0eWxlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBHcm91cFRpdGxlU3R5bGUsIG5ld1ZhbHVlOiBHcm91cFRpdGxlU3R5bGUpIHtcbiAgICAgICAgdGhpcy5vblRpdGxlU3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblByb3BlcnRpZXNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IEFycmF5PEVudGl0eVByb3BlcnR5PiwgbmV3VmFsdWU6IEFycmF5PEVudGl0eVByb3BlcnR5Pikge1xuICAgICAgICB0aGlzLm9uUHJvcGVydGllc0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGF5b3V0UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBEYXRhRm9ybUxheW91dCwgbmV3VmFsdWU6IERhdGFGb3JtTGF5b3V0KSB7XG4gICAgICAgIHRoaXMub25MYXlvdXRDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkhpZGRlbkNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVGl0bGVIaWRkZW5DaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNvbGxhcHNpYmxlQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Db2xsYXBzZWRDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRpdGxlU3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBHcm91cFRpdGxlU3R5bGUsIG5ld1ZhbHVlOiBHcm91cFRpdGxlU3R5bGUpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Qcm9wZXJ0aWVzQ2hhbmdlZChvbGRWYWx1ZTogQXJyYXk8RW50aXR5UHJvcGVydHk+LCBuZXdWYWx1ZTogQXJyYXk8RW50aXR5UHJvcGVydHk+KTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGF5b3V0Q2hhbmdlZChvbGRWYWx1ZTogRGF0YUZvcm1MYXlvdXQsIG5ld1ZhbHVlOiBEYXRhRm9ybUxheW91dCk6IHZvaWQge1xuICAgIH1cbn1cblByb3BlcnR5R3JvdXAubmFtZVByb3BlcnR5LnJlZ2lzdGVyKFByb3BlcnR5R3JvdXApO1xuUHJvcGVydHlHcm91cC5oaWRkZW5Qcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUdyb3VwKTtcblByb3BlcnR5R3JvdXAudGl0bGVIaWRkZW5Qcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUdyb3VwKTtcblByb3BlcnR5R3JvdXAuY29sbGFwc2libGVQcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUdyb3VwKTtcblByb3BlcnR5R3JvdXAuY29sbGFwc2VkUHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlHcm91cCk7XG5Qcm9wZXJ0eUdyb3VwLnRpdGxlU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUdyb3VwKTtcblByb3BlcnR5R3JvdXAucHJvcGVydGllc1Byb3BlcnR5LnJlZ2lzdGVyKFByb3BlcnR5R3JvdXApO1xuUHJvcGVydHlHcm91cC5sYXlvdXRQcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUdyb3VwKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUVkaXRvclBhcmFtcyBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBwdWJsaWMgbWluaW11bTogbnVtYmVyO1xuICAgIHB1YmxpYyBtYXhpbXVtOiBudW1iZXI7XG4gICAgcHVibGljIHN0ZXA6IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgbWluaW11bVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5RWRpdG9yUGFyYW1zLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1pbmltdW1cIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1pbmltdW1Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBtYXhpbXVtUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UHJvcGVydHlFZGl0b3JQYXJhbXMsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibWF4aW11bVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogcGFyc2VGbG9hdCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTWF4aW11bVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvclBhcmFtcywgbnVtYmVyPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzdGVwXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUZsb2F0LFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TdGVwUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25NaW5pbXVtUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbk1pbmltdW1DaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk1heGltdW1Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uTWF4aW11bUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU3RlcFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25TdGVwQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1pbmltdW1DaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25NYXhpbXVtQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3RlcENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIH1cbn1cblByb3BlcnR5RWRpdG9yUGFyYW1zLm1pbmltdW1Qcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUVkaXRvclBhcmFtcyk7XG5Qcm9wZXJ0eUVkaXRvclBhcmFtcy5tYXhpbXVtUHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlFZGl0b3JQYXJhbXMpO1xuUHJvcGVydHlFZGl0b3JQYXJhbXMuc3RlcFByb3BlcnR5LnJlZ2lzdGVyKFByb3BlcnR5RWRpdG9yUGFyYW1zKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjbGFzcyBEYXRhRm9ybVN0eWxlQmFzZSBleHRlbmRzIFZpZXdCYXNlIHtcbiAgICBwdWJsaWMgc2VwYXJhdG9yQ29sb3I6IENvbG9yO1xuICAgIHB1YmxpYyBzdHJva2VDb2xvcjogQ29sb3I7XG4gICAgcHVibGljIGZpbGxDb2xvcjogQ29sb3I7XG4gICAgcHVibGljIHN0cm9rZVdpZHRoOiBudW1iZXI7XG4gICAgcHVibGljIGxhYmVsVGV4dENvbG9yOiBDb2xvcjtcbiAgICBwdWJsaWMgbGFiZWxUZXh0U2l6ZTogbnVtYmVyO1xuICAgIHB1YmxpYyBsYWJlbEZvbnROYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsRm9udFN0eWxlOiBEYXRhRm9ybUZvbnRTdHlsZTtcblxuICAgIHB1YmxpYyBzdGF0aWMgc3Ryb2tlQ29sb3JQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxEYXRhRm9ybVN0eWxlQmFzZSwgQ29sb3I+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInN0cm9rZUNvbG9yXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGVxdWFsaXR5Q29tcGFyZXI6IENvbG9yLmVxdWFscyxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodikgPT4gbmV3IENvbG9yKHYpLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25TdHJva2VDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIHN0cm9rZVdpZHRoUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF0YUZvcm1TdHlsZUJhc2UsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwic3Ryb2tlV2lkdGhcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblN0cm9rZVdpZHRoUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZmlsbENvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF0YUZvcm1TdHlsZUJhc2UsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJmaWxsQ29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkZpbGxDb2xvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIHNlcGFyYXRvckNvbG9yUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF0YUZvcm1TdHlsZUJhc2UsIENvbG9yPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJzZXBhcmF0b3JDb2xvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBlcXVhbGl0eUNvbXBhcmVyOiBDb2xvci5lcXVhbHMsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogKHYpID0+IG5ldyBDb2xvcih2KSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU2VwYXJhdG9yQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBsYWJlbFRleHRDb2xvclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERhdGFGb3JtU3R5bGVCYXNlLCBDb2xvcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibGFiZWxUZXh0Q29sb3JcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXF1YWxpdHlDb21wYXJlcjogQ29sb3IuZXF1YWxzLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2KSA9PiBuZXcgQ29sb3IodiksXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkxhYmVsVGV4dENvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgbGFiZWxUZXh0U2l6ZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERhdGFGb3JtU3R5bGVCYXNlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhYmVsVGV4dFNpemVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkxhYmVsVGV4dFNpemVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBsYWJlbEZvbnROYW1lUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF0YUZvcm1TdHlsZUJhc2UsIHN0cmluZz4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibGFiZWxGb250TmFtZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkxhYmVsRm9udE5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBsYWJlbEZvbnRTdHlsZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PERhdGFGb3JtU3R5bGVCYXNlLCBEYXRhRm9ybUZvbnRTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibGFiZWxGb250U3R5bGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gRGF0YUZvcm1Gb250U3R5bGVbdmFsdWVdLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25MYWJlbEZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uU3Ryb2tlQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vblN0cm9rZUNvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN0cm9rZUNvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcik6IHZvaWQge1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TdHJva2VXaWR0aFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25TdHJva2VXaWR0aENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdHJva2VXaWR0aENoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIH1cblxuICAgIHByaXZhdGUgb25GaWxsQ29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vbkZpbGxDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25GaWxsQ29sb3JDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNlcGFyYXRvckNvbG9yUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBDb2xvciwgbmV3VmFsdWU6IENvbG9yKSB7XG4gICAgICAgIHRoaXMub25TZXBhcmF0b3JDb2xvckNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZXBhcmF0b3JDb2xvckNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGFiZWxUZXh0Q29sb3JQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IENvbG9yLCBuZXdWYWx1ZTogQ29sb3IpIHtcbiAgICAgICAgdGhpcy5vbkxhYmVsVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhYmVsVGV4dENvbG9yQ2hhbmdlZChvbGRWYWx1ZTogQ29sb3IsIG5ld1ZhbHVlOiBDb2xvcik6IHZvaWQge1xuICAgIH1cblxuICAgIHByaXZhdGUgb25MYWJlbFRleHRTaXplUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkxhYmVsVGV4dFNpemVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFiZWxUZXh0U2l6ZUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIH1cblxuICAgIHByaXZhdGUgb25MYWJlbEZvbnROYW1lUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vbkxhYmVsRm9udE5hbWVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFiZWxGb250TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIH1cblxuICAgIHByaXZhdGUgb25MYWJlbEZvbnRTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogRGF0YUZvcm1Gb250U3R5bGUsIG5ld1ZhbHVlOiBEYXRhRm9ybUZvbnRTdHlsZSkge1xuICAgICAgICB0aGlzLm9uTGFiZWxGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGFiZWxGb250U3R5bGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXRhRm9ybUZvbnRTdHlsZSwgbmV3VmFsdWU6IERhdGFGb3JtRm9udFN0eWxlKTogdm9pZCB7XG4gICAgfVxufVxuRGF0YUZvcm1TdHlsZUJhc2Uuc3Ryb2tlQ29sb3JQcm9wZXJ0eS5yZWdpc3RlcihEYXRhRm9ybVN0eWxlQmFzZSk7XG5EYXRhRm9ybVN0eWxlQmFzZS5zdHJva2VXaWR0aFByb3BlcnR5LnJlZ2lzdGVyKERhdGFGb3JtU3R5bGVCYXNlKTtcbkRhdGFGb3JtU3R5bGVCYXNlLmZpbGxDb2xvclByb3BlcnR5LnJlZ2lzdGVyKERhdGFGb3JtU3R5bGVCYXNlKTtcbkRhdGFGb3JtU3R5bGVCYXNlLnNlcGFyYXRvckNvbG9yUHJvcGVydHkucmVnaXN0ZXIoRGF0YUZvcm1TdHlsZUJhc2UpO1xuRGF0YUZvcm1TdHlsZUJhc2UubGFiZWxUZXh0Q29sb3JQcm9wZXJ0eS5yZWdpc3RlcihEYXRhRm9ybVN0eWxlQmFzZSk7XG5EYXRhRm9ybVN0eWxlQmFzZS5sYWJlbFRleHRTaXplUHJvcGVydHkucmVnaXN0ZXIoRGF0YUZvcm1TdHlsZUJhc2UpO1xuRGF0YUZvcm1TdHlsZUJhc2UubGFiZWxGb250TmFtZVByb3BlcnR5LnJlZ2lzdGVyKERhdGFGb3JtU3R5bGVCYXNlKTtcbkRhdGFGb3JtU3R5bGVCYXNlLmxhYmVsRm9udFN0eWxlUHJvcGVydHkucmVnaXN0ZXIoRGF0YUZvcm1TdHlsZUJhc2UpO1xuXG5cbi8vIHRvZG86IGFkZCBwcm9wZXJ0aWVzIGZvciBzZXBhcmF0b3IgTGVhZGluZy9UcmFpbGluZyBTcGFjZSAsIGluc2V0c1xuZXhwb3J0IGNsYXNzIEdyb3VwVGl0bGVTdHlsZSBleHRlbmRzIERhdGFGb3JtU3R5bGVCYXNlIHtcblxufVxuXG4vLyBkZWNsYXJlIGNsYXNzIFRLRGF0YUZvcm1FZGl0b3JTdHlsZSBleHRlbmRzIE5TT2JqZWN0IHtcblxuLy8gZnJvbSBiYXNlIGNsYXNzOlxuLy8gXHRzdHJva2U6IFRLU3Ryb2tlO1xuLy8gXHRmaWxsOiBUS0ZpbGw7XG4vLyBcdHNlcGFyYXRvckNvbG9yOiBUS0ZpbGw7XG5cbi8vIGltcGxlbWVudGVkXG4vLyBcdGVkaXRvck9mZnNldDogVUlPZmZzZXQ7XG4vLyBcdHRleHRMYWJlbE9mZnNldDogVUlPZmZzZXQ7XG4vLyBcdHRleHRMYWJlbERpc3BsYXlNb2RlOiBUS0RhdGFGb3JtRWRpdG9yVGV4dExhYmVsRGlzcGxheU1vZGU7XG5cbi8vIHRvZG86IGFkZCByZXF1aXJlZCBwcm9wZXJ0aWVzXG4vLyBcdGFjY2Vzc29yeUFycm93U2l6ZTogQ0dTaXplOyAvL2lvcyBzcGVjaWZpY1xuLy8gXHRhY2Nlc3NvcnlBcnJvd1N0cm9rZTogVEtTdHJva2U7IC8vaW9zIHNwZWNpZmljXG4vLyBcdGZlZWRiYWNrSW1hZ2VWaWV3T2Zmc2V0OiBVSU9mZnNldDtcbi8vIFx0ZmVlZGJhY2tMYWJlbE9mZnNldDogVUlPZmZzZXQ7XG4vLyBcdGltYWdlVmlld09mZnNldDogVUlPZmZzZXQ7IC8vYWRkIHdoZW4gaW1hZ2UgdmlldyBpcyBhZGRlZCBhcyBmZWF0dXJlXG5cbi8vIFx0aW5zZXRzOiBVSUVkZ2VJbnNldHM7XG4vLyBcdHNlcGFyYXRvckxlYWRpbmdTcGFjZTogbnVtYmVyOyAvL2lPUyBzcGVjaWZpY1xuLy8gXHRzZXBhcmF0b3JUcmFpbGluZ1NwYWNlOiBudW1iZXI7IC8vaU9TIHNwZWNpZmljXG4vLyB9XG5leHBvcnQgY2xhc3MgUHJvcGVydHlFZGl0b3JTdHlsZSBleHRlbmRzIERhdGFGb3JtU3R5bGVCYXNlIHtcbiAgICBwdWJsaWMgZWRpdG9ySG9yaXpvbnRhbE9mZnNldDogbnVtYmVyO1xuICAgIHB1YmxpYyBlZGl0b3JWZXJ0aWNhbE9mZnNldDogbnVtYmVyO1xuICAgIHB1YmxpYyBsYWJlbEhvcml6b250YWxPZmZzZXQ6IG51bWJlcjtcbiAgICBwdWJsaWMgbGFiZWxWZXJ0aWNhbE9mZnNldDogbnVtYmVyO1xuICAgIHB1YmxpYyBsYWJlbEhpZGRlbjogYm9vbGVhbjtcbiAgICBwdWJsaWMgbGFiZWxQb3NpdGlvbjogRGF0YUZvcm1MYWJlbFBvc2l0aW9uO1xuICAgIHB1YmxpYyBsYWJlbFdpZHRoOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIGVkaXRvckhvcml6b250YWxPZmZzZXRQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvclN0eWxlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImVkaXRvckhvcml6b250YWxPZmZzZXRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkVkaXRvckhvcml6b250YWxPZmZzZXRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBlZGl0b3JWZXJ0aWNhbE9mZnNldFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5RWRpdG9yU3R5bGUsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiZWRpdG9yVmVydGljYWxPZmZzZXRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkVkaXRvclZlcnRpY2FsT2Zmc2V0UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgbGFiZWxIb3Jpem9udGFsT2Zmc2V0UHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UHJvcGVydHlFZGl0b3JTdHlsZSwgbnVtYmVyPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJsYWJlbEhvcml6b250YWxPZmZzZXRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkxhYmVsSG9yaXpvbnRhbE9mZnNldFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxhYmVsVmVydGljYWxPZmZzZXRQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvclN0eWxlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhYmVsVmVydGljYWxPZmZzZXRcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkxhYmVsVmVydGljYWxPZmZzZXRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBsYWJlbEhpZGRlblByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5RWRpdG9yU3R5bGUsIGJvb2xlYW4+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhYmVsSGlkZGVuXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBib29sZWFuQ29udmVydGVyLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25MYWJlbEhpZGRlblByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxhYmVsUG9zaXRpb25Qcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvclN0eWxlLCBEYXRhRm9ybUxhYmVsUG9zaXRpb24+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhYmVsUG9zaXRpb25cIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gRGF0YUZvcm1MYWJlbFBvc2l0aW9uW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTGFiZWxQb3NpdGlvblByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxhYmVsV2lkdGhQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvclN0eWxlLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImxhYmVsV2lkdGhcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogLTEsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogcGFyc2VGbG9hdCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTGFiZWxXaWR0aFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uRWRpdG9ySG9yaXpvbnRhbE9mZnNldFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25FZGl0b3JIb3Jpem9udGFsT2Zmc2V0Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVkaXRvckhvcml6b250YWxPZmZzZXRDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRWRpdG9yVmVydGljYWxPZmZzZXRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uRWRpdG9yVmVydGljYWxPZmZzZXRDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRWRpdG9yVmVydGljYWxPZmZzZXRDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGFiZWxIb3Jpem9udGFsT2Zmc2V0UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkxhYmVsSG9yaXpvbnRhbE9mZnNldENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYWJlbEhvcml6b250YWxPZmZzZXRDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGFiZWxWZXJ0aWNhbE9mZnNldFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25MYWJlbFZlcnRpY2FsT2Zmc2V0Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxhYmVsVmVydGljYWxPZmZzZXRDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTGFiZWxIaWRkZW5Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMub25MYWJlbEhpZGRlbkNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYWJlbEhpZGRlbkNoYW5nZWQob2xkVmFsdWU6IGJvb2xlYW4sIG5ld1ZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxhYmVsUG9zaXRpb25Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IERhdGFGb3JtTGFiZWxQb3NpdGlvbiwgbmV3VmFsdWU6IERhdGFGb3JtTGFiZWxQb3NpdGlvbikge1xuICAgICAgICB0aGlzLm9uTGFiZWxQb3NpdGlvbkNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYWJlbFBvc2l0aW9uQ2hhbmdlZChvbGRWYWx1ZTogRGF0YUZvcm1MYWJlbFBvc2l0aW9uLCBuZXdWYWx1ZTogRGF0YUZvcm1MYWJlbFBvc2l0aW9uKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkxhYmVsV2lkdGhQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLm9uTGFiZWxXaWR0aENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25MYWJlbFdpZHRoQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgfVxufVxuUHJvcGVydHlFZGl0b3JTdHlsZS5lZGl0b3JIb3Jpem9udGFsT2Zmc2V0UHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlFZGl0b3JTdHlsZSk7XG5Qcm9wZXJ0eUVkaXRvclN0eWxlLmVkaXRvclZlcnRpY2FsT2Zmc2V0UHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlFZGl0b3JTdHlsZSk7XG5Qcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsSG9yaXpvbnRhbE9mZnNldFByb3BlcnR5LnJlZ2lzdGVyKFByb3BlcnR5RWRpdG9yU3R5bGUpO1xuUHJvcGVydHlFZGl0b3JTdHlsZS5sYWJlbFZlcnRpY2FsT2Zmc2V0UHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlFZGl0b3JTdHlsZSk7XG5Qcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsSGlkZGVuUHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlFZGl0b3JTdHlsZSk7XG5Qcm9wZXJ0eUVkaXRvclN0eWxlLmxhYmVsUG9zaXRpb25Qcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUVkaXRvclN0eWxlKTtcblByb3BlcnR5RWRpdG9yU3R5bGUubGFiZWxXaWR0aFByb3BlcnR5LnJlZ2lzdGVyKFByb3BlcnR5RWRpdG9yU3R5bGUpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBuYW1lIDogdGhlIG5hbWUgb2YgYm91bmQgZW50aXR5IHByb3BlcnR5XG4vLyBkaXNwbGF5TmFtZSAgOiB0aGUgbGFiZWwgdG8gYmUgc2hvd24gZm9yIGVkaXRvclxuLy8gaW5kZXggOiB0aGUgaW5kZXggaW4gZ3JvdXBcbi8vIGhpZGRlbiA6IGJvb2xlYW4gZm9yIHNob3cvaGlkZSBvZiBlZGl0b3Jcbi8vIHJlYWRPbmx5IDogYm9vbGVhbiAsIHJlYWQgb25seSBzdGF0ZVxuLy8gcmVxdWlyZWQgOiBib29sZWFuICwgaWYgdGhlIHZhbHVlIGlzIHJlcXVpcmVkLiBOb3RlOiBjb25zaWRlciB0byBtb3ZlIHRoaXMgdG8gdmFsaWRhdG9yXG4vLyBoaW50VGV4dCA6IHN0cmluZywgdGhlIGdyYXkgdGV4dCBzaG93biBhcyBoaW50IGluIGVtcHR5IGVkaXRvclxuLy8gZWRpdG9yIDogUHJvcGVydHlFZGl0b3IgZGVyaXZlZCBpbnN0YW5jZSB3aXRoIHNwZWNpZmljIHByb3BlcnRpZXMgZm9yIGVkaXRvcnNcbi8vIHZhbHVlc1Byb3ZpZGVyIDogYW4gYXJyYXkgb3IgY29tbWEgc2VwYXJhdGVkIHN0cmluZyB3aXRoIHZhbHVlcyB1c2VkIGJ5IHNvbWUgZWRpdG9yc1xuLy8gY29udmVydGVyIDogUHJvcGVydHlDb252ZXJ0ZXIgZGVyaXZlZCBpbnN0YW5jZSB3aXRoIHNwZWNpZmljIHByb3BlcnRpZXMgZm9yIGRhdGEgY29udmVyc2lvblxuLy8gdmFsaWRhdG9yIDogUHJvcGVydHlWYWxpZGF0b3Jcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBjbGFzcyBFbnRpdHlQcm9wZXJ0eSBleHRlbmRzIFZpZXcgaW1wbGVtZW50cyBBZGRBcnJheUZyb21CdWlsZGVyIHtcblxuICAgIHByaXZhdGUgbmFtZVByb3BlcnR5U2lsZW50VXBkYXRlID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgZWRpdG9yOiBQcm9wZXJ0eUVkaXRvcjtcbiAgICBwdWJsaWMgdmFsaWRhdG9yczogQXJyYXk8UHJvcGVydHlWYWxpZGF0b3I+O1xuICAgIHB1YmxpYyBjb252ZXJ0ZXI6IFByb3BlcnR5Q29udmVydGVyO1xuICAgIHB1YmxpYyB2YWx1ZXNQcm92aWRlcjogYW55O1xuICAgIHB1YmxpYyBhdXRvQ29tcGxldGVEaXNwbGF5TW9kZTogQXV0b0NvbXBsZXRlRGlzcGxheU1vZGU7XG4gICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgICBwdWJsaWMgaW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgY29sdW1uSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xuICAgIHB1YmxpYyByZWFkT25seTogYm9vbGVhbjtcbiAgICBwdWJsaWMgcmVxdWlyZWQ6IGJvb2xlYW47XG4gICAgcHVibGljIGhpbnRUZXh0OiBzdHJpbmc7XG4gICAgcHVibGljIGltYWdlUmVzb3VyY2U6IGFueTtcbiAgICBwdWJsaWMgZXJyb3JNZXNzYWdlOiBzdHJpbmcgPSBcIlRoaXMgaXMgbm90IHZhbGlkLlwiO1xuICAgIHB1YmxpYyBzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgcHJvdGVjdGVkIHZhbHVlc1Byb3ZpZGVyQXJyYXk6IEFycmF5PGFueT47XG5cbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlQ2FuZGlkYXRlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGFuZHJvaWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaW9zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBlZGl0b3JQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxFbnRpdHlQcm9wZXJ0eSwgUHJvcGVydHlFZGl0b3I+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImVkaXRvclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkVkaXRvclByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIHZhbGlkYXRvcnNQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxFbnRpdHlQcm9wZXJ0eSwgQXJyYXk8UHJvcGVydHlWYWxpZGF0b3I+PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ2YWxpZGF0b3JzXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVmFsaWRhdG9yc1Byb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnZlcnRlclByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBQcm9wZXJ0eUNvbnZlcnRlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiY29udmVydGVyXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ29udmVydGVyUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgdmFsdWVzUHJvdmlkZXJQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxFbnRpdHlQcm9wZXJ0eSwgYW55PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ2YWx1ZXNQcm92aWRlclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblZhbHVlc1Byb3ZpZGVyUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgYXV0b0NvbXBsZXRlRGlzcGxheU1vZGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxFbnRpdHlQcm9wZXJ0eSwgQXV0b0NvbXBsZXRlRGlzcGxheU1vZGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImF1dG9Db21wbGV0ZURpc3BsYXlNb2RlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiAodmFsdWUpID0+IEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQXV0b0NvbXBsZXRlRGlzcGxheU1vZGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBuYW1lUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RW50aXR5UHJvcGVydHksIHN0cmluZz4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibmFtZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBzdHJpbmc+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImRpc3BsYXlOYW1lXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uRGlzcGxheU5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbmRleFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImluZGV4XCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUludCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uSW5kZXhQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb2x1bW5JbmRleFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImNvbHVtbkluZGV4XCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBwYXJzZUludCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uQ29sdW1uSW5kZXhQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBoaWRkZW5Qcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxFbnRpdHlQcm9wZXJ0eSwgYm9vbGVhbj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiaGlkZGVuXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ29udmVydGVyOiBib29sZWFuQ29udmVydGVyLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25IaWRkZW5Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyByZWFkT25seVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJyZWFkT25seVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uUmVhZE9ubHlQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyByZXF1aXJlZFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBib29sZWFuPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJyZXF1aXJlZFwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogYm9vbGVhbkNvbnZlcnRlcixcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uUmVxdWlyZWRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBoaW50VGV4dFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PEVudGl0eVByb3BlcnR5LCBzdHJpbmc+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcImhpbnRUZXh0XCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uSGludFRleHRQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBpbWFnZVJlc291cmNlUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RW50aXR5UHJvcGVydHksIGFueT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiaW1hZ2VSZXNvdXJjZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbkltYWdlUmVzb3VyY2VQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkVkaXRvclByb3BlcnR5Q2hhbmdlZCh0aGlzOiBFbnRpdHlQcm9wZXJ0eSwgb2xkVmFsdWU6IFByb3BlcnR5RWRpdG9yLCBuZXdWYWx1ZTogUHJvcGVydHlFZGl0b3IpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ3R5cGVDaGFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHR5cGVDaGFuZ2VGdW5jdGlvbiA9IGZ1bmN0aW9uICh0aGlzOiBFbnRpdHlQcm9wZXJ0eSwgcHJvcGVydHlDaGFuZ2VEYXRhOiBvYnNlcnZhYmxlLlByb3BlcnR5Q2hhbmdlRGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25FZGl0b3JUeXBlQ2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCd0eXBlQ2hhbmdlJywgdHlwZUNoYW5nZUZ1bmN0aW9uLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25FZGl0b3JDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGVhY2hDaGlsZChjYWxsYmFjazogKGNoaWxkOiBWaWV3QmFzZSkgPT4gYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVkaXRvclR5cGVDaGFuZ2VkKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUVkaXRvcih0aGlzLmVkaXRvcik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblZhbGlkYXRvcnNQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IEFycmF5PFByb3BlcnR5VmFsaWRhdG9yPiwgbmV3VmFsdWU6IEFycmF5PFByb3BlcnR5VmFsaWRhdG9yPikge1xuICAgICAgICB0aGlzLm9uVmFsaWRhdG9yc0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uQ29udmVydGVyUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBQcm9wZXJ0eUNvbnZlcnRlciwgbmV3VmFsdWU6IFByb3BlcnR5Q29udmVydGVyKSB7XG4gICAgICAgIHRoaXMub25Db252ZXJ0ZXJDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblZhbHVlc1Byb3ZpZGVyUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblZhbHVlc1Byb3ZpZGVyQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25BdXRvQ29tcGxldGVEaXNwbGF5TW9kZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogQXV0b0NvbXBsZXRlRGlzcGxheU1vZGUsIG5ld1ZhbHVlOiBBdXRvQ29tcGxldGVEaXNwbGF5TW9kZSkge1xuICAgICAgICB0aGlzLm9uQXV0b0NvbXBsZXRlRGlzcGxheU1vZGVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbk5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5uYW1lUHJvcGVydHlTaWxlbnRVcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMubmFtZVByb3BlcnR5U2lsZW50VXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZFZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMub25OYW1lQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYW1lUHJvcGVydHlTaWxlbnRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gb2xkVmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIldhcnJpbmc6IEVudGl0eVByb3BlcnR5J3MgbmFtZSBpcyBhbHJlYWR5IHNldCBhbmQgY2FuJ3QgYmUgY2hhbmdlZC5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRGlzcGxheU5hbWVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLm9uRGlzcGxheU5hbWVDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkluZGV4UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbkluZGV4Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Db2x1bW5JbmRleFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25Db2x1bW5JbmRleENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uSGlkZGVuUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLm9uSGlkZGVuQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25SZWFkT25seVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vblJlYWRPbmx5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25SZXF1aXJlZFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vblJlcXVpcmVkQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25IaW50VGV4dFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25IaW50VGV4dENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uSW1hZ2VSZXNvdXJjZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMub25JbWFnZVJlc291cmNlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBfYWRkQXJyYXlGcm9tQnVpbGRlcihuYW1lOiBzdHJpbmcsIHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgICAgIGlmIChuYW1lID09PSBcInZhbGlkYXRvcnNcIikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3JzID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FZGl0b3JDaGFuZ2VkKG9sZFZhbHVlOiBQcm9wZXJ0eUVkaXRvciwgbmV3VmFsdWU6IFByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb3BlcnR5RWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUVkaXRvcihuZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25WYWxpZGF0b3JzQ2hhbmdlZChvbGRWYWx1ZTogQXJyYXk8UHJvcGVydHlWYWxpZGF0b3I+LCBuZXdWYWx1ZTogQXJyYXk8UHJvcGVydHlWYWxpZGF0b3I+KSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAmJiBuZXdWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZVZhbGlkYXRvcnMobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ29udmVydGVyQ2hhbmdlZChvbGRWYWx1ZTogUHJvcGVydHlDb252ZXJ0ZXIsIG5ld1ZhbHVlOiBQcm9wZXJ0eUNvbnZlcnRlcikge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTmF0aXZlQ29udmVydGVyKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblZhbHVlc1Byb3ZpZGVyQ2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgbGV0IHNpbXBsaWZpZWRBcnJheTtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICAgICAgICAgIHNpbXBsaWZpZWRBcnJheSA9IEFycmF5LmZyb20obmV3VmFsdWUudmFsdWVzKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ29udmVydGVyV2l0aChudWxsLCBudWxsLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NvbnRhaW5zSXRlbXNBcnJheShuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5UHJvcGVydHkgPSB0aGlzLl9nZXRLZXlQcm9wZXJ0eSh0aGlzLnZhbHVlc1Byb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICBsZXQgbGFiZWxQcm9wZXJ0eSA9IHRoaXMuX2dldExhYmVsUHJvcGVydHkodGhpcy52YWx1ZXNQcm92aWRlcik7XG4gICAgICAgICAgICAgICAgc2ltcGxpZmllZEFycmF5ID0gbmV3VmFsdWUuaXRlbXMubWFwKGl0ZW0gPT4gaXRlbVtsYWJlbFByb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDb252ZXJ0ZXJXaXRoKGtleVByb3BlcnR5LCBsYWJlbFByb3BlcnR5LCBuZXdWYWx1ZS5pdGVtcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2lzS2V5TGFiZWxzQXJyYXkobmV3VmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgc2ltcGxpZmllZEFycmF5ID0gbmV3VmFsdWUubWFwKGl0ZW0gPT4gaXRlbVtcImxhYmVsXCJdKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENvbnZlcnRlcldpdGgoXCJrZXlcIiwgXCJsYWJlbFwiLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHNpbXBsaWZpZWRBcnJheSA9IG5ld1ZhbHVlLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNpbXBsaWZpZWRBcnJheSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1Byb3ZpZGVyQXJyYXkgPSBzaW1wbGlmaWVkQXJyYXk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZVZhbHVlc1Byb3ZpZGVyKHNpbXBsaWZpZWRBcnJheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX3NldHVwQ29udmVydGVyV2l0aChrZXk6IHN0cmluZywgbGFiZWw6IHN0cmluZywgaXRlbXM6IGFueSkge1xuICAgICAgICBsZXQgY29udmVydGVyO1xuICAgICAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgICAgICAgIGNvbnZlcnRlciA9IG5ldyBWYWx1ZXNQcm92aWRlck1hcENvbnZlcnRlcihpdGVtcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb252ZXJ0ZXIgPSBuZXcgVmFsdWVzUHJvdmlkZXJBcnJheUNvbnZlcnRlcihrZXksIGxhYmVsLCBpdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIgPSBjb252ZXJ0ZXI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY29udGFpbnNJdGVtc0FycmF5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KFwiaXRlbXNcIikpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVtcIml0ZW1zXCJdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfaXNLZXlMYWJlbHNBcnJheSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdmFsdWVbMF07XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoXCJrZXlcIikgJiZcbiAgICAgICAgICAgICAgICAgICAgKGl0ZW0uaGFzT3duUHJvcGVydHkoXCJsYWJlbFwiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRLZXlQcm9wZXJ0eSh2YWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcImtleVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlW1wia2V5XCJdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcImtleVByb3BlcnR5XCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVbXCJrZXlQcm9wZXJ0eVwiXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJrZXlcIjtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9nZXRMYWJlbFByb3BlcnR5KHZhbHVlOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KFwibGFiZWxcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVtcImxhYmVsXCJdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShcImxhYmVsUHJvcGVydHlcIikpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVtcImxhYmVsUHJvcGVydHlcIl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwibGFiZWxcIjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25BdXRvQ29tcGxldGVEaXNwbGF5TW9kZUNoYW5nZWQob2xkVmFsdWU6IEF1dG9Db21wbGV0ZURpc3BsYXlNb2RlLCBuZXdWYWx1ZTogQXV0b0NvbXBsZXRlRGlzcGxheU1vZGUpIHtcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUF1dG9Db21wbGV0ZURpc3BsYXlNb2RlKG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk5hbWVDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EaXNwbGF5TmFtZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTmF0aXZlRGlzcGxheU5hbWUobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSW5kZXhDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc05hTihuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTmF0aXZlSW5kZXgobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ29sdW1uSW5kZXhDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKCFpc05hTihuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTmF0aXZlQ29sdW1uSW5kZXgobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSGlkZGVuQ2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVIaWRkZW4obmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblJlYWRPbmx5Q2hhbmdlZChvbGRWYWx1ZTogYm9vbGVhbiwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy51cGRhdGVOYXRpdmVSZWFkT25seShuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUmVxdWlyZWRDaGFuZ2VkKG9sZFZhbHVlOiBib29sZWFuLCBuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZVJlcXVpcmVkKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25IaW50VGV4dENoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnVwZGF0ZU5hdGl2ZUhpbnRUZXh0KG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JbWFnZVJlc291cmNlQ2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmltYWdlUmVzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW1hZ2VSZXNvdXJjZS5pbmRleE9mKHV0aWxzLlJFU09VUkNFX1BSRUZJWCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlUmVzb3VyY2UgPSB0aGlzLmltYWdlUmVzb3VyY2Uuc3Vic3RyKHV0aWxzLlJFU09VUkNFX1BSRUZJWC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTmF0aXZlSW1hZ2VSZXNvdXJjZSh0aGlzLmltYWdlUmVzb3VyY2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVFZGl0b3IodmFsdWU6IFByb3BlcnR5RWRpdG9yKSB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVZhbGlkYXRvcnModmFsdWU6IEFycmF5PFByb3BlcnR5VmFsaWRhdG9yPikge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVDb252ZXJ0ZXIodmFsdWU6IFByb3BlcnR5Q29udmVydGVyKSB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZVZhbHVlc1Byb3ZpZGVyKHZhbHVlOiBBcnJheTxhbnk+KSB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZUF1dG9Db21wbGV0ZURpc3BsYXlNb2RlKHZhbHVlOiBBdXRvQ29tcGxldGVEaXNwbGF5TW9kZSkge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVEaXNwbGF5TmFtZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZU5hdGl2ZUluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlQ29sdW1uSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVIaWRkZW4odmFsdWU6IGJvb2xlYW4pIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlUmVhZE9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlUmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTmF0aXZlSGludFRleHQodmFsdWU6IHN0cmluZykge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVOYXRpdmVJbWFnZVJlc291cmNlKHZhbHVlOiBhbnkpIHtcbiAgICB9XG59XG5FbnRpdHlQcm9wZXJ0eS5lZGl0b3JQcm9wZXJ0eS5yZWdpc3RlcihFbnRpdHlQcm9wZXJ0eSk7XG5FbnRpdHlQcm9wZXJ0eS52YWxpZGF0b3JzUHJvcGVydHkucmVnaXN0ZXIoRW50aXR5UHJvcGVydHkpO1xuRW50aXR5UHJvcGVydHkuY29udmVydGVyUHJvcGVydHkucmVnaXN0ZXIoRW50aXR5UHJvcGVydHkpO1xuRW50aXR5UHJvcGVydHkudmFsdWVzUHJvdmlkZXJQcm9wZXJ0eS5yZWdpc3RlcihFbnRpdHlQcm9wZXJ0eSk7XG5FbnRpdHlQcm9wZXJ0eS5hdXRvQ29tcGxldGVEaXNwbGF5TW9kZVByb3BlcnR5LnJlZ2lzdGVyKEVudGl0eVByb3BlcnR5KTtcbkVudGl0eVByb3BlcnR5Lm5hbWVQcm9wZXJ0eS5yZWdpc3RlcihFbnRpdHlQcm9wZXJ0eSk7XG5FbnRpdHlQcm9wZXJ0eS5kaXNwbGF5TmFtZVByb3BlcnR5LnJlZ2lzdGVyKEVudGl0eVByb3BlcnR5KTtcbkVudGl0eVByb3BlcnR5LmluZGV4UHJvcGVydHkucmVnaXN0ZXIoRW50aXR5UHJvcGVydHkpO1xuRW50aXR5UHJvcGVydHkuY29sdW1uSW5kZXhQcm9wZXJ0eS5yZWdpc3RlcihFbnRpdHlQcm9wZXJ0eSk7XG5FbnRpdHlQcm9wZXJ0eS5oaWRkZW5Qcm9wZXJ0eS5yZWdpc3RlcihFbnRpdHlQcm9wZXJ0eSk7XG5FbnRpdHlQcm9wZXJ0eS5yZWFkT25seVByb3BlcnR5LnJlZ2lzdGVyKEVudGl0eVByb3BlcnR5KTtcbkVudGl0eVByb3BlcnR5LnJlcXVpcmVkUHJvcGVydHkucmVnaXN0ZXIoRW50aXR5UHJvcGVydHkpO1xuRW50aXR5UHJvcGVydHkuaGludFRleHRQcm9wZXJ0eS5yZWdpc3RlcihFbnRpdHlQcm9wZXJ0eSk7XG5FbnRpdHlQcm9wZXJ0eS5pbWFnZVJlc291cmNlUHJvcGVydHkucmVnaXN0ZXIoRW50aXR5UHJvcGVydHkpO1xuXG5leHBvcnQgY2xhc3MgRGF0YUZvcm1FZGl0b3JMYWJlbCBleHRlbmRzIFZpZXcge1xuICAgIGdldCBhbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgaW9zKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIERhdGFGb3JtRWRpdG9yQ29yZSBleHRlbmRzIFZpZXcge1xuICAgIGdldCBhbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgaW9zKCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyB0eXBlIDogdHllIHR5cGUgb2YgdGhlIGVkaXRvciB0byBiZSB1c2VkIGZvciB0aGlzIHByb3BlcnR5XG4vLyBzdHlsZSA6IEVkaXRvclN0eWxlIGluc3RhbmNlXG4vLyB0b2RvOiBleHRlbmQgd2l0aCBjb21tb24gZWRpdG9yIHByb3BlcnRpZXNcbmV4cG9ydCBjbGFzcyBQcm9wZXJ0eUVkaXRvciBleHRlbmRzIFZpZXcge1xuICAgIHB1YmxpYyB0eXBlOiBzdHJpbmc7XG4gICAgcHVibGljIHByb3BlcnR5RWRpdG9yU3R5bGU6IFByb3BlcnR5RWRpdG9yU3R5bGU7XG4gICAgcHVibGljIHBhcmFtczogUHJvcGVydHlFZGl0b3JQYXJhbXM7XG5cbiAgICBnZXQgZWRpdG9yQ29yZSgpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGFuZHJvaWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaW9zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGVhY2hDaGlsZChjYWxsYmFjazogKGNoaWxkOiBWaWV3QmFzZSkgPT4gYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5sYWJlbCAmJiB0aGlzLmVkaXRvckNvcmUpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubGFiZWwpO1xuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5lZGl0b3JDb3JlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgdHlwZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5RWRpdG9yLCBEYXRhRm9ybUVkaXRvclR5cGU+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInR5cGVcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6ICh2YWx1ZSkgPT4gRGF0YUZvcm1FZGl0b3JUeXBlW3ZhbHVlXSxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uVHlwZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwdWJsaWMgc3RhdGljIHByb3BlcnR5RWRpdG9yU3R5bGVQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvciwgUHJvcGVydHlFZGl0b3JTdHlsZT4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwicHJvcGVydHlFZGl0b3JTdHlsZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblByb3BlcnR5RWRpdG9yU3R5bGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBwYXJhbXNQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eUVkaXRvciwgUHJvcGVydHlFZGl0b3JQYXJhbXM+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInBhcmFtc1wiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblBhcmFtc1Byb3BlcnR5SW50ZXJuYWxDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHB1YmxpYyBzdGF0aWMgcG9zaXRpb25Qcm9wZXJ0eSA9IG5ldyBDc3NQcm9wZXJ0eTxTdHlsZSwgXCJsZWZ0XCIgfCBcInRvcFwiPih7IG5hbWU6IFwicG9zaXRpb25cIiwgY3NzTmFtZTogXCJwb3NpdGlvblwiIH0pO1xuICAgIHB1YmxpYyBzdGF0aWMgc2VwYXJhdG9yQ29sb3JQcm9wZXJ0eSA9IG5ldyBDc3NQcm9wZXJ0eTxTdHlsZSwgQ29sb3I+KHsgbmFtZTogXCJzZXBhcmF0b3JDb2xvclwiLCBjc3NOYW1lOiBcInNlcGFyYXRvci1jb2xvclwiIH0pO1xuXG4gICAgcHJpdmF0ZSBvblR5cGVQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWU6IERhdGFGb3JtRWRpdG9yVHlwZSwgbmV3VmFsdWU6IERhdGFGb3JtRWRpdG9yVHlwZSkge1xuICAgICAgICB0aGlzLm9uVHlwZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUHJvcGVydHlFZGl0b3JTdHlsZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogUHJvcGVydHlFZGl0b3JTdHlsZSwgbmV3VmFsdWU6IFByb3BlcnR5RWRpdG9yU3R5bGUpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ2VkaXRvckhvcml6b250YWxPZmZzZXRDaGFuZ2UnKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignZWRpdG9yVmVydGljYWxPZmZzZXRDaGFuZ2UnKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbGFiZWxIb3Jpem9udGFsT2Zmc2V0Q2hhbmdlJyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ2xhYmVsVmVydGljYWxPZmZzZXRDaGFuZ2UnKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbGFiZWxIaWRkZW5DaGFuZ2UnKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbGFiZWxQb3NpdGlvbkNoYW5nZScpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdsYWJlbFdpZHRoQ2hhbmdlJyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ3N0cm9rZUNvbG9yQ2hhbmdlJyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ3N0cm9rZVdpZHRoQ2hhbmdlJyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ2ZpbGxDb2xvckNoYW5nZScpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdzZXBhcmF0b3JDb2xvckNoYW5nZScpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdsYWJlbFRleHRDb2xvckNoYW5nZScpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdsYWJlbFRleHRTaXplQ2hhbmdlJyk7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ2xhYmVsRm9udE5hbWVDaGFuZ2UnKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbGFiZWxGb250U3R5bGVDaGFuZ2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgY2hhbmdlSGFuZGxlciA9IChmdW5jdGlvbiAodGhpczogUHJvcGVydHlFZGl0b3IsIHByb3BlcnR5Q2hhbmdlRGF0YTogb2JzZXJ2YWJsZS5Qcm9wZXJ0eUNoYW5nZURhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU3R5bGVQcm9wZXJ0eUNoYW5nZWQocHJvcGVydHlDaGFuZ2VEYXRhLnByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2VkaXRvckhvcml6b250YWxPZmZzZXRDaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdlZGl0b3JWZXJ0aWNhbE9mZnNldENoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsSG9yaXpvbnRhbE9mZnNldENoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsVmVydGljYWxPZmZzZXRDaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdsYWJlbEhpZGRlbkNoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsUG9zaXRpb25DaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdsYWJlbFdpZHRoQ2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignc3Ryb2tlQ29sb3JDaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdzdHJva2VXaWR0aENoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2ZpbGxDb2xvckNoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ3NlcGFyYXRvckNvbG9yQ2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignbGFiZWxUZXh0Q29sb3JDaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdsYWJlbFRleHRTaXplQ2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignbGFiZWxGb250TmFtZUNoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgbmV3VmFsdWUub24oJ2xhYmVsRm9udFN0eWxlQ2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUHJvcGVydHlFZGl0b3JTdHlsZUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUGFyYW1zUHJvcGVydHlJbnRlcm5hbENoYW5nZWQob2xkVmFsdWU6IFByb3BlcnR5RWRpdG9yUGFyYW1zLCBuZXdWYWx1ZTogUHJvcGVydHlFZGl0b3JQYXJhbXMpIHtcbiAgICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgICAgICBvbGRWYWx1ZS5vZmYoJ21pbmltdW1DaGFuZ2UnKTtcbiAgICAgICAgICAgIG9sZFZhbHVlLm9mZignbWF4aW11bUNoYW5nZScpO1xuICAgICAgICAgICAgb2xkVmFsdWUub2ZmKCdzdGVwQ2hhbmdlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGxldCBjaGFuZ2VIYW5kbGVyID0gKGZ1bmN0aW9uICh0aGlzOiBQcm9wZXJ0eUVkaXRvciwgcHJvcGVydHlDaGFuZ2VEYXRhOiBvYnNlcnZhYmxlLlByb3BlcnR5Q2hhbmdlRGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25QYXJhbXNQcm9wZXJ0eUNoYW5nZWQocHJvcGVydHlDaGFuZ2VEYXRhLnByb3BlcnR5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgbmV3VmFsdWUub24oJ21pbmltdW1DaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIG5ld1ZhbHVlLm9uKCdtYXhpbXVtQ2hhbmdlJywgY2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICBuZXdWYWx1ZS5vbignc3RlcENoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblBhcmFtc0NoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdHlsZVByb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblBhcmFtc1Byb3BlcnR5Q2hhbmdlZChwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblR5cGVDaGFuZ2VkKG9sZFZhbHVlOiBEYXRhRm9ybUVkaXRvclR5cGUsIG5ld1ZhbHVlOiBEYXRhRm9ybUVkaXRvclR5cGUpIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Qcm9wZXJ0eUVkaXRvclN0eWxlQ2hhbmdlZChvbGRWYWx1ZTogUHJvcGVydHlFZGl0b3JTdHlsZSwgbmV3VmFsdWU6IFByb3BlcnR5RWRpdG9yU3R5bGUpIHtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25QYXJhbXNDaGFuZ2VkKG9sZFZhbHVlOiBQcm9wZXJ0eUVkaXRvclBhcmFtcywgbmV3VmFsdWU6IFByb3BlcnR5RWRpdG9yUGFyYW1zKSB7XG4gICAgfVxufVxuUHJvcGVydHlFZGl0b3IudHlwZVByb3BlcnR5LnJlZ2lzdGVyKFByb3BlcnR5RWRpdG9yKTtcblByb3BlcnR5RWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGVQcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUVkaXRvcik7XG5Qcm9wZXJ0eUVkaXRvci5wYXJhbXNQcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eUVkaXRvcik7XG5Qcm9wZXJ0eUVkaXRvci5wb3NpdGlvblByb3BlcnR5LnJlZ2lzdGVyKFN0eWxlKTtcblByb3BlcnR5RWRpdG9yLnNlcGFyYXRvckNvbG9yUHJvcGVydHkucmVnaXN0ZXIoU3R5bGUpO1xuXG5cbmV4cG9ydCBjbGFzcyBDdXN0b21Qcm9wZXJ0eUVkaXRvciBleHRlbmRzIFByb3BlcnR5RWRpdG9yIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgZWRpdG9yTmVlZHNWaWV3RXZlbnQ6IHN0cmluZyA9IFwiZWRpdG9yTmVlZHNWaWV3XCI7XG4gICAgcHVibGljIHN0YXRpYyBlZGl0b3JIYXNUb0FwcGx5VmFsdWVFdmVudDogc3RyaW5nID0gXCJlZGl0b3JIYXNUb0FwcGx5VmFsdWVcIjtcbiAgICBwdWJsaWMgc3RhdGljIGVkaXRvck5lZWRzVmFsdWVFdmVudDogc3RyaW5nID0gXCJlZGl0b3JOZWVkc1ZhbHVlXCI7XG5cbiAgICBnZXQgYW5kcm9pZCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBpb3MoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgbm90aWZ5VmFsdWVDaGFuZ2VkKCk6IHZvaWQge1xuICAgIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBlcnJvck1lc3NhZ2UgOiBtZXNzYWdlIG9uIGVycm9yXG4vLyBzdWNjZXNzTWVzc2FnZSA6IG1lc3NhZ2Ugb24gc3VjY2Vzc1xuZXhwb3J0IGNsYXNzIFByb3BlcnR5VmFsaWRhdG9yIGV4dGVuZHMgVmlld0Jhc2Uge1xuXG4gICAgcHVibGljIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgZ2V0IGFuZHJvaWQoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBnZXQgaW9zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBlcnJvck1lc3NhZ2VQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxQcm9wZXJ0eVZhbGlkYXRvciwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJlcnJvck1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25FcnJvck1lc3NhZ2VQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBzdWNjZXNzTWVzc2FnZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFByb3BlcnR5VmFsaWRhdG9yLCBzdHJpbmc+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInN1Y2Nlc3NNZXNzYWdlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uU3VjY2Vzc01lc3NhZ2VQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkVycm9yTWVzc2FnZVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25FcnJvck1lc3NhZ2VDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblN1Y2Nlc3NNZXNzYWdlUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vblN1Y2Nlc3NNZXNzYWdlQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkVycm9yTWVzc2FnZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHsgLy8gbm90ZTogbm90IHdpc2UgYnV0IGRvbid0IHdhbnQgdG8gb3ZlcndyaXRlIHRoaXMgbWV0aG9kIGluIGFsbCBzdWJjbGFzc2VzXG4gICAgICAgICAgICBpZiAodGhpcy5pb3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlvcy5lcnJvck1lc3NhZ2UgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmRyb2lkLnNldE5lZ2F0aXZlTWVzc2FnZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzTWVzc2FnZUNoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAobmV3VmFsdWUpIHsgLy8gbm90ZTogbm90IHdpc2UgYnV0IGRvbid0IHdhbnQgdG8gb3ZlcndyaXRlIHRoaXMgbWV0aG9kIGluIGFsbCBzdWJjbGFzc2VzXG4gICAgICAgICAgICBpZiAodGhpcy5pb3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlvcy5wb3NpdGl2ZU1lc3NhZ2UgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmRyb2lkLnNldFBvc2l0aXZlTWVzc2FnZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuUHJvcGVydHlWYWxpZGF0b3IuZXJyb3JNZXNzYWdlUHJvcGVydHkucmVnaXN0ZXIoUHJvcGVydHlWYWxpZGF0b3IpO1xuUHJvcGVydHlWYWxpZGF0b3Iuc3VjY2Vzc01lc3NhZ2VQcm9wZXJ0eS5yZWdpc3RlcihQcm9wZXJ0eVZhbGlkYXRvcik7XG5cblxuZXhwb3J0IGNsYXNzIExlbmd0aFZhbGlkYXRvciBleHRlbmRzIFByb3BlcnR5VmFsaWRhdG9yIHtcbiAgICBwdWJsaWMgbGVuZ3RoOiBudW1iZXI7XG5cbiAgICBwdWJsaWMgc3RhdGljIGxlbmd0aFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PExlbmd0aFZhbGlkYXRvciwgbnVtYmVyPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJsZW5ndGhcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlSW50LFxuICAgICAgICAgICAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQub25MZW5ndGhQcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbkxlbmd0aFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25MZW5ndGhDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTGVuZ3RoQ2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWluaW11bS9tYXhpbXVtIHNldHRlciBpbiBwYXJlbnRcIik7XG4gICAgfVxufVxuTGVuZ3RoVmFsaWRhdG9yLmxlbmd0aFByb3BlcnR5LnJlZ2lzdGVyKExlbmd0aFZhbGlkYXRvcik7XG5cblxuZXhwb3J0IGNsYXNzIE1pbmltdW1MZW5ndGhWYWxpZGF0b3IgZXh0ZW5kcyBMZW5ndGhWYWxpZGF0b3Ige1xufVxuXG5leHBvcnQgY2xhc3MgTWF4aW11bUxlbmd0aFZhbGlkYXRvciBleHRlbmRzIExlbmd0aFZhbGlkYXRvciB7XG59XG5cbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkYXRvciBleHRlbmRzIFByb3BlcnR5VmFsaWRhdG9yIHtcblxufVxuXG5leHBvcnQgY2xhc3MgTm9uRW1wdHlWYWxpZGF0b3IgZXh0ZW5kcyBQcm9wZXJ0eVZhbGlkYXRvciB7XG5cbn1cblxuZXhwb3J0IGNsYXNzIFJhbmdlVmFsaWRhdG9yIGV4dGVuZHMgUHJvcGVydHlWYWxpZGF0b3Ige1xuICAgIHB1YmxpYyBtYXhpbXVtOiBudW1iZXI7XG4gICAgcHVibGljIG1pbmltdW06IG51bWJlcjtcblxuICAgIHB1YmxpYyBzdGF0aWMgbWluaW11bVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFJhbmdlVmFsaWRhdG9yLCBudW1iZXI+KFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIm1pbmltdW1cIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgdmFsdWVDb252ZXJ0ZXI6IHBhcnNlRmxvYXQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vbk1pbmltdW1Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHVibGljIHN0YXRpYyBtYXhpbXVtUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8UmFuZ2VWYWxpZGF0b3IsIG51bWJlcj4oXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwibWF4aW11bVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNvbnZlcnRlcjogcGFyc2VGbG9hdCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uTWF4aW11bVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICBwcml2YXRlIG9uTWluaW11bVByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogbnVtYmVyLCBuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMub25NaW5pbXVtQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25NYXhpbXVtUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5vbk1heGltdW1DaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTWluaW11bUNoYW5nZWQob2xkVmFsdWU6IG51bWJlciwgbmV3VmFsdWU6IG51bWJlcikge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1heGltdW1DaGFuZ2VkKG9sZFZhbHVlOiBudW1iZXIsIG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICB9XG59XG5SYW5nZVZhbGlkYXRvci5taW5pbXVtUHJvcGVydHkucmVnaXN0ZXIoUmFuZ2VWYWxpZGF0b3IpO1xuUmFuZ2VWYWxpZGF0b3IubWF4aW11bVByb3BlcnR5LnJlZ2lzdGVyKFJhbmdlVmFsaWRhdG9yKTtcblxuXG5leHBvcnQgY2xhc3MgUGhvbmVWYWxpZGF0b3IgZXh0ZW5kcyBQcm9wZXJ0eVZhbGlkYXRvciB7XG59XG5cbmV4cG9ydCBjbGFzcyBSZWdFeFZhbGlkYXRvciBleHRlbmRzIFByb3BlcnR5VmFsaWRhdG9yIHtcbiAgICBwdWJsaWMgcmVnRXg6IHN0cmluZztcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVnRXhQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxSZWdFeFZhbGlkYXRvciwgc3RyaW5nPihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJyZWdFeFwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRhcmdldC5vblJlZ0V4UHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgIHByaXZhdGUgb25SZWdFeFByb3BlcnR5Q2hhbmdlZChvbGRWYWx1ZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25SZWdFeENoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZWdFeENoYW5nZWQob2xkVmFsdWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZykge1xuICAgIH1cbn1cblJlZ0V4VmFsaWRhdG9yLnJlZ0V4UHJvcGVydHkucmVnaXN0ZXIoUmVnRXhWYWxpZGF0b3IpO1xuXG5leHBvcnQgY2xhc3MgSXNUcnVlVmFsaWRhdG9yIGV4dGVuZHMgUHJvcGVydHlWYWxpZGF0b3Ige1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlDb252ZXJ0ZXIge1xuICAgIGNvbnZlcnRGcm9tKHZhbHVlOiBhbnkpOiBhbnk7XG4gICAgY29udmVydFRvKHZhbHVlOiBhbnkpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBTdHJpbmdUb0RhdGVDb252ZXJ0ZXIgaW1wbGVtZW50cyBQcm9wZXJ0eUNvbnZlcnRlciB7XG4gICAgY29udmVydEZyb20odmFsdWU6IGFueSk6IGFueSB7IH1cbiAgICBjb252ZXJ0VG8odmFsdWU6IGFueSk6IGFueSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0cmluZ1RvVGltZUNvbnZlcnRlciBpbXBsZW1lbnRzIFByb3BlcnR5Q29udmVydGVyIHtcbiAgICBjb252ZXJ0RnJvbSh2YWx1ZTogYW55KTogYW55IHsgfVxuICAgIGNvbnZlcnRUbyh2YWx1ZTogYW55KTogYW55IHsgfVxufVxuXG5leHBvcnQgY2xhc3MgVmFsdWVzUHJvdmlkZXJBcnJheUNvbnZlcnRlciBpbXBsZW1lbnRzIFByb3BlcnR5Q29udmVydGVyIHtcbiAgICBwcml2YXRlIF9rZXk7XG4gICAgcHJpdmF0ZSBfbGFiZWw7XG4gICAgcHJpdmF0ZSBfaXRlbXM7XG5cbiAgICBjb25zdHJ1Y3RvcihrZXksIGxhYmVsLCBpdGVtcykge1xuICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgY29udmVydEZyb20oc291cmNlOiBhbnkpIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2tleTtcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5fbGFiZWw7XG4gICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaWYgKGl0ZW1ba2V5XSA9PT0gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBpdGVtW2xhYmVsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICB9XG5cbiAgICBjb252ZXJ0VG8oc291cmNlOiBhbnkpIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2tleTtcbiAgICAgICAgbGV0IGxhYmVsID0gdGhpcy5fbGFiZWw7XG4gICAgICAgIGxldCByZXR1cm5WYWx1ZSA9IC0xO1xuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpZiAoaXRlbVtsYWJlbF0gPT09IHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gaXRlbVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZhbHVlc1Byb3ZpZGVyTWFwQ29udmVydGVyIGltcGxlbWVudHMgUHJvcGVydHlDb252ZXJ0ZXIge1xuICAgIHByaXZhdGUgX2l0ZW1zO1xuICAgIGNvbnN0cnVjdG9yKGl0ZW1zKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgfVxuXG4gICAgY29udmVydEZyb20oc291cmNlOiBhbnkpIHtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbHVlO1xuICAgIH1cbiAgICBjb252ZXJ0VG8oc291cmNlOiBhbnkpIHtcbiAgICAgICAgbGV0IHJldHVyblZhbHVlID0gLTE7XG4gICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmV4cG9ydCBjbGFzcyBEYXRhRm9ybUxheW91dCBleHRlbmRzIFZpZXdCYXNlIHtcbn1cblxuZXhwb3J0IGNsYXNzIERhdGFGb3JtU3RhY2tMYXlvdXQgZXh0ZW5kcyBEYXRhRm9ybUxheW91dCB7XG4gICAgcHVibGljIG9yaWVudGF0aW9uOiBhbnk7XG5cbiAgICBwdWJsaWMgc3RhdGljIG9yaWVudGF0aW9uUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8RGF0YUZvcm1TdGFja0xheW91dCwgYW55PihcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJvcmllbnRhdGlvblwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiBlbnVtcy5PcmllbnRhdGlvbi52ZXJ0aWNhbCxcbiAgICAgICAgICAgIHZhbHVlQ2hhbmdlZDogKHRhcmdldCwgb2xkVmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Lm9uT3JpZW50YXRpb25Qcm9wZXJ0eUNoYW5nZWQob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgcHJpdmF0ZSBvbk9yaWVudGF0aW9uUHJvcGVydHlDaGFuZ2VkKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vbk9yaWVudGF0aW9uQ2hhbmdlZChvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk9yaWVudGF0aW9uQ2hhbmdlZChvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSB7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRGF0YUZvcm1HcmlkTGF5b3V0IGV4dGVuZHMgRGF0YUZvcm1MYXlvdXQge1xufVxuIl19