---
title: 'LLM inference engine'
year: 2026
summary: 'FlashAttention-2 kernel in Triton; matches HF throughput'
description: 'An LLM serving engine that runs Qwen2.5-1.5B on my own implementation of the model, with a paged KV cache, continuous batching, and a FlashAttention-2 kernel written in Triton. It matches Hugging Face throughput at low concurrency and scales about 10x from 1 to 16 concurrent chats.'
link: 'https://github.com/shubhav1/my-inference-engine'
featured: true
order: 1
image: /projects/llm-inference-engine.jpg
# video: /projects/llm-inference-engine.mp4
---
