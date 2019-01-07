import { ActivityEnum } from './activity.enum';
export class Activity {
    constructor(
        public userId: string = '',
        public type: ActivityEnum = ActivityEnum.Run,
        public date: Date = new Date(),
        public distance: number = 0,
        public duration: number = 0,
        public message: string = '',
        public imageUrl: string = '',
        public id?: number 
    ) { }
}
