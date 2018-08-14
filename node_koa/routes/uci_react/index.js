/**
 * Created by xiaogang on 2018/5/14.
 *
 */
"use strict";
import region_getCity from './json/region.getCity';
import shop_screeningShop from './json/shop.screeningShop';
import brand_brandCoupon from './json/brand.brandCoupon';
import shop_getShopDetail from './json/shop.getShopDetail';
import shop_getShopCouponInfo from './json/shop.getShopCouponInfo';
import shop_getSimilarShop from './json/shop.getSimilarShop';
import shop_getBetweenDis from './json/shop.getBetweenDis';
import shop_getShopByCoupon from './json/shop.getShopByCoupon';
import coupon_getBrandByCoupon from './json/coupon.getBrandByCoupon';
import coupon_getCouponDetailInfo from './json/coupon.getCouponDetailInfo'
import coupon_getCouponRealTimeInfo from './json/coupon.getCouponRealTimeInfo';
import coupon_getSimilarCoupon from './json/coupon.getSimilarCoupon';

//统一处理 本地mock 数据！
export default function (res) {
    let _url = res.config.url;
    let _isOk = res.status === 200 || res.statusText === 'OK';

    //品牌下的优惠接口！
    if (/region\/getCity/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }
        // 拦截 错误回调的信息。
        return {res, ...{data: region_getCity.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }


    //品牌下的优惠接口！
    if (/brand\/brandCoupon/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }
        // 拦截 错误回调的信息。
        return {res, ...{data: brand_brandCoupon.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/shop\/screeningShop/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: shop_screeningShop.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/shop\/getShopDetail/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: shop_getShopDetail.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/shop\/getShopCouponInfo/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: shop_getShopCouponInfo.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/shop\/getSimilarShop/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: shop_getSimilarShop.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/shop\/getBetweenDis/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: shop_getBetweenDis.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/shop\/getShopByCoupon/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: shop_getShopByCoupon.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/coupon\/getBrandByCoupon/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: coupon_getBrandByCoupon.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/coupon\/getCouponDetailInfo/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: coupon_getCouponDetailInfo.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/coupon\/getCouponRealTimeInfo/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: coupon_getCouponRealTimeInfo.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    if (/coupon\/getSimilarCoupon/.test(_url)) {
        if (_isOk) {
            //默认情况 原封 不动的返回成功数据！
            return res;
        }

        // 拦截 错误回调的信息。
        return {res, ...{data: coupon_getSimilarCoupon.default}};

        //不想 拦截 默认错误回调的信息。
        // return res;
    }

    //未匹配项  原封 不动的返回 数据
    return res;

}
