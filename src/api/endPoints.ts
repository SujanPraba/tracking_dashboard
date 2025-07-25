export const BASE_URL = "http://10.10.11.39:3002/api";


const DASHBOARD_ENDPOINTS = {
    GET_DASHBOARD_DATA: `${BASE_URL}/linkedin/metrics`,
    GET_WORD_CLOUD_DATA: `${BASE_URL}/linkedin/posts/ai-analysis`,
    GET_TILE_DATA: `${BASE_URL}/linkedin/dashboard`,
    GET_ENGAGEMENT_DATA: `${BASE_URL}/linkedin/charts/engagement-over-time`,
    GET_ENGAGEMENT_DATA_BY_POST: `${BASE_URL}/linkedin/charts/engagement-by-post-type`,
    FILE_UPLOAD: `${BASE_URL}/linkedin/upload`,
    GET_CLICKS_PER_POST: `${BASE_URL}/linkedin/charts/clicks-per-post-type`,
    SEARCH_POSTS: `${BASE_URL}/linkedin/posts/search`,
    GET_INSIGHTS: `${BASE_URL}/linkedin/suggestions`,
};

export default DASHBOARD_ENDPOINTS;