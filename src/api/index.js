import request from '@/libs/axios'


/**
 * 组合列表
 * @param {}  
 */
export function recommendFundGroupData() {
    return request({
        url: '/public/product/portfolio/find-recommended-product-portfolio-list?referral=SYN',
        method: 'get',
    })
}
/**
 * 其他七个
 */
export function recommendFundData(params) {
    return request({
        url: '/public/product/batch-get-fund-info?referral=SYN',
        params: params,
        method: 'get',
    })
}