import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CITIES } from '../../database/mock-cities';
import { District } from '../../database/district';
import { DISTRICTS } from '../../database/mock-districts';
import { Member } from '../../database/member';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Location } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss']
})
export class EditMemberComponent implements OnInit {
  memberCol: AngularFirestoreCollection<Member>;
  member: Observable<Member[]>;

  dateOfBirthControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);
  districtControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  cities = CITIES;
  districts = DISTRICTS;
  id: string;
  // valueName: string;
  // valueGender: string;
  // valueBirthday: Date;
  // selectedCity: string;
  // selectedDistrict: string;
  // valueAddress: string;
  // valueMobile: string;
  // valueEmail: string;

  step = 0;

  @Input() mem: Member;
  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location,
    private afs: AngularFirestore,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
        console.log(user);
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.getMember();
    this.id = this.route.snapshot.paramMap.get('id');
  }

  getMember() {
    const id = this.route.snapshot.paramMap.get('id');
    this.memberService.getByID(id).subscribe((data) => {
      this.mem = data;
      const tem = CITIES.filter((city) => {
        return (city.name === data.city);
      });
      this.districts = DISTRICTS.filter((item) => {
        return (item.idCity === tem[0].id);
      });
    });
  }

  select(valueCity) {
    const tem = CITIES.filter((data) => {
      return (data.name === valueCity.value);
    });
    this.districts = DISTRICTS.filter((item) => {

      return (item.idCity === tem[0].id);
    });

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    if (this.nameControl.valid && this.genderControl.valid && this.cityControl.valid && this.districtControl.valid) {
      this.step++;
    }
  }

  nextStep2() {
    if (this.emailControl.valid) {
      this.step++;
    }
  }

  prevStep() {
    this.step--;
  }

  edit() {
    this.memberService.updateMember(this.id, this.mem).subscribe((data) => {
      console.log(data);
    });
    this.router.navigate(['member-detail/' + this.mem.id]);
  }

}
