import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BugService } from '../shared/services/bug.service';

@Component({
  selector: 'adm-page',
  templateUrl: './adm-page.component.html',
  styleUrls: ['./adm-page.component.css']
})
export class AdmPageComponent implements OnInit{
  IssuesList: any = [];
  issueForm: FormGroup;

  ngOnInit() {
    this.loadEmployees();
    this.addIssue();
  }

  constructor(
    public bugService: BugService,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    ) {}

  // Issues list
  loadEmployees() {
    return this.bugService.GetIssues().subscribe((data: {}) => {
      this.IssuesList = data;
    });
  }

  // Delete issue
  deleteIusse(data) {
    var index = (index = this.IssuesList.map((x) => {
      return x.issue_name;
    }).indexOf(data.issue_name));
    return this.bugService.DeleteBug(data.id).subscribe((res) => {
      this.IssuesList.splice(index, 1);
      console.log('Issue deleted!');
    });
  }



  addIssue() {
    this.issueForm = this.fb.group({
      issue_name: [''],
      issue_message: [''],
    });
  }

  submitForm() {
    alert("TEST")
   
    this.bugService.CreateBug(this.issueForm.value).subscribe((res) => {
      console.log('Issue added!');
      this.ngZone.run(() =>  window.location.reload());
    });
  }


}
