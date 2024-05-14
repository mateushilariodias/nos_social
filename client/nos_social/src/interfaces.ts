export interface IPost {
    id: number;
    profilePicture: string;
    author: string;
    description: string;
    image: string;
    createdPost: string;
    userId: number;
}

export interface ILike {
    id: number;
    userName: string;
    likeUserId: number;
    postId: number
}

export interface IComment {
    id: number;
    comment: number;
    userName: string;
    userImg: string;
    commentUserId: number;
    postId: number
    createdComment: string;
}

export interface IUser {
    id: number;
    fullName: string,
    userName: string,
    emailUser: string,
    phoneNumberUser: string,
    passwordUser: string,
    userImg: string,
}

export interface INgo {
    id: number;
    cnpj: string,
    stateRegistration: string,
    corporateReason: string,
    emailNgo: string,
    phoneNumberNgo: string,
    objectiveOfTheNgo: string,
    pageName: string,
    imageNgo: string,
    bgImageNgo: string,
    registeringUser: string
}
