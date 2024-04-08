import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthorizationClient {
    async authorize() {
        return await fetch('https://run.mocky.io/v3/462ee7fa-52cf-4bf0-91f2-e2630f4c8af5', {
            method: 'GET',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to authorize');
            }

            return response.json();
        });
    }
}