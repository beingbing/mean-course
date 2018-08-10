import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.sevice";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    constructor(
        private _postsService: PostsService
    ) {}

    public onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this._postsService.addPost(form.value.title, form.value.content);
        form.resetForm();
    }
}




