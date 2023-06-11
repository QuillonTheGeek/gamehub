import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key:'fb0c9f81f3d449da84cf4f51708208eb'
    }
})