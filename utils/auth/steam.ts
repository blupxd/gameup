import * as openid from "openid";
import type { NextRequest } from "next/server";
import getURL from "../getURL"; 

const OPENID_CHECK = {
    ns: "http://specs.openid.net/auth/2.0",
    claimed_id: "https://steamcommunity.com/openid/id/",
    identity: "https://steamcommunity.com/openid/id/",
    op_endpoint: "https://steamcommunity.com/openid/login"
};

let steamRelyingParty: openid.RelyingParty | null = null;

function getSteamRelyingParty(): openid.RelyingParty {
    if (!steamRelyingParty) {
        const url = getURL(false);
        steamRelyingParty = new openid.RelyingParty(
            `${url}/auth/steam/callback`, // Ensure this matches your callback route
            url,
            true,
            true,
            []
        );
    }
    return steamRelyingParty;
}

export async function getSteamAuthenticationURL(): Promise<string> {
    const steamRelyingParty = getSteamRelyingParty();
    console.log(steamRelyingParty)
    return await new Promise<string>((resolve, reject) => {
        steamRelyingParty.authenticate('https://steamcommunity.com/openid', false, (error, authURL) => {
            if (error) reject(error);
            resolve(authURL!);
        });
    });
}

export async function getSteamUserIdentifier(request: NextRequest): Promise<string> {
    const steamRelyingParty = getSteamRelyingParty();
    return await new Promise<string>((resolve, reject) => {
        steamRelyingParty.verifyAssertion(request.url, (error, result) => {
            if (error) reject(error);
            if (!result || !result.authenticated) {
                reject(new Error("Steam authentication failed."));
            }
            if (!result!.claimedIdentifier) {
                reject(new Error("Steam identifier not found."));
            }
            const claimedIdentifier = result!.claimedIdentifier!;
            if (!claimedIdentifier.match(/https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)/)) {
                reject(new Error("Invalid Steam identifier."));
            }
            const searchParams = request.nextUrl.searchParams;
            if (searchParams.get("openid.ns") !== OPENID_CHECK.ns) {
                reject(new Error("Invalid OpenID namespace."));
            }
            if (!searchParams.get("openid.claimed_id")?.startsWith(OPENID_CHECK.claimed_id)) {
                reject(new Error("Invalid OpenID claimed identity."));
            }
            if (!searchParams.get("openid.identity")?.startsWith(OPENID_CHECK.identity)) {
                reject(new Error("Invalid OpenID identity."));
            }
            if (searchParams.get("openid.op_endpoint") !== OPENID_CHECK.op_endpoint) {
                reject(new Error("Invalid OpenID endpoint."));
            }
            resolve(claimedIdentifier.replace(/https?:\/\/steamcommunity\.com\/openid\/id\//, ""));
        });
    });
}