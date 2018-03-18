import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { City } from '../../database/city';
import { District } from '../../database/district';
import { CITIES } from '../../database/mock-cities';
import { DISTRICTS } from '../../database/mock-districts';
import { Member } from '../../database/member';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.scss']
})
export class CreateMemberComponent implements OnInit {
  // memberCol: AngularFirestoreCollection<Member>;
  // member: Observable<Member[]>;

  // name = '';
  // gender = '';
  // city = '';
  // district = '';
  // address = '';
  // mobile = '';
  // email = '';
  // dayOfBirth: Date;

  mem: Member = {
    id: '',
    name: '',
    gender: '',
    city: '',
    district: '',
    address: '',
    mobile: '',
    email: '',
    avatar: '',
    idProject: []
  };



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
  districts = [];



  valueName: string;
  valueGender: string;
  valueBirthday: Date;
  selectedCity: number;
  selectedDistrict: string;
  valueAddress: string;

  step = 0;

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private memberService: MemberService,
    public afAuth: AngularFireAuth) {
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

  addMember() {
    this.step++;
    this.memberService.addMember(this.mem).then((data) => {
      this.memberService.getByID(data.id).subscribe((param) => {
        const mem = param;
        mem.id = data.id;
        this.memberService.updateMember(data.id, mem).subscribe((da) => {
          console.log(da);
        });
      });
      this.router.navigate(['member-detail/' + data.id]);
    });
  }
}
