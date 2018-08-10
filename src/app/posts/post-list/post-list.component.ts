import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostsService } from "../posts.sevice";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    public postsSub: Subscription;

    constructor(
        private _postsService: PostsService
    ) {}

    public ngOnInit() {
        this.posts = this._postsService.getPosts();
        this.postsSub = this._postsService.getPostsUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    public ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}