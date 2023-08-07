package com.aye.web.issueclient.service;

import java.io.IOException;
import java.util.HashMap;

public interface LoginService {
    HashMap<String, String> generateJwt(String username, String password) throws IOException;
}
