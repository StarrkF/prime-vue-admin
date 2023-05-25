import { toRefs, reactive, computed } from 'vue';

const layoutConfig = reactive({
    ripple: false,
    darkTheme: localStorage.getItem('theme') === 'dark',
    inputStyle: 'outlined',
    menuMode: 'static',
    theme: 'lara-dark-teal',
    scale: 14,
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false
});

export function useLayout() {
    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (layoutConfig.menuMode === 'overlay') {
            layoutState.overlayMenuActive = !layoutState.overlayMenuActive;
        }

        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopInactive = !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const setTheme = () => {
        const elementId = 'theme-css';
        const linkElement = document.getElementById(elementId);
        if (layoutConfig.darkTheme) {
            linkElement.href = '/themes/lara-dark-teal/theme.css';
            localStorage.setItem('theme', 'dark');
        } else {
            linkElement.href = '/themes/lara-light-teal/theme.css';
            localStorage.setItem('theme', 'light');
        }
    }

    const isSidebarActive = computed(() => layoutState.overlayMenuActive || layoutState.staticMenuMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return { layoutConfig: toRefs(layoutConfig), layoutState: toRefs(layoutState), changeThemeSettings, onMenuToggle, setTheme, isSidebarActive, isDarkTheme, setActiveMenuItem };
}
