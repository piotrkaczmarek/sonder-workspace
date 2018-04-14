import { Component, OnInit, Input } from '@angular/core';
import { Store } from "@ngrx/store";
import { Post } from "../../../models";
import { PostsState } from "../../../+state/posts.interfaces";

@Component({
  selector: "post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.css"]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  constructor(private store: Store<PostsState>) {}

  ngOnInit() {}
}
