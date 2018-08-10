import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

    // public enteredValue = '';
    // public enteredContent = '';
    // public enteredTitle = '';
    // public newPost = 'NO CONTENT';
    @Output() public postCreated = new EventEmitter<Post>();

    constructor() {}

    public onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        // postInput: HTMLTextAreaElement
        // console.dir(postInput);
        // this.newPost = postInput.value;
        // this.newPost = this.enteredContent;
        const post: Post = {
            title: form.value.title,
            content: form.value.content
        };
        this.postCreated.emit(post);
    }
}




