import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { PostsService } from '../posts.service';
import { Post } from './../post.model';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

    public post: Post;
    public isLoading: boolean;
    private mode = 'create';
    private postId: string;
    constructor(
        private _postsService: PostsService,
        private _route: ActivatedRoute
    ) {}

    public onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this._postsService.addPost(form.value.title, form.value.content);
        } else {
            this._postsService.updatePost(this.postId, form.value.title, form.value.content);
        }
        form.resetForm();
    }

    public ngOnInit() {
        this._route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.mode = 'edit';
                this.postId = paramMap.get('id');
                this.isLoading = true;
                this._postsService.getPost(this.postId).subscribe(postData => {
                    this.isLoading = false;
                    this.post = {
                        id: postData._id,
                        title: postData.title,
                        content: postData.content
                    };
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }
}




