import axios from 'axios'
axios.defaults.baseURL = '/api';

export function getNum() {
    return axios.get('/v1/getWenshuNum');

}
export function getWenshuHtml(Id) {
    return axios.get('/v1/getWenshuHtml',
        {
            params:{
                'Id':Id
            }
        })

}
export function getWenshuList(curPage,pageSize,title,anjianType,anjianNum,courtName,file) {
    return axios.get('/v1/getWenshuList',
        {params:{'curPage':curPage,
                'pageSize':pageSize,
                'title':title,
                'anjianType':anjianType,
                'anjianNum':anjianNum,
                'courtName':courtName,
                'file':file}}
    );
}

export function getWenshu(curPage,pageSize,condition) {
    return axios.get('/v1/getWenshu',
        {
            params:{
                'curPage':curPage,
                'pageSize':pageSize,
                'condition':condition
            }
        })

}

export function getCurDate() {
    return axios.get('/v1/getCurDate');

}

export function spiderWensnhu(cookie,userAgent,conditions,date,anjianType,node) {
    return axios.get('http://10.10.22.60/'+node+'/v1/spiderWenshu',
        {
            params:{
                'Cookie':cookie,
                'userAgent':userAgent,
                'conditions':conditions,
                'date':date,
                'anjianType':anjianType,
                'node':node
            }
        })

}

export function stopSpide(spiderName,node) {
    return axios.get('http://10.10.22.60/'+node+'/v1/stopSpide',
        {
            params:{
                'thread':spiderName
            }
        });

}

export function getRecords(curPage,pageSize,node) {
    return axios.get('/v1/getRecords',
        {
            params:{
                "curPage":curPage,
                "pageSize":pageSize,
                "node":node
            }
        });

}
export function getFinishRecord(curPage,pageSize) {
    return axios.get('/v1/getFinishRecord',
        {
            params:{
                "curPage":curPage,
                "pageSize":pageSize
            }
        });

}
export function removeSpider(spiderName) {
    return axios.get('/v1/removeSpider',{
        params:{
            'thread':spiderName
        }
    })

}

export function getLine() {
    return axios.get('/v1/getLine')

}
export function getBar() {
    return axios.get('/v1/getBar')

}

export function getSpdingNum() {
    return axios.get('/v1/getSpidingNum')

}

export function getMap() {
    return axios.get('/v1/getMap')

}

export function getSpiderByDate() {
    return axios.get('/v1/getSpiderByDate')

}


export function getWenshuBySpiderName(spiderName,curPage,pageSize) {
    return axios.get('/v1/findWenshuBySpiderName',
        {
            params:{
                "spiderName":spiderName,
                "curPage":curPage,
                "pageSize":pageSize
            }
        });
}

export function login(params){
    return axios.post('/v1/login',params,{ headers: {
            'Content-Type': false}})
}
