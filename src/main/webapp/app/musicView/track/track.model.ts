import { BaseEntity } from './../../shared';

export class Track implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
