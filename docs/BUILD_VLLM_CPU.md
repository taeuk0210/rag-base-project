```bash
# 1. 
git clone https://github.com/vllm-project/vllm.git

# 2. 
run wsl

# 3. 
cd vllm

#4. 
docker image build -f docker/Dockerfile.cpu \
    --tag vllm-cpu-env \
    --target vllm-openai .
```