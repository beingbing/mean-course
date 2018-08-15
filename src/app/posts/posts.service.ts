import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(
        private http: HttpClient
    ) { }

    public getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
        .pipe(map(postData => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe(transformedPosts => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    public getPostsUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    public addPost(title: string, content: string) {
        const post: Post = {
            id: null,
            title: title,
            content: content
        };

        this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
            .subscribe((responseData) => {
                console.log('post request responsedata', responseData.message);
                const postId = responseData.postId;
                post.id = postId;
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    }

    public deletePost(postId: string) {
        this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
            console.log('deleted');
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    public getPost(id: string) {
        return {...this.posts.find(p => p.id === id)};
    }

    public updatePost(id: string, title: string, content: string) {
        const post: Post = { id: id, title: title, content: content };
        this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe(response => console.log('response', response));
    }

}