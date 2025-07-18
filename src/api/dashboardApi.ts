import { apiCall } from "./apiCall";
import DASHBOARD_ENDPOINTS from "./endPoints";

export const getDashboardData = async (params?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_DASHBOARD_DATA,
        method: "GET",
        params,
    });
    return response;
}

export const getWordCloudData = async (params?: any , setWordCloudData?: any, setHashtagPerformance?: any, setSentimentData?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_WORD_CLOUD_DATA,
        method: "GET",
        params,
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
export const getTileData = async (params?: any , setTileData?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_TILE_DATA,
        method: "GET",
        params,
    });
    if(response){
        setTileData(response);
    }else{
        setTileData(null);
    }
    return response;
}

export const getEngagementDataByPost = async (params?: any , setEngagementDataByPost?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_ENGAGEMENT_DATA_BY_POST,
        method: "GET",
        params,
    });
    if(response){
        setEngagementDataByPost(response);
    }else{
        setEngagementDataByPost(null);
    }
    return response;
}

export const getEngagementDataByOverTime = async (params?: any , setEngagementDataByOverTime?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_ENGAGEMENT_DATA,
        method: "GET",
        params,
    });
    if(response){
        setEngagementDataByOverTime(response);
    }else{
        setEngagementDataByOverTime(null);
    }
    return response;
}

export const getClicksPerPost = async (params?: any , setClicksPerPost?: any) => {
    const response = await apiCall({
        endpoint: DASHBOARD_ENDPOINTS.GET_CLICKS_PER_POST,
        method: "GET",
        params,
    });
    if(response){
        setClicksPerPost(response);
    }else{
        setClicksPerPost(null);
    }
    return response;
}