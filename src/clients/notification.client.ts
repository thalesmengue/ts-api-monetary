import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationClient {
    async notify() {
        return await fetch('https://run.mocky.io/v3/dd0e8afb-ed06-4199-ba4a-7769e330d472', {
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