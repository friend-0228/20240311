import express from 'express';
import { prisma } from '../utils/prisma/index.js';

const router = express.Router();

// 게시글 작성
const createNewPost = async (req, res) => {
    const { title, content } = req.body;

    const newPost = await prisma.posts.create({
        data: {
            title: title,
            content: content,
        },
    });
    return res.status(200).json({ data: newPost, message: '게시글을 작성했습니다.' });
};

// 게시글 전체 조회
const getAllPosts = async (req, res) => {
    const posts = await prisma.posts.findMany({
        select: {
            id: true,
            title: true,
            content: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return res.status(200).json({ data: posts });
};

// 게시글 수정
const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatedPost = await prisma.posts.update({
        data: {
            title: title,
            content: content,
        },
        where: { id: +postId },
    });
    return res.status(200).json({ data: updatedPost, message: '게시글을 수정했습니다.' });
};

// 게시글 삭제
const deletePostById = async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.posts.delete({ where: { id: +postId } });

    return res.status(200).json({ message: '게시글을 삭제했습니다.' });
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

export default router;
