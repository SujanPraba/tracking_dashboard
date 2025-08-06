import { apiCall } from "./apiCall";
import DASHBOARD_ENDPOINTS from "./endPoints";

interface ApiParams {
    productType: string;
    startDate?: string;  // Make dates optional
    endDate?: string;
    selectedMetric?: string;
}

export const getDashboardData = async (params?: ApiParams) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_DASHBOARD_DATA,
        method: "GET",
        params,
    });
    return response;
}

export const getWordCloudData = async (params?: ApiParams, setWordCloudData?: any, setHashtagPerformance?: any, setSentimentData?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_WORD_CLOUD_DATA,
        method: "POST",
        data: params,
    });
    if(response?.wordCloud){
        const wordCloudData = response?.wordCloud?.map((item: any) => {
            return {
                text: item?.word,
                value: item?.count
            }
        })
        setWordCloudData(wordCloudData);
        setHashtagPerformance(response?.hashtagPerformance);
        setSentimentData(response?.sentimentOverTime?.sentimentOverTime);
    }else{
        setWordCloudData([]);
    }
}

export const getTileData = async (params?: ApiParams, setTileData?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_TILE_DATA,
        method: "POST",
        data: params,
    });
    if(response){
        setTileData(response);
    }else{
        setTileData(null);
    }
    return response;
}

export const getEngagementDataByPost = async (params?: ApiParams, setEngagementDataByPost?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_ENGAGEMENT_DATA_BY_POST,
        method: "POST",
        data: params,
    });
    if(response){
        setEngagementDataByPost(response);
    }else{
        setEngagementDataByPost(null);
    }
    return response;
}

export const getEngagementDataByOverTime = async (params?: ApiParams, setEngagementDataByOverTime?: any, selectedMetric: string = 'engagement') => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_ENGAGEMENT_DATA,
        method: "POST",
        data: { ...params, selectedMetric },
    });
    if(response){
        setEngagementDataByOverTime(response);
    }else{
        setEngagementDataByOverTime(null);
    }
    return response;
};

export const getClicksPerPost = async (params?: ApiParams, setClicksPerPost?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_CLICKS_PER_POST,
        method: "POST",
        data: params,
    });
    if(response){
        setClicksPerPost(response);
    }else{
        setClicksPerPost(null);
    }
    return response;
}

export const getInsights = async (params?: ApiParams) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_INSIGHTS,
        method: "POST",
        data: params,
    });
    return response;
};

export const getPostEngagementTable = async (params?: ApiParams, setTableData?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_POST_ENGAGEMENT_TABLE,
        method: "POST",
        data: params,
    });
    if(response){
        setTableData(response);
    }else{
        setTableData([]);
    }
    return response;
};

export const getTableData = async (params?: ApiParams, setTableData?: any , currentPage: number = 1, pageSize: number = 10, setTotalPages?: any) => {
    const payload = {
        ...params,
        startDate: params?.startDate ? new Date(params?.startDate).toISOString() : undefined,
        endDate: params?.endDate ? new Date(params?.endDate).toISOString() : undefined,
        offset: (currentPage - 1),
        limit: pageSize,
    }
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_TABLE_DATA,
        method: "POST",
        data: payload,
    });
    console.log(response);
    if(response){
        setTableData(response?.posts);
        setTotalPages(response?.totalPosts);
    }else{
        setTableData([]);
    }
    return response;
};