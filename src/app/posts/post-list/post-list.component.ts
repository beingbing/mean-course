import { Component, Input } from "@angular/core";
import { Post } from '../post.model';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    @Input() posts: Post[] = [
        // {title: 'First Post', content: 'This is a very first post in my series of posts'},
        // {title: 'Second Post', content: 'now this is after first hence second'},
        // {title: 'Third Post', content: 'There is no stopping to me now'},
        // {title: 'Forth Post', content: 'Okay, I will hold on for you'}
    ];
}