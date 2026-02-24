// 数字增长动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// 图标脉动动画
function addIconPulseAnimation() {
    const icons = document.querySelectorAll('.fa');
    icons.forEach(icon => {
        icon.classList.add('transition-all', 'duration-300');
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.color = '#165DFF';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.color = '';
        });
    });
}

// 滚动触发动画
function initScrollAnimations() {
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('animate-fade-in');
            }
        });
    });
}

// 文字打字机效果
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 技能条动画
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// 卡片悬停效果增强
function enhanceCardHoverEffects() {
    const cards = document.querySelectorAll('.skill-card, .award-card, .project-card, .card');
    
    cards.forEach(card => {
        card.classList.add('transition-all', 'duration-300');
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px -10px rgba(22, 93, 255, 0.2)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// 导航栏滚动效果
function initNavbarScrollEffect() {
    const navbar = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('shadow-lg', 'py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.remove('shadow-lg', 'py-2');
            navbar.classList.add('py-3');
        }
    });
}

// 按钮波纹效果
function addButtonRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn-primary, a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('absolute', 'rounded-full', 'bg-white', 'opacity-50', 'transform', 'scale-0', 'transition-transform', 'duration-500');
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.left = x - 10 + 'px';
            ripple.style.top = y - 10 + 'px';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.classList.add('scale-100');
                ripple.classList.remove('scale-0');
            }, 10);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 初始化所有动画
function initAnimations() {
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 添加CSS动画类
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(20px);
            }
        `;
        document.head.appendChild(style);
        
        // 初始化动画
        addIconPulseAnimation();
        initScrollAnimations();
        enhanceCardHoverEffects();
        initNavbarScrollEffect();
        addButtonRippleEffect();
        
        // 触发数字增长动画
        const counters = document.querySelectorAll('.text-5xl.font-bold');
        counters.forEach(counter => {
            if (counter.textContent.includes('+')) {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            }
        });
        
        // 触发技能条动画
        animateSkillBars();
        
        // 为特定元素添加打字机效果
        const typeElements = document.querySelectorAll('.typewriter');
        typeElements.forEach(element => {
            const text = element.textContent;
            typeWriter(element, text);
        });
    });
}

// 导出初始化函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAnimations };
} else {
    // 浏览器环境直接初始化
    initAnimations();
}