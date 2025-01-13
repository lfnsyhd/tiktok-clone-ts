export interface MenuItemsTypes {
  iconString: string;
  colorString: string;
  sizeString: string
}

export interface RandomUsers {
  id: string;
  name: string;
  image: string
}

export interface Profile {
  user_id: string;
  name: string;
  image: string;
  bio?: string;
  id?: string
}

export interface PostWithProfile {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string;
  profile: Profile
}

export interface MenuItemFollowCompTypes {
  user: RandomUsers
}

export interface PostMainCompTypes {
  post: PostWithProfile
}

export interface PostMainLikesCompTypes {
  post: PostWithProfile
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string
}

export interface UploadError {
  type: string;
  message: string
}

export interface ProfilePageTypes {
  params: Promise<{id: string}>
}

export interface Post {
  id: string;
  user_id: string;
  video_url: string;
  text: string;
  created_at: string
}

export interface PostUserCompTypes {
  post: Post
}

export interface CropperDimensions {
  height?: number | null;
  width?: number | null;
  left?: number | null;
  top?: number | null
}

export interface ShowErrorObject {
  type: string;
  message: string
}

export interface TextInputCompTypes {
  string: string;
  inputType: string;
  placeholder: string;
  onUpdate: (newValue: string) => void;
  error: string
}

export interface ParamsDefault {
  userId: string;
  postId: string
}

export interface PostPageTypes {
  params: ParamsDefault
}

export interface CommentsHeaderCompTypes {
  params: ParamsDefault;
  post: PostWithProfile
}

export interface CommentsCompTypes {
  params: ParamsDefault
}

export interface CommentWithProfile {
  id: string;
  user_id: string;
  post_id: string;
  text: string;
  created_at: string;
  profile: {
    user_id: string;
    name: string;
    image: string;
  }
}

export interface SingleCommentCompTypes {
  params: ParamsDefault;
  comment: CommentWithProfile
}

export interface KeyboardEventWithCode extends KeyboardEvent {
  code: string;
}

export interface User {
  id: string;
  name: string;
  bio: string;
  image: string
}

export interface UserContextTypes {
  user: User | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkUser: () => Promise<void>
}