"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("./..");
var component_1 = require("./component");
var RadDataFormPlugin = {
    install: function (Vue, options) {
        Vue.registerElement('RadDataForm', function () { return __1.RadDataForm; }, {
            component: component_1.default,
        });
        Vue.registerElement('TKDataFormStackLayout', function () { return __1.DataFormStackLayout; });
        Vue.registerElement('TKDataFormGridLayout', function () { return __1.DataFormGridLayout; });
        Vue.registerElement('TKEntityProperty', function () { return __1.EntityProperty; });
        Vue.registerElement('TKPropertyEditor', function () { return __1.PropertyEditor; });
        Vue.registerElement('TKPropertyEditorParams', function () { return __1.PropertyEditorParams; });
        Vue.registerElement('TKPropertyEditorStyle', function () { return __1.PropertyEditorStyle; });
        Vue.registerElement('TKPropertyGroup', function () { return __1.PropertyGroup; });
        Vue.registerElement('TKEmailValidator', function () { return __1.EmailValidator; });
        Vue.registerElement('TKIsTrueValidator', function () { return __1.IsTrueValidator; });
        Vue.registerElement('TKNonEmptyValidator', function () { return __1.NonEmptyValidator; });
        Vue.registerElement('TKMaximumLengthValidator', function () { return __1.MaximumLengthValidator; });
        Vue.registerElement('TKMinimumLengthValidator', function () { return __1.MinimumLengthValidator; });
        Vue.registerElement('TKPhoneValidator', function () { return __1.PhoneValidator; });
        Vue.registerElement('TKRangeValidator', function () { return __1.RangeValidator; });
        Vue.registerElement('TKRegExValidator', function () { return __1.RegExValidator; });
        var setDataFormProperty = {
            inserted: function (el) {
                var dataForm = el.parentNode.nativeView;
                var property = el.nativeView;
                if (dataForm.properties) {
                    dataForm.properties.push(property);
                }
                else {
                    dataForm.properties = new Array(property);
                }
            }
        };
        Vue.directive('tkDataFormProperty', setDataFormProperty);
        var setEntityPropertyEditor = {
            inserted: function (el) {
                var entityProperty = el.parentNode.nativeView;
                var editor = el.nativeView;
                entityProperty.editor = editor;
            }
        };
        Vue.directive('tkEntityPropertyEditor', setEntityPropertyEditor);
        var setEditorParams = {
            inserted: function (el) {
                var propertyEditor = el.parentNode.nativeView;
                var editorParams = el.nativeView;
                propertyEditor.params = editorParams;
            }
        };
        Vue.directive('tkEditorParams', setEditorParams);
        var setPropertyEditorStyle = {
            inserted: function (el) {
                var propertyEditor = el.parentNode.nativeView;
                var style = el.nativeView;
                propertyEditor.propertyEditorStyle = style;
            }
        };
        Vue.directive('tkPropertyEditorStyle', setPropertyEditorStyle);
        var setFormGroups = {
            inserted: function (el) {
                var dataForm = el.parentNode.nativeView;
                var property = el.nativeView;
                if (dataForm.groups) {
                    dataForm.groups.push(property);
                }
                else {
                    dataForm.groups = new Array(property);
                }
            }
        };
        Vue.directive('tkDataFormGroups', setFormGroups);
        var setPropertyGroupProperties = {
            inserted: function (el) {
                var propertyGroup = el.parentNode.nativeView;
                var property = el.nativeView;
                if (propertyGroup.properties) {
                    propertyGroup.properties.push(property);
                }
                else {
                    propertyGroup.properties = new Array(property);
                }
            }
        };
        Vue.directive('tkPropertyGroupProperties', setPropertyGroupProperties);
        var setPropertyValidators = {
            inserted: function (el) {
                var entityProperty = el.parentNode.nativeView;
                var validator = el.nativeView;
                if (entityProperty.validators) {
                    entityProperty.validators.push(validator);
                }
                else {
                    entityProperty.validators = new Array(validator);
                }
            }
        };
        Vue.directive('tkEntityPropertyValidators', setPropertyValidators);
        var setPropertyGroupLayout = {
            inserted: function (el) {
                var propertyGroup = el.parentNode.nativeView;
                var layout = el.nativeView;
                propertyGroup.layout = layout;
            }
        };
        Vue.directive('tkPropertyGroupLayout', setPropertyGroupLayout);
    }
};
exports.default = RadDataFormPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBCQWtCYztBQUNkLHlDQUF1QztBQUV2QyxJQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE9BQU8sWUFBQyxHQUFHLEVBQUUsT0FBTztRQUNsQixHQUFHLENBQUMsZUFBZSxDQUNqQixhQUFhLEVBQ2IsY0FBTSxPQUFBLGVBQVcsRUFBWCxDQUFXLEVBQ2pCO1lBQ0UsU0FBUyxFQUFFLG1CQUFZO1NBQ3hCLENBQ0YsQ0FBQztRQUVGLEdBQUcsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsY0FBTSxPQUFBLHVCQUFtQixFQUFuQixDQUFtQixDQUFDLENBQUM7UUFDeEUsR0FBRyxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsRUFBRSxjQUFNLE9BQUEsc0JBQWtCLEVBQWxCLENBQWtCLENBQUMsQ0FBQztRQUN0RSxHQUFHLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFFLGNBQU0sT0FBQSxrQkFBYyxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQzlELEdBQUcsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLEVBQUUsY0FBTSxPQUFBLGtCQUFjLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFDOUQsR0FBRyxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsRUFBRSxjQUFNLE9BQUEsd0JBQW9CLEVBQXBCLENBQW9CLENBQUMsQ0FBQztRQUMxRSxHQUFHLENBQUMsZUFBZSxDQUFDLHVCQUF1QixFQUFFLGNBQU0sT0FBQSx1QkFBbUIsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQ3hFLEdBQUcsQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsY0FBTSxPQUFBLGlCQUFhLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDNUQsR0FBRyxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFNLE9BQUEsa0JBQWMsRUFBZCxDQUFjLENBQUMsQ0FBQztRQUM5RCxHQUFHLENBQUMsZUFB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QUN2RTtZQUNILENBQUM7U0FDRixDQUFDO1FBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRW5FLElBQUksc0JBQXNCLEdBQUc7WUFDM0IsUUFBUSxFQUFFLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7Z0JBQzdDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQzNCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLENBQUM7U0FDRixDQUFDO1FBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBWdWUgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZSc7XG5pbXBvcnQge1xuICBEYXRhRm9ybUdyaWRMYXlvdXQsXG4gIERhdGFGb3JtU3RhY2tMYXlvdXQsXG4gIEVtYWlsVmFsaWRhdG9yLFxuICBFbnRpdHlQcm9wZXJ0eSxcbiAgSXNUcnVlVmFsaWRhdG9yLFxuICBNYXhpbXVtTGVuZ3RoVmFsaWRhdG9yLFxuICBNaW5pbXVtTGVuZ3RoVmFsaWRhdG9yLFxuICBOb25FbXB0eVZhbGlkYXRvcixcbiAgUGhvbmVWYWxpZGF0b3IsXG4gIFByb3BlcnR5RWRpdG9yLFxuICBQcm9wZXJ0eUVkaXRvclBhcmFtcyxcbiAgUHJvcGVydHlFZGl0b3JTdHlsZSxcbiAgUHJvcGVydHlHcm91cCxcbiAgUHJvcGVydHlWYWxpZGF0b3IsXG4gIFJhZERhdGFGb3JtLFxuICBSYW5nZVZhbGlkYXRvcixcbiAgUmVnRXhWYWxpZGF0b3Jcbn0gZnJvbSAnLi8uLic7XG5pbXBvcnQgRGF0YUZvcm1Db21wIGZyb20gJy4vY29tcG9uZW50JztcblxuY29uc3QgUmFkRGF0YUZvcm1QbHVnaW4gPSB7XG4gIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgVnVlLnJlZ2lzdGVyRWxlbWVudChcbiAgICAgICdSYWREYXRhRm9ybScsXG4gICAgICAoKSA9PiBSYWREYXRhRm9ybSxcbiAgICAgIHtcbiAgICAgICAgY29tcG9uZW50OiBEYXRhRm9ybUNvbXAsXG4gICAgICB9XG4gICAgKTtcblxuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLRGF0YUZvcm1TdGFja0xheW91dCcsICgpID0+IERhdGFGb3JtU3RhY2tMYXlvdXQpO1xuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLRGF0YUZvcm1HcmlkTGF5b3V0JywgKCkgPT4gRGF0YUZvcm1HcmlkTGF5b3V0KTtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KCdUS0VudGl0eVByb3BlcnR5JywgKCkgPT4gRW50aXR5UHJvcGVydHkpO1xuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLUHJvcGVydHlFZGl0b3InLCAoKSA9PiBQcm9wZXJ0eUVkaXRvcik7XG4gICAgVnVlLnJlZ2lzdGVyRWxlbWVudCgnVEtQcm9wZXJ0eUVkaXRvclBhcmFtcycsICgpID0+IFByb3BlcnR5RWRpdG9yUGFyYW1zKTtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KCdUS1Byb3BlcnR5RWRpdG9yU3R5bGUnLCAoKSA9PiBQcm9wZXJ0eUVkaXRvclN0eWxlKTtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KCdUS1Byb3BlcnR5R3JvdXAnLCAoKSA9PiBQcm9wZXJ0eUdyb3VwKTtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KCdUS0VtYWlsVmFsaWRhdG9yJywgKCkgPT4gRW1haWxWYWxpZGF0b3IpO1xuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLSXNUcnVlVmFsaWRhdG9yJywgKCkgPT4gSXNUcnVlVmFsaWRhdG9yKTtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KCdUS05vbkVtcHR5VmFsaWRhdG9yJywgKCkgPT4gTm9uRW1wdHlWYWxpZGF0b3IpO1xuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLTWF4aW11bUxlbmd0aFZhbGlkYXRvcicsICgpID0+IE1heGltdW1MZW5ndGhWYWxpZGF0b3IpO1xuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLTWluaW11bUxlbmd0aFZhbGlkYXRvcicsICgpID0+IE1pbmltdW1MZW5ndGhWYWxpZGF0b3IpO1xuICAgIFZ1ZS5yZWdpc3RlckVsZW1lbnQoJ1RLUGhvbmVWYWxpZGF0b3InLCAoKSA9PiBQaG9uZVZhbGlkYXRvcik7XG4gICAgVnVlLnJlZ2lzdGVyRWxlbWVudCgnVEtSYW5nZVZhbGlkYXRvcicsICgpID0+IFJhbmdlVmFsaWRhdG9yKTtcbiAgICBWdWUucmVnaXN0ZXJFbGVtZW50KCdUS1JlZ0V4VmFsaWRhdG9yJywgKCkgPT4gUmVnRXhWYWxpZGF0b3IpO1xuXG4gICAgbGV0IHNldERhdGFGb3JtUHJvcGVydHkgPSB7XG4gICAgICBpbnNlcnRlZDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGxldCBkYXRhRm9ybSA9IGVsLnBhcmVudE5vZGUubmF0aXZlVmlldztcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gZWwubmF0aXZlVmlldztcbiAgICAgICAgaWYgKGRhdGFGb3JtLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICBkYXRhRm9ybS5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRhdGFGb3JtLnByb3BlcnRpZXMgPSBuZXcgQXJyYXk8RW50aXR5UHJvcGVydHk+KHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBWdWUuZGlyZWN0aXZlKCd0a0RhdGFGb3JtUHJvcGVydHknLCBzZXREYXRhRm9ybVByb3BlcnR5KTtcblxuICAgIGxldCBzZXRFbnRpdHlQcm9wZXJ0eUVkaXRvciA9IHtcbiAgICAgIGluc2VydGVkOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbGV0IGVudGl0eVByb3BlcnR5ID0gZWwucGFyZW50Tm9kZS5uYXRpdmVWaWV3O1xuICAgICAgICBsZXQgZWRpdG9yID0gZWwubmF0aXZlVmlldztcbiAgICAgICAgZW50aXR5UHJvcGVydHkuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBWdWUuZGlyZWN0aXZlKCd0a0VudGl0eVByb3BlcnR5RWRpdG9yJywgc2V0RW50aXR5UHJvcGVydHlFZGl0b3IpO1xuXG4gICAgbGV0IHNldEVkaXRvclBhcmFtcyA9IHtcbiAgICAgIGluc2VydGVkOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5RWRpdG9yID0gZWwucGFyZW50Tm9kZS5uYXRpdmVWaWV3O1xuICAgICAgICBsZXQgZWRpdG9yUGFyYW1zID0gZWwubmF0aXZlVmlldztcbiAgICAgICAgcHJvcGVydHlFZGl0b3IucGFyYW1zID0gZWRpdG9yUGFyYW1zO1xuICAgICAgfVxuICAgIH07XG4gICAgVnVlLmRpcmVjdGl2ZSgndGtFZGl0b3JQYXJhbXMnLCBzZXRFZGl0b3JQYXJhbXMpO1xuXG4gICAgbGV0IHNldFByb3BlcnR5RWRpdG9yU3R5bGUgPSB7XG4gICAgICBpbnNlcnRlZDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0eUVkaXRvciA9IGVsLnBhcmVudE5vZGUubmF0aXZlVmlldztcbiAgICAgICAgbGV0IHN0eWxlID0gZWwubmF0aXZlVmlldztcbiAgICAgICAgcHJvcGVydHlFZGl0b3IucHJvcGVydHlFZGl0b3JTdHlsZSA9IHN0eWxlO1xuICAgICAgfVxuICAgIH07XG4gICAgVnVlLmRpcmVjdGl2ZSgndGtQcm9wZXJ0eUVkaXRvclN0eWxlJywgc2V0UHJvcGVydHlFZGl0b3JTdHlsZSk7XG5cbiAgICBsZXQgc2V0Rm9ybUdyb3VwcyA9IHtcbiAgICAgIGluc2VydGVkOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbGV0IGRhdGFGb3JtID0gZWwucGFyZW50Tm9kZS5uYXRpdmVWaWV3O1xuICAgICAgICBsZXQgcHJvcGVydHkgPSBlbC5uYXRpdmVWaWV3O1xuXG4gICAgICAgIGlmIChkYXRhRm9ybS5ncm91cHMpIHtcbiAgICAgICAgICAgIGRhdGFGb3JtLmdyb3Vwcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFGb3JtLmdyb3VwcyA9IG5ldyBBcnJheTxQcm9wZXJ0eUdyb3VwPihwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIFZ1ZS5kaXJlY3RpdmUoJ3RrRGF0YUZvcm1Hcm91cHMnLCBzZXRGb3JtR3JvdXBzKTtcblxuICAgIGxldCBzZXRQcm9wZXJ0eUdyb3VwUHJvcGVydGllcyA9IHtcbiAgICAgIGluc2VydGVkOiBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgbGV0IHByb3BlcnR5R3JvdXAgPSBlbC5wYXJlbnROb2RlLm5hdGl2ZVZpZXc7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IGVsLm5hdGl2ZVZpZXc7XG5cbiAgICAgICAgaWYgKHByb3BlcnR5R3JvdXAucHJvcGVydGllcykge1xuICAgICAgICAgIHByb3BlcnR5R3JvdXAucHJvcGVydGllcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wZXJ0eUdyb3VwLnByb3BlcnRpZXMgPSBuZXcgQXJyYXk8RW50aXR5UHJvcGVydHk+KHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgVnVlLmRpcmVjdGl2ZSgndGtQcm9wZXJ0eUdyb3VwUHJvcGVydGllcycsIHNldFByb3BlcnR5R3JvdXBQcm9wZXJ0aWVzKTtcblxuICAgIGxldCBzZXRQcm9wZXJ0eVZhbGlkYXRvcnMgPSB7XG4gICAgICBpbnNlcnRlZDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGxldCBlbnRpdHlQcm9wZXJ0eSA9IGVsLnBhcmVudE5vZGUubmF0aXZlVmlldztcbiAgICAgICAgbGV0IHZhbGlkYXRvciA9IGVsLm5hdGl2ZVZpZXc7XG4gICAgICAgIGlmIChlbnRpdHlQcm9wZXJ0eS52YWxpZGF0b3JzKSB7XG4gICAgICAgICAgICBlbnRpdHlQcm9wZXJ0eS52YWxpZGF0b3JzLnB1c2godmFsaWRhdG9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVudGl0eVByb3BlcnR5LnZhbGlkYXRvcnMgPSBuZXcgQXJyYXk8UHJvcGVydHlWYWxpZGF0b3I+KHZhbGlkYXRvcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIFZ1ZS5kaXJlY3RpdmUoJ3RrRW50aXR5UHJvcGVydHlWYWxpZGF0b3JzJywgc2V0UHJvcGVydHlWYWxpZGF0b3JzKTtcblxuICAgIGxldCBzZXRQcm9wZXJ0eUdyb3VwTGF5b3V0ID0ge1xuICAgICAgaW5zZXJ0ZWQ6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBsZXQgcHJvcGVydHlHcm91cCA9IGVsLnBhcmVudE5vZGUubmF0aXZlVmlldztcbiAgICAgICAgbGV0IGxheW91dCA9IGVsLm5hdGl2ZVZpZXc7XG4gICAgICAgIHByb3BlcnR5R3JvdXAubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgfVxuICAgIH07XG4gICAgVnVlLmRpcmVjdGl2ZSgndGtQcm9wZXJ0eUdyb3VwTGF5b3V0Jywgc2V0UHJvcGVydHlHcm91cExheW91dCk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhZERhdGFGb3JtUGx1Z2luO1xuIl19