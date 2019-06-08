import axios from "axios";

export default function ajax(url , data = {} , type = "GET"){
    if(type == "GET"){
        let baseUrl = "";
        Object.keys(data).forEach(item => {
            baseUrl += item + "=" + data[item] + "&";
        })

        baseUrl = baseUrl.substring(0,baseUrl.length - 1);

        return axios.get(url + "?" + baseUrl);
    }else{
        return axios.post(url , data);
    }
}