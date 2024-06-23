package com.tt.microserviciocryptografia.ajax;

public class AjaxParamResp {
    private String privRSA;
    private String pubRSA;
    private String HMAC512;

    public String getPrivRSA() {
        return privRSA;
    }
    public void setPrivRSA(String privRSA) {
        this.privRSA = privRSA;
    }
    public String getPubRSA() {
        return pubRSA;
    }
    public void setPubRSA(String pubRSA) {
        this.pubRSA = pubRSA;
    }
    public String getHMAC512() {
        return HMAC512;
    }
    public void setHMAC512(String hMAC512) {
        HMAC512 = hMAC512;
    }
}
