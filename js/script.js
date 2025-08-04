// 雛屋ちゃんファンサイト JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // 背景の星アニメーション
    const bubbleContainer = document.getElementById('bubble-container');
    
    function createStar(initialY = null) {
        const star = document.createElement('div');
        
        // ランダムな星のサイズ
        const sizeType = Math.random();
        if (sizeType < 0.6) {
            star.className = 'bubble'; // 小さい星 (60%)
        } else if (sizeType < 0.9) {
            star.className = 'bubble medium'; // 中サイズ (30%)
        } else {
            star.className = 'bubble large'; // 大きい星 (10%)
        }
        
        // ランダムな位置
        star.style.left = Math.random() * window.innerWidth + 'px';
        
        // ランダムなアニメーション速度（より遅くして滑らかに）
        const duration = Math.random() * 30 + 40; // 40〜70秒
        star.style.setProperty('--duration', duration + 's');
        
        // 微細な横揺れ
        const wobble = Math.random() * 0.5 - 0.25; // -0.25〜0.25
        star.style.setProperty('--wobble', wobble);
        
        // 初期位置の設定
        if (initialY !== null) {
            // 画面の指定位置に配置
            const progress = initialY / 100; // 0〜1の進行度
            star.style.bottom = window.innerHeight * initialY / 100 + 'px';
            star.style.animationDelay = `-${duration * progress}s`;
            star.style.opacity = '1';
        }
        
        bubbleContainer.appendChild(star);
        
        // アニメーション終了後に削除
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }
    
    // 初期表示時に画面全体に星をランダムに配置
    for (let i = 0; i < 150; i++) {
        // 画面の0%〜100%の高さにランダムに配置
        const initialPosition = Math.random() * 100;
        createStar(initialPosition);
    }
    
    // 定期的に新しい星を生成（画面下から）
    setInterval(() => createStar(), 500);
    
    // ページロード時のフェードインアニメーション
    const mainContent = document.querySelector('.main-content');
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        mainContent.style.transition = 'all 1s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
    }, 300);

    // スクロール時のセクションアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);

    // 監視対象の要素を設定
    const sections = document.querySelectorAll('.hero-section, .profile-section, .gallery-section, .message-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    // ギャラリー画像のクリックイベント
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            createImageModal(this.src, this.alt);
        });
    });

    // 画像モーダル作成関数
    function createImageModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <img src="${src}" alt="${alt}" class="modal-image">
                    <p class="modal-caption">${alt}</p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // モーダル表示アニメーション
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);

        // クローズイベント
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-backdrop').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // ESCキーでクローズ
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // パーティクル効果（雛屋ちゃんらしい魔法的な演出）
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #FF69B4, #9370DB);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
            opacity: 0.8;
            animation: particleFloat 3s ease-out forwards;
        `;

        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }

    // パーティクル生成を定期実行
    setInterval(createParticle, 2000);

    // ヘッダータイトルのホバー効果
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        siteTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '0 0 50px rgba(138, 43, 226, 0.8)';
        });

        siteTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = '0 0 30px rgba(138, 43, 226, 0.5)';
        });
    }
    
    // Twitterセクションのスクロールアニメーション
    const twitterSection = document.querySelector('.twitter-section');
    if (twitterSection) {
        twitterSection.style.opacity = '0';
        observer.observe(twitterSection);
    }
    

    // メッセージカードのランダム表示順序
    const messageCards = document.querySelectorAll('.message-card');
    messageCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'fadeInUp 0.8s ease forwards';
    });

    console.log('🌸 雛屋ちゃんのファンサイトへようこそ！ 🌸');
});

// CSSアニメーションの定義をJavaScriptで追加
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes particleFloat {
        0% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
        }
        50% {
            opacity: 1;
            transform: translateY(-50vh) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) scale(0.5);
        }
    }

    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }

    .modal-image {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 15px;
        box-shadow: 0 20px 60px rgba(138, 43, 226, 0.5);
    }

    .modal-caption {
        color: #DDA0DD;
        font-size: 1.2em;
        margin-top: 20px;
        font-weight: 600;
    }

    .modal-close {
        position: absolute;
        top: -40px;
        right: -40px;
        background: none;
        border: none;
        color: #ffffff;
        font-size: 2em;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        background: rgba(138, 43, 226, 0.3);
        transform: scale(1.1);
    }

    .magic-particle {
        box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
    }
`;
document.head.appendChild(style);