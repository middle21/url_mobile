"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var __1 = require("./../");
var RadDataFormComponent = /** @class */ (function () {
    function RadDataFormComponent(_elementRef) {
        this._elementRef = _elementRef;
        this._dataForm = _elementRef.nativeElement;
    }
    Object.defineProperty(RadDataFormComponent.prototype, "nativeElement", {
        get: function () {
            return this._dataForm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadDataFormComponent.prototype, "dataForm", {
        get: function () {
            return this._dataForm;
        },
        enumerable: true,
        configurable: true
    });
    RadDataFormComponent = __decorate([
        core_1.Component({
            selector: "RadDataForm",
            template: ""
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], RadDataFormComponent);
    return RadDataFormComponent;
}());
exports.RadDataFormComponent = RadDataFormComponent;
var TKEntityPropertyDirective = /** @class */ (function () {
    function TKEntityPropertyDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._entityProperty = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKEntityPropertyDirective.prototype, "entityProperty", {
        get: function () {
            return this._entityProperty;
        },
        enumerable: true,
        configurable: true
    });
    TKEntityPropertyDirective = __decorate([
        core_1.Directive({
            selector: "TKEntityProperty"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKEntityPropertyDirective);
    return TKEntityPropertyDirective;
}());
exports.TKEntityPropertyDirective = TKEntityPropertyDirective;
var TKDataFormGridLayoutDirective = /** @class */ (function () {
    function TKDataFormGridLayoutDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._dataFormGridLayout = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKDataFormGridLayoutDirective.prototype, "dataFormGridLayout", {
        get: function () {
            return this._dataFormGridLayout;
        },
        enumerable: true,
        configurable: true
    });
    TKDataFormGridLayoutDirective = __decorate([
        core_1.Directive({
            selector: "TKDataFormGridLayout"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKDataFormGridLayoutDirective);
    return TKDataFormGridLayoutDirective;
}());
exports.TKDataFormGridLayoutDirective = TKDataFormGridLayoutDirective;
var TKDataFormStackLayoutDirective = /** @class */ (function () {
    function TKDataFormStackLayoutDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._dataFormStackLayout = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKDataFormStackLayoutDirective.prototype, "dataFormStackLayout", {
        get: function () {
            return this._dataFormStackLayout;
        },
        enumerable: true,
        configurable: true
    });
    TKDataFormStackLayoutDirective = __decorate([
        core_1.Directive({
            selector: "TKDataFormStackLayout"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKDataFormStackLayoutDirective);
    return TKDataFormStackLayoutDirective;
}());
exports.TKDataFormStackLayoutDirective = TKDataFormStackLayoutDirective;
var TKPropertyGroupDirective = /** @class */ (function () {
    function TKPropertyGroupDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._propertyGroup = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKPropertyGroupDirective.prototype, "propertyGroup", {
        get: function () {
            return this._propertyGroup;
        },
        enumerable: true,
        configurable: true
    });
    TKPropertyGroupDirective = __decorate([
        core_1.Directive({
            selector: "TKPropertyGroup"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKPropertyGroupDirective);
    return TKPropertyGroupDirective;
}());
exports.TKPropertyGroupDirective = TKPropertyGroupDirective;
var TKPropertyEditorDirective = /** @class */ (function () {
    function TKPropertyEditorDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._propertyEditor = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKPropertyEditorDirective.prototype, "propertyEditor", {
        get: function () {
            return this._propertyEditor;
        },
        enumerable: true,
        configurable: true
    });
    TKPropertyEditorDirective = __decorate([
        core_1.Directive({
            selector: "TKPropertyEditor"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKPropertyEditorDirective);
    return TKPropertyEditorDirective;
}());
exports.TKPropertyEditorDirective = TKPropertyEditorDirective;
var TKCustomPropertyEditorDirective = /** @class */ (function () {
    function TKCustomPropertyEditorDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._propertyEditor = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKCustomPropertyEditorDirective.prototype, "propertyEditor", {
        get: function () {
            return this._propertyEditor;
        },
        enumerable: true,
        configurable: true
    });
    TKCustomPropertyEditorDirective = __decorate([
        core_1.Directive({
            selector: "TKCustomPropertyEditor"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKCustomPropertyEditorDirective);
    return TKCustomPropertyEditorDirective;
}());
exports.TKCustomPropertyEditorDirective = TKCustomPropertyEditorDirective;
var TKPropertyEditorParamsDirective = /** @class */ (function () {
    function TKPropertyEditorParamsDirective(_elementRef) {
        this._elementRef = _elementRef;
        this._propertyEditorParams = this._elementRef.nativeElement;
    }
    Object.defineProperty(TKPropertyEditorParamsDirective.prototype, "propertyEditorParams", {
        get: function () {
            return this._propertyEditorParams;
        },
        enumerable: true,
        configurable: true
    });
    TKPropertyEditorParamsDirective = __decorate([
        core_1.Directive({
            selector: "TKPropertyEditorParams"
        }),
        __param(0, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], TKPropertyEditorParamsDirective);
    return TKPropertyEditorParamsDirective;
}());
exports.TKPropertyEditorParamsDirective = TKPropertyEditorParamsDirective;
var TKEditorParamsDirective = /** @class */ (function () {
    function TKEditorParamsDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKEditorParamsDirective.prototype.ngOnInit = function () {
        var editorParams = this._elementRef.nativeElement;
        this.owner.propertyEditor.params = editorParams;
    };
    TKEditorParamsDirective = __decorate([
        core_1.Directive({
            selector: "[tKEditorParams]"
        }),
        __param(0, core_1.Inject(TKPropertyEditorDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKPropertyEditorDirective,
            core_1.ElementRef])
    ], TKEditorParamsDirective);
    return TKEditorParamsDirective;
}());
exports.TKEditorParamsDirective = TKEditorParamsDirective;
var TKDataFormPropertyDirective = /** @class */ (function () {
    function TKDataFormPropertyDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKDataFormPropertyDirective.prototype.ngOnInit = function () {
        var property = this._elementRef.nativeElement;
        if (this.owner.dataForm.properties) {
            this.owner.dataForm.properties.push(property);
        }
        else {
            this.owner.dataForm.properties = new Array(property);
        }
    };
    TKDataFormPropertyDirective = __decorate([
        core_1.Directive({
            selector: "[tkDataFormProperty]"
        }),
        __param(0, core_1.Inject(RadDataFormComponent)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [RadDataFormComponent,
            core_1.ElementRef])
    ], TKDataFormPropertyDirective);
    return TKDataFormPropertyDirective;
}());
exports.TKDataFormPropertyDirective = TKDataFormPropertyDirective;
var TKPropertyGroupLayoutDirective = /** @class */ (function () {
    function TKPropertyGroupLayoutDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKPropertyGroupLayoutDirective.prototype.ngOnInit = function () {
        var layout = this._elementRef.nativeElement;
        this.owner.propertyGroup.layout = layout;
    };
    TKPropertyGroupLayoutDirective = __decorate([
        core_1.Directive({
            selector: "[tkPropertyGroupLayout]"
        }),
        __param(0, core_1.Inject(TKPropertyGroupDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKPropertyGroupDirective,
            core_1.ElementRef])
    ], TKPropertyGroupLayoutDirective);
    return TKPropertyGroupLayoutDirective;
}());
exports.TKPropertyGroupLayoutDirective = TKPropertyGroupLayoutDirective;
var TKDataFormGroupsDirective = /** @class */ (function () {
    function TKDataFormGroupsDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKDataFormGroupsDirective.prototype.ngOnInit = function () {
        var property = this._elementRef.nativeElement;
        if (this.owner.dataForm.groups) {
            this.owner.dataForm.groups.push(property);
        }
        else {
            this.owner.dataForm.groups = new Array(property);
        }
    };
    TKDataFormGroupsDirective = __decorate([
        core_1.Directive({
            selector: "[tkDataFormGroups]"
        }),
        __param(0, core_1.Inject(RadDataFormComponent)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [RadDataFormComponent,
            core_1.ElementRef])
    ], TKDataFormGroupsDirective);
    return TKDataFormGroupsDirective;
}());
exports.TKDataFormGroupsDirective = TKDataFormGroupsDirective;
var TKPropertyGroupTitleStyleDirective = /** @class */ (function () {
    function TKPropertyGroupTitleStyleDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKPropertyGroupTitleStyleDirective.prototype.ngOnInit = function () {
        var titleStyle = this._elementRef.nativeElement;
        this.owner.propertyGroup.titleStyle = titleStyle;
    };
    TKPropertyGroupTitleStyleDirective = __decorate([
        core_1.Directive({
            selector: "[tkPropertyGroupTitleStyle]"
        }),
        __param(0, core_1.Inject(TKPropertyGroupDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKPropertyGroupDirective,
            core_1.ElementRef])
    ], TKPropertyGroupTitleStyleDirective);
    return TKPropertyGroupTitleStyleDirective;
}());
exports.TKPropertyGroupTitleStyleDirective = TKPropertyGroupTitleStyleDirective;
var TKPropertyEditorStyleDirective = /** @class */ (function () {
    function TKPropertyEditorStyleDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKPropertyEditorStyleDirective.prototype.ngOnInit = function () {
        var style = this._elementRef.nativeElement;
        this.owner.propertyEditor.propertyEditorStyle = style;
    };
    TKPropertyEditorStyleDirective = __decorate([
        core_1.Directive({
            selector: "[tkPropertyEditorStyle]"
        }),
        __param(0, core_1.Inject(TKPropertyEditorDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKPropertyEditorDirective,
            core_1.ElementRef])
    ], TKPropertyEditorStyleDirective);
    return TKPropertyEditorStyleDirective;
}());
exports.TKPropertyEditorStyleDirective = TKPropertyEditorStyleDirective;
var TKCustomPropertyEditorStyleDirective = /** @class */ (function () {
    function TKCustomPropertyEditorStyleDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKCustomPropertyEditorStyleDirective.prototype.ngOnInit = function () {
        var style = this._elementRef.nativeElement;
        this.owner.propertyEditor.propertyEditorStyle = style;
    };
    TKCustomPropertyEditorStyleDirective = __decorate([
        core_1.Directive({
            selector: "[tkCustomPropertyEditorStyle]"
        }),
        __param(0, core_1.Inject(TKCustomPropertyEditorDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKCustomPropertyEditorDirective,
            core_1.ElementRef])
    ], TKCustomPropertyEditorStyleDirective);
    return TKCustomPropertyEditorStyleDirective;
}());
exports.TKCustomPropertyEditorStyleDirective = TKCustomPropertyEditorStyleDirective;
var TKPropertyGroupPropertiesDirective = /** @class */ (function () {
    function TKPropertyGroupPropertiesDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKPropertyGroupPropertiesDirective.prototype.ngOnInit = function () {
        var property = this._elementRef.nativeElement;
        if (this.owner.propertyGroup.properties) {
            this.owner.propertyGroup.properties.push(property);
        }
        else {
            this.owner.propertyGroup.properties = new Array(property);
        }
    };
    TKPropertyGroupPropertiesDirective = __decorate([
        core_1.Directive({
            selector: "[tkPropertyGroupProperties]"
        }),
        __param(0, core_1.Inject(TKPropertyGroupDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKPropertyGroupDirective,
            core_1.ElementRef])
    ], TKPropertyGroupPropertiesDirective);
    return TKPropertyGroupPropertiesDirective;
}());
exports.TKPropertyGroupPropertiesDirective = TKPropertyGroupPropertiesDirective;
var TKEntityPropertyEditorDirective = /** @class */ (function () {
    function TKEntityPropertyEditorDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKEntityPropertyEditorDirective.prototype.ngOnInit = function () {
        var editor = this._elementRef.nativeElement;
        this.owner.entityProperty.editor = editor;
    };
    TKEntityPropertyEditorDirective = __decorate([
        core_1.Directive({
            selector: "[tkEntityPropertyEditor]"
        }),
        __param(0, core_1.Inject(TKEntityPropertyDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKEntityPropertyDirective,
            core_1.ElementRef])
    ], TKEntityPropertyEditorDirective);
    return TKEntityPropertyEditorDirective;
}());
exports.TKEntityPropertyEditorDirective = TKEntityPropertyEditorDirective;
var TKEntityPropertyValidatorsDirective = /** @class */ (function () {
    function TKEntityPropertyValidatorsDirective(owner, _elementRef) {
        this.owner = owner;
        this._elementRef = _elementRef;
    }
    TKEntityPropertyValidatorsDirective.prototype.ngOnInit = function () {
        var validator = this._elementRef.nativeElement;
        if (this.owner.entityProperty.validators) {
            this.owner.entityProperty.validators.push(validator);
        }
        else {
            this.owner.entityProperty.validators = new Array(validator);
        }
    };
    TKEntityPropertyValidatorsDirective = __decorate([
        core_1.Directive({
            selector: "[tkEntityPropertyValidators]"
        }),
        __param(0, core_1.Inject(TKEntityPropertyDirective)),
        __param(1, core_1.Inject(core_1.ElementRef)),
        __metadata("design:paramtypes", [TKEntityPropertyDirective,
            core_1.ElementRef])
    ], TKEntityPropertyValidatorsDirective);
    return TKEntityPropertyValidatorsDirective;
}());
exports.TKEntityPropertyValidatorsDirective = TKEntityPropertyValidatorsDirective;
exports.DATAFORM_DIRECTIVES = [RadDataFormComponent, TKDataFormPropertyDirective,
    TKEntityPropertyEditorDirective, TKEntityPropertyDirective, TKDataFormGroupsDirective,
    TKPropertyGroupPropertiesDirective, TKPropertyGroupDirective, TKPropertyGroupTitleStyleDirective,
    TKPropertyEditorDirective, TKPropertyEditorStyleDirective, TKEntityPropertyValidatorsDirective,
    TKDataFormGridLayoutDirective, TKDataFormStackLayoutDirective, TKPropertyGroupLayoutDirective,
    TKCustomPropertyEditorDirective, TKCustomPropertyEditorStyleDirective, TKPropertyEditorParamsDirective,
    TKEditorParamsDirective];
if (!global.isDataFormRegistered) {
    element_registry_1.registerElement("RadDataForm", function () { return __1.RadDataForm; });
    element_registry_1.registerElement("TKEntityProperty", function () { return __1.EntityProperty; });
    element_registry_1.registerElement("TKPropertyEditor", function () { return __1.PropertyEditor; });
    element_registry_1.registerElement("TKPropertyEditorParams", function () { return __1.PropertyEditorParams; });
    element_registry_1.registerElement("TKCustomPropertyEditor", function () { return __1.CustomPropertyEditor; });
    element_registry_1.registerElement("TKPropertyGroup", function () { return __1.PropertyGroup; });
    element_registry_1.registerElement("TKGroupTitleStyle", function () { return __1.GroupTitleStyle; });
    element_registry_1.registerElement("TKPropertyEditorStyle", function () { return __1.PropertyEditorStyle; });
    element_registry_1.registerElement("TKPropertyValidator", function () { return __1.PropertyValidator; });
    element_registry_1.registerElement("TKNonEmptyValidator", function () { return __1.NonEmptyValidator; });
    element_registry_1.registerElement("TKMaximumLengthValidator", function () { return __1.MaximumLengthValidator; });
    element_registry_1.registerElement("TKMinimumLengthValidator", function () { return __1.MinimumLengthValidator; });
    element_registry_1.registerElement("TKEmailValidator", function () { return __1.EmailValidator; });
    element_registry_1.registerElement("TKRangeValidator", function () { return __1.RangeValidator; });
    element_registry_1.registerElement("TKPhoneValidator", function () { return __1.PhoneValidator; });
    element_registry_1.registerElement("TKIsTrueValidator", function () { return __1.IsTrueValidator; });
    element_registry_1.registerElement("TKRegExValidator", function () { return __1.RegExValidator; });
    element_registry_1.registerElement("TKDataFormGridLayout", function () { return __1.DataFormGridLayout; });
    element_registry_1.registerElement("TKDataFormStackLayout", function () { return __1.DataFormStackLayout; });
    global.isDataFormRegistered = true;
}
var NativeScriptUIDataFormModule = /** @class */ (function () {
    function NativeScriptUIDataFormModule() {
    }
    NativeScriptUIDataFormModule = __decorate([
        core_1.NgModule({
            declarations: [exports.DATAFORM_DIRECTIVES],
            exports: [exports.DATAFORM_DIRECTIVES]
        })
    ], NativeScriptUIDataFormModule);
    return NativeScriptUIDataFormModule;
}());
exports.NativeScriptUIDataFormModule = NativeScriptUIDataFormModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWZvcm0tZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFmb3JtLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FPdUI7QUFFdkIsMEVBQXdFO0FBQ3hFLDJCQUk4RDtBQU05RDtJQU9JLDhCQUF5QyxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQU5ELHNCQUFXLCtDQUFhO2FBQXhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBTUQsc0JBQVcsMENBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFiUSxvQkFBb0I7UUFKaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxFQUFFO1NBQ2YsQ0FBQztRQVFnQixXQUFBLGFBQU0sQ0FBQyxpQkFBVSxDQUFDLENBQUE7eUNBQXNCLGlCQUFVO09BUHZELG9CQUFvQixDQWNoQztJQUFELDJCQUFDO0NBQUEsQUFkRCxJQWNDO0FBZFksb0RBQW9CO0FBbUJqQztJQUdJLG1DQUF5QyxXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUM1RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQzFELENBQUM7SUFFRCxzQkFBSSxxREFBYzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUNoQyxDQUFDOzs7T0FBQTtJQVRRLHlCQUF5QjtRQUhyQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtTQUMvQixDQUFDO1FBSWdCLFdBQUEsYUFBTSxDQUFDLGlCQUFVLENBQUMsQ0FBQTt5Q0FBc0IsaUJBQVU7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QUN0QztBQU1EO0lBQUE7SUFDQSxDQUFDO0lBRFksNEJBQTRCO1FBSnhDLGVBQVEsQ0FBQztZQUNOLFlBQVksRUFBRSxDQUFDLDJCQUFtQixDQUFDO1lBQ25DLE9BQU8sRUFBRSxDQUFDLDJCQUFtQixDQUFDO1NBQ2pDLENBQUM7T0FDVyw0QkFBNEIsQ0FDeEM7SUFBRCxtQ0FBQztDQUFBLEFBREQsSUFDQztBQURZLG9FQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgSW5qZWN0LFxuICAgIERpcmVjdGl2ZSxcbiAgICBPbkluaXQsXG4gICAgTmdNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBSYWREYXRhRm9ybSwgRW50aXR5UHJvcGVydHksIFByb3BlcnR5RWRpdG9yLCBQcm9wZXJ0eUdyb3VwLCBHcm91cFRpdGxlU3R5bGUsXG4gICAgUHJvcGVydHlWYWxpZGF0b3IsIE5vbkVtcHR5VmFsaWRhdG9yLCBNYXhpbXVtTGVuZ3RoVmFsaWRhdG9yLCBNaW5pbXVtTGVuZ3RoVmFsaWRhdG9yLFxuICAgIEVtYWlsVmFsaWRhdG9yLCBQcm9wZXJ0eUVkaXRvclN0eWxlLCBSYW5nZVZhbGlkYXRvciwgUGhvbmVWYWxpZGF0b3IsIElzVHJ1ZVZhbGlkYXRvcixcbiAgICBSZWdFeFZhbGlkYXRvciwgRGF0YUZvcm1HcmlkTGF5b3V0LCBEYXRhRm9ybVN0YWNrTGF5b3V0LCBEYXRhRm9ybUxheW91dCxcbiAgICBDdXN0b21Qcm9wZXJ0eUVkaXRvciwgUHJvcGVydHlFZGl0b3JQYXJhbXMgfSBmcm9tICcuLy4uLyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlJhZERhdGFGb3JtXCIsXG4gICAgdGVtcGxhdGU6IGBgXG59KVxuZXhwb3J0IGNsYXNzIFJhZERhdGFGb3JtQ29tcG9uZW50IHtcbiAgICBwcml2YXRlIF9kYXRhRm9ybTogUmFkRGF0YUZvcm07XG5cbiAgICBwdWJsaWMgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogUmFkRGF0YUZvcm0ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUZvcm07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9kYXRhRm9ybSA9IF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkYXRhRm9ybSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFGb3JtO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiVEtFbnRpdHlQcm9wZXJ0eVwiXG59KVxuZXhwb3J0IGNsYXNzIFRLRW50aXR5UHJvcGVydHlEaXJlY3RpdmUge1xuICAgIHByb3RlY3RlZCBfZW50aXR5UHJvcGVydHk6IEVudGl0eVByb3BlcnR5O1xuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9lbnRpdHlQcm9wZXJ0eSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgZW50aXR5UHJvcGVydHkoKTogRW50aXR5UHJvcGVydHkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZW50aXR5UHJvcGVydHk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJUS0RhdGFGb3JtR3JpZExheW91dFwiXG59KVxuZXhwb3J0IGNsYXNzIFRLRGF0YUZvcm1HcmlkTGF5b3V0RGlyZWN0aXZlIHtcbiAgICBwcm90ZWN0ZWQgX2RhdGFGb3JtR3JpZExheW91dDogRGF0YUZvcm1HcmlkTGF5b3V0O1xuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9kYXRhRm9ybUdyaWRMYXlvdXQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFGb3JtR3JpZExheW91dCgpOiBEYXRhRm9ybUdyaWRMYXlvdXQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YUZvcm1HcmlkTGF5b3V0O1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiVEtEYXRhRm9ybVN0YWNrTGF5b3V0XCJcbn0pXG5leHBvcnQgY2xhc3MgVEtEYXRhRm9ybVN0YWNrTGF5b3V0RGlyZWN0aXZlIHtcbiAgICBwcm90ZWN0ZWQgX2RhdGFGb3JtU3RhY2tMYXlvdXQ6IERhdGFGb3JtU3RhY2tMYXlvdXQ7XG5cbiAgICBjb25zdHJ1Y3RvciggQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX2RhdGFGb3JtU3RhY2tMYXlvdXQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IGRhdGFGb3JtU3RhY2tMYXlvdXQoKTogRGF0YUZvcm1TdGFja0xheW91dCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhRm9ybVN0YWNrTGF5b3V0O1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiVEtQcm9wZXJ0eUdyb3VwXCJcbn0pXG5leHBvcnQgY2xhc3MgVEtQcm9wZXJ0eUdyb3VwRGlyZWN0aXZlIHtcbiAgICBwcm90ZWN0ZWQgX3Byb3BlcnR5R3JvdXA6IFByb3BlcnR5R3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvciggQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5R3JvdXAgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgZ2V0IHByb3BlcnR5R3JvdXAoKTogUHJvcGVydHlHcm91cCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eUdyb3VwO1xuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiVEtQcm9wZXJ0eUVkaXRvclwiXG59KVxuZXhwb3J0IGNsYXNzIFRLUHJvcGVydHlFZGl0b3JEaXJlY3RpdmUge1xuICAgIHByb3RlY3RlZCBfcHJvcGVydHlFZGl0b3I6IFByb3BlcnR5RWRpdG9yO1xuXG4gICAgY29uc3RydWN0b3IoIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eUVkaXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgcHJvcGVydHlFZGl0b3IoKTogUHJvcGVydHlFZGl0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydHlFZGl0b3I7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJUS0N1c3RvbVByb3BlcnR5RWRpdG9yXCJcbn0pXG5leHBvcnQgY2xhc3MgVEtDdXN0b21Qcm9wZXJ0eUVkaXRvckRpcmVjdGl2ZSB7XG4gICAgcHJvdGVjdGVkIF9wcm9wZXJ0eUVkaXRvcjogQ3VzdG9tUHJvcGVydHlFZGl0b3I7XG5cbiAgICBjb25zdHJ1Y3RvciggQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX3Byb3BlcnR5RWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuICAgIGdldCBwcm9wZXJ0eUVkaXRvcigpOiBDdXN0b21Qcm9wZXJ0eUVkaXRvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0eUVkaXRvcjtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlRLUHJvcGVydHlFZGl0b3JQYXJhbXNcIlxufSlcbmV4cG9ydCBjbGFzcyBUS1Byb3BlcnR5RWRpdG9yUGFyYW1zRGlyZWN0aXZlIHtcbiAgICBwcm90ZWN0ZWQgX3Byb3BlcnR5RWRpdG9yUGFyYW1zOiBQcm9wZXJ0eUVkaXRvclBhcmFtcztcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9wcm9wZXJ0eUVkaXRvclBhcmFtcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cbiAgICBnZXQgcHJvcGVydHlFZGl0b3JQYXJhbXMoKTogUHJvcGVydHlFZGl0b3JQYXJhbXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydHlFZGl0b3JQYXJhbXM7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbdEtFZGl0b3JQYXJhbXNdXCJcbn0pXG5leHBvcnQgY2xhc3MgVEtFZGl0b3JQYXJhbXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoVEtQcm9wZXJ0eUVkaXRvckRpcmVjdGl2ZSkgcHJpdmF0ZSBvd25lcjogVEtQcm9wZXJ0eUVkaXRvckRpcmVjdGl2ZSxcbiAgICAgICAgICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IGVkaXRvclBhcmFtcyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBQcm9wZXJ0eUVkaXRvclBhcmFtcztcbiAgICAgICAgdGhpcy5vd25lci5wcm9wZXJ0eUVkaXRvci5wYXJhbXMgPSBlZGl0b3JQYXJhbXM7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbdGtEYXRhRm9ybVByb3BlcnR5XVwiXG59KVxuZXhwb3J0IGNsYXNzIFRLRGF0YUZvcm1Qcm9wZXJ0eURpcmVjdGl2ZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChSYWREYXRhRm9ybUNvbXBvbmVudCkgcHJpdmF0ZSBvd25lcjogUmFkRGF0YUZvcm1Db21wb25lbnQsXG4gICAgICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgRW50aXR5UHJvcGVydHk7XG4gICAgICAgIGlmICh0aGlzLm93bmVyLmRhdGFGb3JtLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHRoaXMub3duZXIuZGF0YUZvcm0ucHJvcGVydGllcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3duZXIuZGF0YUZvcm0ucHJvcGVydGllcyA9IG5ldyBBcnJheTxFbnRpdHlQcm9wZXJ0eT4ocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbdGtQcm9wZXJ0eUdyb3VwTGF5b3V0XVwiXG59KVxuZXhwb3J0IGNsYXNzIFRLUHJvcGVydHlHcm91cExheW91dERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChUS1Byb3BlcnR5R3JvdXBEaXJlY3RpdmUpIHByaXZhdGUgb3duZXI6IFRLUHJvcGVydHlHcm91cERpcmVjdGl2ZSxcbiAgICAgICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCBsYXlvdXQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgRGF0YUZvcm1MYXlvdXQ7XG4gICAgICAgIHRoaXMub3duZXIucHJvcGVydHlHcm91cC5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbdGtEYXRhRm9ybUdyb3Vwc11cIlxufSlcbmV4cG9ydCBjbGFzcyBUS0RhdGFGb3JtR3JvdXBzRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFJhZERhdGFGb3JtQ29tcG9uZW50KSBwcml2YXRlIG93bmVyOiBSYWREYXRhRm9ybUNvbXBvbmVudCxcbiAgICAgICAgQEluamVjdChFbGVtZW50UmVmKSBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBQcm9wZXJ0eUdyb3VwO1xuICAgICAgICBpZiAodGhpcy5vd25lci5kYXRhRm9ybS5ncm91cHMpIHtcbiAgICAgICAgICAgIHRoaXMub3duZXIuZGF0YUZvcm0uZ3JvdXBzLnB1c2gocHJvcGVydHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vd25lci5kYXRhRm9ybS5ncm91cHMgPSBuZXcgQXJyYXk8UHJvcGVydHlHcm91cD4ocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbdGtQcm9wZXJ0eUdyb3VwVGl0bGVTdHlsZV1cIlxufSlcbmV4cG9ydCBjbGFzcyBUS1Byb3BlcnR5R3JvdXBUaXRsZVN0eWxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFRLUHJvcGVydHlHcm91cERpcmVjdGl2ZSkgcHJpdmF0ZSBvd25lcjogVEtQcm9wZXJ0eUdyb3VwRGlyZWN0aXZlLFxuICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHRpdGxlU3R5bGUgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMub3duZXIucHJvcGVydHlHcm91cC50aXRsZVN0eWxlID0gdGl0bGVTdHlsZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a1Byb3BlcnR5RWRpdG9yU3R5bGVdXCJcbn0pXG5leHBvcnQgY2xhc3MgVEtQcm9wZXJ0eUVkaXRvclN0eWxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0ICB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChUS1Byb3BlcnR5RWRpdG9yRGlyZWN0aXZlKSBwcml2YXRlIG93bmVyOiBUS1Byb3BlcnR5RWRpdG9yRGlyZWN0aXZlLFxuICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm93bmVyLnByb3BlcnR5RWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUgPSBzdHlsZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a0N1c3RvbVByb3BlcnR5RWRpdG9yU3R5bGVdXCJcbn0pXG5leHBvcnQgY2xhc3MgVEtDdXN0b21Qcm9wZXJ0eUVkaXRvclN0eWxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0ICB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChUS0N1c3RvbVByb3BlcnR5RWRpdG9yRGlyZWN0aXZlKSBwcml2YXRlIG93bmVyOiBUS0N1c3RvbVByb3BlcnR5RWRpdG9yRGlyZWN0aXZlLFxuICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHN0eWxlID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICB0aGlzLm93bmVyLnByb3BlcnR5RWRpdG9yLnByb3BlcnR5RWRpdG9yU3R5bGUgPSBzdHlsZTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a1Byb3BlcnR5R3JvdXBQcm9wZXJ0aWVzXVwiXG59KVxuZXhwb3J0IGNsYXNzIFRLUHJvcGVydHlHcm91cFByb3BlcnRpZXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoVEtQcm9wZXJ0eUdyb3VwRGlyZWN0aXZlKSBwcml2YXRlIG93bmVyOiBUS1Byb3BlcnR5R3JvdXBEaXJlY3RpdmUsXG4gICAgICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgRW50aXR5UHJvcGVydHk7XG4gICAgICAgIGlmICh0aGlzLm93bmVyLnByb3BlcnR5R3JvdXAucHJvcGVydGllcykge1xuICAgICAgICAgICAgdGhpcy5vd25lci5wcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMucHVzaChwcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm93bmVyLnByb3BlcnR5R3JvdXAucHJvcGVydGllcyA9IG5ldyBBcnJheTxFbnRpdHlQcm9wZXJ0eT4ocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJbdGtFbnRpdHlQcm9wZXJ0eUVkaXRvcl1cIlxufSlcbmV4cG9ydCBjbGFzcyBUS0VudGl0eVByb3BlcnR5RWRpdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KFRLRW50aXR5UHJvcGVydHlEaXJlY3RpdmUpIHByaXZhdGUgb3duZXI6IFRLRW50aXR5UHJvcGVydHlEaXJlY3RpdmUsXG4gICAgICAgIEBJbmplY3QoRWxlbWVudFJlZikgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgZWRpdG9yID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIFByb3BlcnR5RWRpdG9yO1xuICAgICAgICB0aGlzLm93bmVyLmVudGl0eVByb3BlcnR5LmVkaXRvciA9IGVkaXRvcjtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a0VudGl0eVByb3BlcnR5VmFsaWRhdG9yc11cIlxufSlcbmV4cG9ydCBjbGFzcyBUS0VudGl0eVByb3BlcnR5VmFsaWRhdG9yc0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChUS0VudGl0eVByb3BlcnR5RGlyZWN0aXZlKSBwcml2YXRlIG93bmVyOiBUS0VudGl0eVByb3BlcnR5RGlyZWN0aXZlLFxuICAgICAgICBASW5qZWN0KEVsZW1lbnRSZWYpIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBQcm9wZXJ0eVZhbGlkYXRvcjtcbiAgICAgICAgaWYgKHRoaXMub3duZXIuZW50aXR5UHJvcGVydHkudmFsaWRhdG9ycykge1xuICAgICAgICAgICAgdGhpcy5vd25lci5lbnRpdHlQcm9wZXJ0eS52YWxpZGF0b3JzLnB1c2godmFsaWRhdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3duZXIuZW50aXR5UHJvcGVydHkudmFsaWRhdG9ycyA9IG5ldyBBcnJheTxQcm9wZXJ0eVZhbGlkYXRvcj4odmFsaWRhdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IERBVEFGT1JNX0RJUkVDVElWRVMgPSBbUmFkRGF0YUZvcm1Db21wb25lbnQsIFRLRGF0YUZvcm1Qcm9wZXJ0eURpcmVjdGl2ZSxcbiAgICBUS0VudGl0eVByb3BlcnR5RWRpdG9yRGlyZWN0aXZlLCBUS0VudGl0eVByb3BlcnR5RGlyZWN0aXZlLCBUS0RhdGFGb3JtR3JvdXBzRGlyZWN0aXZlLFxuICAgIFRLUHJvcGVydHlHcm91cFByb3BlcnRpZXNEaXJlY3RpdmUsIFRLUHJvcGVydHlHcm91cERpcmVjdGl2ZSwgVEtQcm9wZXJ0eUdyb3VwVGl0bGVTdHlsZURpcmVjdGl2ZSxcbiAgICBUS1Byb3BlcnR5RWRpdG9yRGlyZWN0aXZlLCBUS1Byb3BlcnR5RWRpdG9yU3R5bGVEaXJlY3RpdmUsIFRLRW50aXR5UHJvcGVydHlWYWxpZGF0b3JzRGlyZWN0aXZlLFxuICAgIFRLRGF0YUZvcm1HcmlkTGF5b3V0RGlyZWN0aXZlLCBUS0RhdGFGb3JtU3RhY2tMYXlvdXREaXJlY3RpdmUsIFRLUHJvcGVydHlHcm91cExheW91dERpcmVjdGl2ZSxcbiAgICBUS0N1c3RvbVByb3BlcnR5RWRpdG9yRGlyZWN0aXZlLCBUS0N1c3RvbVByb3BlcnR5RWRpdG9yU3R5bGVEaXJlY3RpdmUsIFRLUHJvcGVydHlFZGl0b3JQYXJhbXNEaXJlY3RpdmUsXG4gICAgVEtFZGl0b3JQYXJhbXNEaXJlY3RpdmVdO1xuXG5kZWNsYXJlIHZhciBnbG9iYWw6IGFueTtcbmlmICghZ2xvYmFsLmlzRGF0YUZvcm1SZWdpc3RlcmVkKSB7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiUmFkRGF0YUZvcm1cIiwgKCkgPT4gUmFkRGF0YUZvcm0pO1xuICAgIHJlZ2lzdGVyRWxlbWVudChcIlRLRW50aXR5UHJvcGVydHlcIiwgKCkgPT4gPGFueT5FbnRpdHlQcm9wZXJ0eSk7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtQcm9wZXJ0eUVkaXRvclwiLCAoKSA9PiA8YW55PlByb3BlcnR5RWRpdG9yKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJUS1Byb3BlcnR5RWRpdG9yUGFyYW1zXCIsICgpID0+IDxhbnk+UHJvcGVydHlFZGl0b3JQYXJhbXMpO1xuICAgIHJlZ2lzdGVyRWxlbWVudChcIlRLQ3VzdG9tUHJvcGVydHlFZGl0b3JcIiwgKCkgPT4gPGFueT5DdXN0b21Qcm9wZXJ0eUVkaXRvcik7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtQcm9wZXJ0eUdyb3VwXCIsICgpID0+IDxhbnk+UHJvcGVydHlHcm91cCk7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtHcm91cFRpdGxlU3R5bGVcIiwgKCkgPT4gPGFueT5Hcm91cFRpdGxlU3R5bGUpO1xuICAgIHJlZ2lzdGVyRWxlbWVudChcIlRLUHJvcGVydHlFZGl0b3JTdHlsZVwiLCAoKSA9PiA8YW55PlByb3BlcnR5RWRpdG9yU3R5bGUpO1xuICAgIHJlZ2lzdGVyRWxlbWVudChcIlRLUHJvcGVydHlWYWxpZGF0b3JcIiwgKCkgPT4gPGFueT5Qcm9wZXJ0eVZhbGlkYXRvcik7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtOb25FbXB0eVZhbGlkYXRvclwiLCAoKSA9PiA8YW55Pk5vbkVtcHR5VmFsaWRhdG9yKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJUS01heGltdW1MZW5ndGhWYWxpZGF0b3JcIiwgKCkgPT4gPGFueT5NYXhpbXVtTGVuZ3RoVmFsaWRhdG9yKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJUS01pbmltdW1MZW5ndGhWYWxpZGF0b3JcIiwgKCkgPT4gPGFueT5NaW5pbXVtTGVuZ3RoVmFsaWRhdG9yKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJUS0VtYWlsVmFsaWRhdG9yXCIsICgpID0+IDxhbnk+RW1haWxWYWxpZGF0b3IpO1xuICAgIHJlZ2lzdGVyRWxlbWVudChcIlRLUmFuZ2VWYWxpZGF0b3JcIiwgKCkgPT4gPGFueT5SYW5nZVZhbGlkYXRvcik7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtQaG9uZVZhbGlkYXRvclwiLCAoKSA9PiA8YW55PlBob25lVmFsaWRhdG9yKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJUS0lzVHJ1ZVZhbGlkYXRvclwiLCAoKSA9PiA8YW55PklzVHJ1ZVZhbGlkYXRvcik7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtSZWdFeFZhbGlkYXRvclwiLCAoKSA9PiA8YW55PlJlZ0V4VmFsaWRhdG9yKTtcbiAgICByZWdpc3RlckVsZW1lbnQoXCJUS0RhdGFGb3JtR3JpZExheW91dFwiLCAoKSA9PiA8YW55PkRhdGFGb3JtR3JpZExheW91dCk7XG4gICAgcmVnaXN0ZXJFbGVtZW50KFwiVEtEYXRhRm9ybVN0YWNrTGF5b3V0XCIsICgpID0+IDxhbnk+RGF0YUZvcm1TdGFja0xheW91dCk7XG4gICAgZ2xvYmFsLmlzRGF0YUZvcm1SZWdpc3RlcmVkID0gdHJ1ZTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtEQVRBRk9STV9ESVJFQ1RJVkVTXSxcbiAgICBleHBvcnRzOiBbREFUQUZPUk1fRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSB7XG59XG4iXX0=