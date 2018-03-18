import { City } from './city';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

/* export class Member {
    id: number;
    name: string;
    avatar: string;
    gender: string;
    dateOfBirth: string;
    email: string;
    mobile: string;
    address: string;
    city: string;
    district: string;
    idProject: number[];
} */
export interface Member {
    id?: string;
    name?: string;
    gender?: string;
    city?: string;
    district?: string;
    address?: string;
    mobile?: string;
    email?: string;
    dayOfBirth?: Date;
    avatar?: string;
    idProject?: string[];
}

// export const member: Observable<Member[]>;
