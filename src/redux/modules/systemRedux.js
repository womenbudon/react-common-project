/**
 * @flow
 */
import actionFactory, { handleActions, createAction } from 'utils/actionFactory';

const initialState = {
    tabs: [],   // 所有的tab配置 {path, text, icon, component, active, scrollTop}
    breadcrumbs: [],    // 面包屑数据 [{key, text, path, icon}]
};

/**
 * Constants
 */
//-------------tabs------------
const SET_TAB = 'SET_TAB';
const SET_CURRENT_TAB_TITLE = 'SET_CURRENT_TAB_TITLE';
const REFRESH_TAB = 'REFRESH_TAB';
const REFRESH_ALL_TAB = 'REFRESH_ALL_TAB';
const CLOSE_CURRENT_TAB = 'CLOSE_CURRENT_TAB';
const CLOSE_TAB = 'CLOSE_TAB';
const CLOSE_OTHER_TABS = 'CLOSE_OTHER_TABS';
const CLOSE_ALL_TABS = 'CLOSE_ALL_TABS';
const CLOSE_LEFT_TABS = 'CLOSE_LEFT_TABS';
const CLOSE_RIGHT_TABS = 'CLOSE_RIGHT_TABS';


//-------------面包屑------------
const SET_BREADCRUMBS = 'SET_BREADCRUMBS';
const APPEND_BREADCRUMBS = 'APPEND_BREADCRUMBS';

/**
 * Reducer
 */
const systemReducer = handleActions(
    {
        [SET_TAB]: (state, action) => {
            return {
                ...state,
                tabs: [...action.payload]
            };
        },
        [CLOSE_TAB]: (state, action) => {
            const tabs = [...state.tabs];
            const tab = tabs.find(item => item.active);
            const newTabs = closeTabByPath(tab.path, tabs);
            return {
                ...state,
                tabs: [...newTabs]
            };
        },
        [SET_BREADCRUMBS]: (state, action) => {
            const breadcrumbs = action.payload;
            return {
                ...state,
                breadcrumbs: [...breadcrumbs],
            };
        },
        [APPEND_BREADCRUMBS]: (state, action) => {
            const appendBreadcrumbs = action.payload;
            return {
                ...state,
                breadcrumbs: state.breadcrumbs.concat(appendBreadcrumbs)
            };
        }
    },
    initialState
);

export default systemReducer;

/**
 * Actions
 */
export const setTab = createAction(SET_TAB);
export const closeTab = createAction(CLOSE_TAB);

export const setBreadcrumbs = createAction(SET_BREADCRUMBS);
export const appendBreadcrumbs = createAction(APPEND_BREADCRUMBS);



function closeTabByPath(targetPath, tabs) {
    let closeTabIndex = 0;

    const tab = tabs.find((item, index) => {
        if (item.path === targetPath) {
            closeTabIndex = index;
            return true;
        }
        return false;
    });

    if (tab) {
        // 关闭的是当前标签
        if (tab.active) {
            const removeTabPath = tab.path;
            const currentIndex = tabs.findIndex(item => item.path === removeTabPath);
            let nextActiveIndex = -1;

            if (removeTabPath.indexOf('/_/') !== -1) {
                nextActiveIndex = tabs.findIndex(item => item.path === removeTabPath.split('/_/')[0]);
            }

            if (nextActiveIndex === -1) {
                nextActiveIndex = 0;
                if (currentIndex === tabs.length - 1) {
                    // 当前标签已经是最后一个了，删除后选中上一个
                    nextActiveIndex = currentIndex - 1;
                } else {
                    // 当前tab标签后面还有标签，删除后选中下一个标签
                    nextActiveIndex = currentIndex + 1;
                }
            }

            if (tabs[nextActiveIndex]) {
                tabs[nextActiveIndex].nextActive = true;
            }
        }

        tabs.splice(closeTabIndex, 1);

        // 关闭的是最后一个，默认打开首页
        if (!tabs.length) return { tabs: [{ path: '/', nextActive: true }] };

        return [...tabs];
    }
}