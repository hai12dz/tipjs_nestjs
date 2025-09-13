import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, writeFile, readFile } from 'fs/promises'; // Đúng: tất cả từ 'fs/promises'

@Injectable()
export class DbService {
    constructor(
        @Inject('OPTIONS') private readonly options: DbModuleOptions
    ) { }

    async write(obj: Record<string, any>) {
        await writeFile(this.options.path, JSON.stringify(obj || []), {
            encoding: 'utf-8'
        });
    }

    async read() {
        const filePath = this.options.path;
        try {
            await access(filePath);
            const data = await readFile(filePath, {
                encoding: 'utf-8'
            });
            const parsed = JSON.parse(data)
            return Array.isArray(parsed) ? parsed : [];
        } catch (err) {
        }

        return [];
    }


}