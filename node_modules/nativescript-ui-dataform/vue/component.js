"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    props: {},
    template: "\n    <NativeRadDataForm\n      ref=\"dataform\"\n      v-bind=\"$attrs\"\n      v-on=\"$listeners\">\n      <slot />\n\n    </NativeRadDataForm>\n  ",
    methods: {
        getPropertyByName: function (prop) {
            return this.$refs.dataform.nativeView.getPropertyByName(prop);
        },
        notifyValidated: function (prop, validated) {
            return this.$refs.dataform.nativeView.notifyValidated(prop, validated);
        },
        commitAll: function () {
            return this.$refs.dataform.nativeView.commitAll();
        },
        validateAll: function () {
            return this.$refs.dataform.nativeView.validateAll();
        },
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixLQUFLLEVBQUUsRUFDTjtJQUVELFFBQVEsRUFBRSx1SkFRVDtJQUVELE9BQU8sRUFBRTtRQUNQLGlCQUFpQixZQUFFLElBQUk7WUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUNELGVBQWUsWUFBQyxJQUFJLEVBQUUsU0FBUztZQUM3QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxTQUFTO1lBQ1AsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEQsQ0FBQztRQUNELFdBQVc7WUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0RCxDQUFDO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICB9LFxuXG4gIHRlbXBsYXRlOiBgXG4gICAgPE5hdGl2ZVJhZERhdGFGb3JtXG4gICAgICByZWY9XCJkYXRhZm9ybVwiXG4gICAgICB2LWJpbmQ9XCIkYXR0cnNcIlxuICAgICAgdi1vbj1cIiRsaXN0ZW5lcnNcIj5cbiAgICAgIDxzbG90IC8+XG5cbiAgICA8L05hdGl2ZVJhZERhdGFGb3JtPlxuICBgLFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZXRQcm9wZXJ0eUJ5TmFtZSAocHJvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHJlZnMuZGF0YWZvcm0ubmF0aXZlVmlldy5nZXRQcm9wZXJ0eUJ5TmFtZShwcm9wKTtcbiAgICB9LFxuICAgIG5vdGlmeVZhbGlkYXRlZChwcm9wLCB2YWxpZGF0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLiRyZWZzLmRhdGFmb3JtLm5hdGl2ZVZpZXcubm90aWZ5VmFsaWRhdGVkKHByb3AsIHZhbGlkYXRlZCk7XG4gICAgfSxcbiAgICBjb21taXRBbGwoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kcmVmcy5kYXRhZm9ybS5uYXRpdmVWaWV3LmNvbW1pdEFsbCgpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVBbGwoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kcmVmcy5kYXRhZm9ybS5uYXRpdmVWaWV3LnZhbGlkYXRlQWxsKCk7XG4gICAgfSxcbiAgfVxufTtcbiJdfQ==