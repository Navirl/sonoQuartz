---
tags:
  - Info
---

daily:: [2024-06-17](/Daily_Note/2024-06-17.md)
up:: [sd](../Bar/Stable%20Diffusion.md)

template
```powershell

```

sdwebui
```powershell

```

comfyui
```powershell
pip uninstall torch torchvision torchaudio -y  
pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu121  
pip install insightface onnxruntime  
# !rm -rf ~/.cache
pip install -r D:\Linux\AI\ComfyUI\custom_nodes\comfyui_controlnet_aux\requirements.txt  
pip install -r D:\Linux\AI\ComfyUI\custom_nodes\ComfyUI-layerdiffuse\requirements.txt  
# pip install -r /home/jupyter/ComfyUI/custom_nodes/ComfyUI-Inspire-Pack/requirements.txt
pip install -r D:\Linux\AI\ComfyUI\custom_nodes\ComfyUI-Dev-Utils\requirements.txt
# pip install -r /home/jupyter/ComfyUI/custom_nodes/ComfyUI_wav2lip/requirements.txt
pip install -r D:\Linux\AI\ComfyUI\custom_nodes\comfyui-prompt-reader-node\requirements.txt


git clone --depth 1 https://github.com/ltdrdata/ComfyUI-Manager
git clone --depth 1 https://github.com/pythongosssss/ComfyUI-Custom-Scripts
git clone --depth 1 https://github.com/cubiq/ComfyUI_IPAdapter_plus
git clone --depth 1 https://github.com/ltdrdata/ComfyUI-Impact-Pack

git clone --depth 1 https://github.com/BlenderNeko/ComfyUI_Cutoff
git clone --depth 1 https://github.com/pythongosssss/ComfyUI-WD14-Tagger
git clone --depth 1 https://github.com/crystian/ComfyUI-Crystools
git clone --depth 1 https://github.com/Tropfchen/ComfyUI-yaResolutionSelector
git clone --depth 1 https://github.com/da2el-ai/ComfyUI-d2-size-selector

# git clone --depth 1 https://github.com/cubiq/ComfyUI_InstantID
git clone --depth 1 https://github.com/rgthree/rgthree-comfy
# git clone --depth 1 https://github.com/tzwm/comfyui-profiler
# git clone --depth 1 https://github.com/TheMistoAI/ComfyUI-Anyline
# git clone --depth 1 https://github.com/jkrauss82/ultools-comfyui
git clone --depth 1 https://github.com/talesofai/comfyui-browser
# git clone --depth 1 https://github.com/JettHu/ComfyUI-TCD
# git clone --depth 1 https://github.com/huchenlei/ComfyUI_omost
# git clone --depth 1 https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite
# git clone --depth 1 https://github.com/kijai/ComfyUI-DynamiCrafterWrapper

git clone --depth 1 https://github.com/shiimizu/ComfyUI-TiledDiffusion
# git clone https://github.com/BlenderNeko/ComfyUI_TiledKSampler
    
# git clone --depth 1 https://github.com/BlenderNeko/ComfyUI_Noise
# git clone --depth 1 https://github.com/SLAPaper/ComfyUI-Image-Selector

# git clone --depth 1 https://github.com/Fannovel16/ComfyUI-Frame-Interpolation
    
# git clone --depth 1 https://github.com/chrisgoringe/cg-image-picker    
# # git clone --depth 1 --recursive https://github.com/ssitu/ComfyUI_UltimateSDUpscale

git clone --depth 1 https://github.com/giriss/comfy-image-saver
git clone --depth 1 https://github.com/dfl/comfyui-clip-with-break
git clone --recursive https://github.com/receyuki/comfyui-prompt-reader-node

# git clone --depth 1 https://github.com/pkpkTech/ComfyUI-ngrok
git clone --depth 1 https://github.com/Fannovel16/comfyui_controlnet_aux
git clone --depth 1 https://github.com/huchenlei/ComfyUI-layerdiffuse
# git clone --depth 1 https://github.com/kohya-ss/ControlNet-LLLite-ComfyUI
git clone --depth 1 https://github.com/ltdrdata/ComfyUI-Inspire-Pack
git clone --depth 1 https://github.com/cubiq/ComfyUI_essentials
# git clone --depth 1 https://github.com/evanspearman/ComfyMath
# git clone --depth 1 https://github.com/WASasquatch/PowerNoiseSuite   
# git clone --depth 1 https://github.com/Jordach/comfy-plasma   
# git clone --depth 1 https://github.com/florestefano1975/comfyui-prompt-composer

git clone --depth 1 https://github.com/Kosinkadink/ComfyUI-Advanced-ControlNet
# git clone --depth 1 https://github.com/Danand/ComfyUI-ComfyCouple
```