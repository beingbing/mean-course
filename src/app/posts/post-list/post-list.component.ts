import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostsService } from "../posts.sevice";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [
        // {title: 'First Post', content: 'This is a very first post in my series of posts'},
        // {title: 'Second Post', content: 'now this is after first hence second'},
        // {title: 'Third Post', content: 'There is no stopping to me now'},
        // {title: 'Forth Post', content: 'Okay, I will hold on for you'}
    ];
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