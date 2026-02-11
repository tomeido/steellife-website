/* STEELLIFE - Heatherwick Style Interactions */
/* Restructured: Dynamic project grid from image folder data */

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const menuBtn = document.getElementById('menuBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const projectGrid = document.getElementById('projectGrid');
    const studioSection = document.getElementById('studioSection');
    const heroVideoLeft = document.getElementById('heroVideoLeft');
    const heroVideoRight = document.getElementById('heroVideoRight');

    // Heatherwick-style elements
    const loadingOverlay = document.getElementById('loadingOverlay');
    const customCursor = document.getElementById('customCursor');
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const galleryContainer = document.getElementById('galleryContainer');
    const galleryDots = document.getElementById('galleryDots');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');
    const modalTitle = document.getElementById('modalTitle');
    const modalLocation = document.getElementById('modalLocation');
    const modalDescription = document.getElementById('modalDescription');

    // Gallery state
    let currentSlide = 0;
    let currentGalleryItems = [];

    // =====================================================
    // PROJECT DATA - All 64 projects organized by category
    // =====================================================
    const allProjects = [
        // ─── 1. Aviation & Transportation (항공/교통) ───
        {
            category: 'aviation',
            name: '인천공항 제1터미널',
            folder: 'images/1_AviationTransportation/1_인천공항1터미널',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'aviation',
            name: '인천공항 제2터미널',
            folder: 'images/1_AviationTransportation/2_인천공항2터미널',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).jpeg', 'sub (3).png']
        },
        {
            category: 'aviation',
            name: '몽골공항 NUBIA',
            folder: 'images/1_AviationTransportation/3_몽골공항NUBIA',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'aviation',
            name: '아부다비 미드필드 터미널',
            folder: 'images/1_AviationTransportation/4_아부다비미드필드터미널',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png']
        },
        {
            category: 'aviation',
            name: '판교역 알파돔시티 링크브릿지',
            folder: 'images/1_AviationTransportation/5_판교역알파돔시티링크브릿지',
            mainImage: 'main.jpeg',
            subImages: ['sub1.jpeg', 'sub2.jpeg', 'sub3.png', 'sub4.png']
        },
        {
            category: 'aviation',
            name: '군산항 국제여객터미널',
            folder: 'images/1_AviationTransportation/6_군산항국제여객터미널',
            mainImage: 'main.png',
            subImages: ['sub.png']
        },
        {
            category: 'aviation',
            name: '제주항 국제여객터미널',
            folder: 'images/1_AviationTransportation/7_제주항국제여객터미널',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'aviation',
            name: '인천공항 선경서역사',
            folder: 'images/1_AviationTransportation/8_인천공항선경서역사',
            mainImage: 'main.jpg',
            subImages: []
        },
        {
            category: 'aviation',
            name: '인천공항 제2복합청사',
            folder: 'images/1_AviationTransportation/9_인천공항제2복합청사',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'aviation',
            name: '국제물류센터',
            folder: 'images/1_AviationTransportation/10_국제물류센터',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },

        // ─── 2. Exhibition & Cultural (전시/문화) ───
        {
            category: 'exhibition',
            name: 'DDP 동대문디자인플라자',
            folder: 'images/2_ExhibitionCultural/1_DDP',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).png', 'sub (3).jpeg', 'sub (5).jpeg', 'sub (6).jpeg', 'sub (7).jpeg', 'sub (8).jpeg', 'sub (9).jpeg', 'sub (10).jpeg', 'sub (11).jpeg', 'sub (12).jpeg', 'sub (13).jpeg']
        },
        {
            category: 'exhibition',
            name: '현대 고양 모터스튜디오',
            folder: 'images/2_ExhibitionCultural/2_현대고양모터스튜디오',
            mainImage: 'main.png',
            subImages: ['sub (1).png', 'sub (2).png']
        },
        {
            category: 'exhibition',
            name: '포스코 홍보관',
            folder: 'images/2_ExhibitionCultural/3_포스코홍보관',
            mainImage: 'main.png',
            subImages: ['sub.png']
        },
        {
            category: 'exhibition',
            name: '포스코 역사관',
            folder: 'images/2_ExhibitionCultural/4_포스코역사관',
            mainImage: 'main.jpeg',
            subImages: ['sub.png']
        },
        {
            category: 'exhibition',
            name: '전곡선사박물관',
            folder: 'images/2_ExhibitionCultural/5_전곡선사박물관',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (1).jpg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).png', 'sub (4).png', 'sub (5).png', 'sub (6).png', 'sub (7).png']
        },
        {
            category: 'exhibition',
            name: '여수엑스포 삼성관',
            folder: 'images/2_ExhibitionCultural/6_여수엑스포삼성관',
            mainImage: 'main.jpg',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (3).jpeg']
        },
        {
            category: 'exhibition',
            name: '여수엑스포 주제관',
            folder: 'images/2_ExhibitionCultural/7_여수엑스포주제관',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).jpeg', 'sub (3).png', 'sub (4).jpeg', 'sub (5).jpeg', 'sub (6).jpeg', 'sub (7).jpeg']
        },
        {
            category: 'exhibition',
            name: '송도 컨벤션센터 2단계',
            folder: 'images/2_ExhibitionCultural/8_송도컨벤션센터2단계',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '박태준 기념관',
            folder: 'images/2_ExhibitionCultural/9_박태준기념관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '누리마루 APEC하우스',
            folder: 'images/2_ExhibitionCultural/10_누리마루APEC하우스',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'exhibition',
            name: '김대중 컨벤션센터',
            folder: 'images/2_ExhibitionCultural/11_김대중컨벤션센터',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'exhibition',
            name: '국립과천과학관',
            folder: 'images/2_ExhibitionCultural/12_국립과천과학관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '대구 학생문화센터',
            folder: 'images/2_ExhibitionCultural/13_대구학생문화센터',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '필리핀 아레나',
            folder: 'images/2_ExhibitionCultural/14_필리핀아레나',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).jpg', 'sub (1).png', 'sub (2).png']
        },
        {
            category: 'exhibition',
            name: '고성 통일전망대',
            folder: 'images/2_ExhibitionCultural/15_고성통일전망대',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).png']
        },
        {
            category: 'exhibition',
            name: '상암 DMC 홍보관',
            folder: 'images/2_ExhibitionCultural/16_상암DMC홍보관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '대상공원 맘스프리존',
            folder: 'images/2_ExhibitionCultural/17_대상공원맘스프리존',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg', 'sub.png']
        },
        {
            category: 'exhibition',
            name: '시흥 문화예술회관',
            folder: 'images/2_ExhibitionCultural/18_시흥문화예술회관',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'exhibition',
            name: '서서울 미술관',
            folder: 'images/2_ExhibitionCultural/19_서서울미술관',
            mainImage: 'main.jpeg',
            subImages: []
        },

        // ─── 3. Sports (스포츠) ───
        {
            category: 'sports',
            name: '잠실 체조경기장',
            folder: 'images/3_Sports/1_잠실체조경기장',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '잠실 체육관',
            folder: 'images/3_Sports/2_잠실체육관',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '울산 문수수영장',
            folder: 'images/3_Sports/3_울산문수수영장',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '진주 체육관',
            folder: 'images/3_Sports/4_진주체육관',
            mainImage: 'main.png',
            subImages: ['sub.jpeg']
        },
        {
            category: 'sports',
            name: '영주 실내체육관',
            folder: 'images/3_Sports/5_영주실내체육관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '충주 실내체육관',
            folder: 'images/3_Sports/6_충주실내체육관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '은평 구민체육센터',
            folder: 'images/3_Sports/7_은평구민체육센터',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'sports',
            name: '김천 실내수영장',
            folder: 'images/3_Sports/8_김천실내수영장',
            mainImage: 'main.jpg',
            subImages: []
        },
        {
            category: 'sports',
            name: '원주시 국민체육센터',
            folder: 'images/3_Sports/9_원주시국민체육센터',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'sports',
            name: '경산 시민운동장',
            folder: 'images/3_Sports/10_경산시민운동장',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'sports',
            name: '태능 선수촌 개선관',
            folder: 'images/3_Sports/11_태능선수촌개선관',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: '동대문 실내수영장',
            folder: 'images/3_Sports/12_동대문실내수영장',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'sports',
            name: 'KNFC',
            folder: 'images/3_Sports/13_KNFC',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg']
        },
        {
            category: 'sports',
            name: '레인보우힐스 CC',
            folder: 'images/3_Sports/14_레인보우힐스CC',
            mainImage: 'main.jpg',
            subImages: []
        },

        // ─── 4. Education & Science/Technology (교육/과학기술) ───
        {
            category: 'education',
            name: '경주 교원연수원',
            folder: 'images/4_EducationScienceTechnology/1_경주교원연수원',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg', 'sub (3).jpeg', 'sub (4).jpeg', 'sub (5).jpeg']
        },
        {
            category: 'education',
            name: '코오롱 글로벌센터',
            folder: 'images/4_EducationScienceTechnology/2_코오롱글로벌센터',
            mainImage: 'main.png',
            subImages: ['sub (1).png', 'sub (2).png', 'sub (3).png', 'sub (4).png']
        },
        {
            category: 'education',
            name: '송도 글로벌캠퍼스',
            folder: 'images/4_EducationScienceTechnology/3_송도글로벌캠퍼스',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'education',
            name: '현대 천안 글로벌연수원',
            folder: 'images/4_EducationScienceTechnology/4_현대천안글로벌연수원',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'education',
            name: '한독 제넥신 연구소',
            folder: 'images/4_EducationScienceTechnology/5_한독제넥신연구소',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },
        {
            category: 'education',
            name: '제주시 새활용센터',
            folder: 'images/4_EducationScienceTechnology/6_제주시새활용센터',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (3).jpeg', 'sub (4).jpeg']
        },
        {
            category: 'education',
            name: '남부광역 생활폐기물처리시설',
            folder: 'images/4_EducationScienceTechnology/7_남부광역생활폐기물처리시설',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'education',
            name: '광명동굴 VR체험관',
            folder: 'images/4_EducationScienceTechnology/8_광명동굴VR체험관',
            mainImage: 'main.jpeg',
            subImages: ['sub.jpeg']
        },

        // ─── 5. Office & Headquarters (업무/사옥) ───
        {
            category: 'office',
            name: 'LH 진주사옥',
            folder: 'images/5_OfficeHeadquarters/1_LH진주사옥',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).png']
        },
        {
            category: 'office',
            name: 'YG 엔터테인먼트 사옥',
            folder: 'images/5_OfficeHeadquarters/2_YG엔터네인먼트사옥',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg', 'sub (3).jpeg']
        },
        {
            category: 'office',
            name: '울릉도 코스모스호텔',
            folder: 'images/5_OfficeHeadquarters/3_울릉도코스모스호텔',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png', 'sub (3).jpeg', 'sub (3).png', 'sub (4).jpeg', 'sub (4).png', 'sub (5).jpeg', 'sub (5).png', 'sub (6).jpeg', 'sub (7).jpeg', 'sub (8).jpeg', 'sub (9).jpeg', 'sub (10).jpeg', 'sub (11).jpeg', 'sub (12).jpeg', 'sub (13).jpeg', 'sub (14).jpeg', 'sub (15).jpeg', 'sub (16).jpeg', 'sub (17).jpeg', 'sub (18).jpeg']
        },
        {
            category: 'office',
            name: '파라다이스호텔 크로마클럽터널',
            folder: 'images/5_OfficeHeadquarters/4_파라다이스호텔크로마클럽터널',
            mainImage: 'main.png',
            subImages: ['sub (1).jpeg', 'sub (1).png', 'sub (2).jpeg', 'sub (2).png']
        },
        {
            category: 'office',
            name: '파라다이스호텔 원더박스입구',
            folder: 'images/5_OfficeHeadquarters/5_파라다이스호텔원더박스입구',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'office',
            name: '드레곤시티호텔 대연회장',
            folder: 'images/5_OfficeHeadquarters/6_드레곤시티호텔대연회장',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'office',
            name: '광명동굴 VR체험센터',
            folder: 'images/5_OfficeHeadquarters/7_광명동굴VR체험센터',
            mainImage: 'main.jpeg',
            subImages: []
        },
        {
            category: 'office',
            name: 'NAVER 세종각',
            folder: 'images/5_OfficeHeadquarters/8_NAVER세종각',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'office',
            name: '현대기아 트레이닝센터',
            folder: 'images/5_OfficeHeadquarters/9_현대기아트레이닝센터',
            mainImage: 'main.jpeg',
            subImages: ['sub (1).jpeg', 'sub (2).jpeg']
        },
        {
            category: 'office',
            name: '증산도 상생월드센터',
            folder: 'images/5_OfficeHeadquarters/10_증산도상생월드센터',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'office',
            name: '남산 게스트하우스',
            folder: 'images/5_OfficeHeadquarters/11_남산게스트하우스',
            mainImage: 'main.png',
            subImages: []
        },
        {
            category: 'office',
            name: '캐나다 오크리지 포디움',
            folder: 'images/5_OfficeHeadquarters/12_캐나다오크리지포디움',
            mainImage: 'main.png',
            subImages: ['sub.jpeg', 'sub.png']
        },
        {
            category: 'office',
            name: '현대자동차 이천 자가사옥',
            folder: 'images/5_OfficeHeadquarters/13_현대자동차이천자가사옥',
            mainImage: 'main.png',
            subImages: []
        }
    ];

    // Category display names
    const categoryNames = {
        aviation: 'Aviation / Transportation',
        exhibition: 'Exhibition / Cultural',
        sports: 'Sports',
        education: 'Education / Science & Technology',
        office: 'Office / Headquarters'
    };

    // =====================================================
    // Dynamic Project Grid Rendering
    // =====================================================
    function renderProjectGrid() {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';

        allProjects.forEach((project, index) => {
            const link = document.createElement('a');
            link.href = '#';
            link.className = 'project-item';
            link.dataset.category = project.category;

            const img = document.createElement('img');
            img.src = `${project.folder}/${project.mainImage}`;
            img.alt = project.name;
            img.loading = index < 8 ? 'eager' : 'lazy';

            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            overlay.innerHTML = `
                <h2>${project.name}</h2>
                <p>${categoryNames[project.category] || ''}</p>
            `;

            link.appendChild(img);
            link.appendChild(overlay);

            // Click handler - open gallery with sub images
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openGallery(project);
            });

            // Custom cursor hover
            link.addEventListener('mouseenter', () => {
                if (customCursor) customCursor.classList.add('active');
            });
            link.addEventListener('mouseleave', () => {
                if (customCursor) customCursor.classList.remove('active');
            });

            projectGrid.appendChild(link);
        });

        // Observe items for scroll animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        projectGrid.querySelectorAll('.project-item').forEach(item => {
            observer.observe(item);
        });
    }

    // =====================================================
    // Loading Animation
    // =====================================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }, 800);
    });

    // =====================================================
    // Custom Cursor
    // =====================================================
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        cursorX += (targetX - cursorX) * 0.15;
        cursorY += (targetY - cursorY) * 0.15;

        if (customCursor) {
            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
        }
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // =====================================================
    // Project Gallery Modal
    // =====================================================

    function openGallery(project) {
        const detailsGrid = document.getElementById('detailsGrid');
        const tabDescription = document.getElementById('tabDescription');
        const tabDetails = document.getElementById('tabDetails');
        const modalTabs = document.querySelectorAll('.modal-tab');

        // Build media items: main image + all sub images
        const mediaItems = [];

        // Add main image first
        mediaItems.push({
            type: 'image',
            src: `${project.folder}/${project.mainImage}`
        });

        // Add sub images
        project.subImages.forEach(sub => {
            mediaItems.push({
                type: 'image',
                src: `${project.folder}/${sub}`
            });
        });

        // Set modal info
        if (modalTitle) modalTitle.textContent = project.name;
        if (modalLocation) modalLocation.textContent = categoryNames[project.category] || '';
        if (modalDescription) modalDescription.textContent = `STEELLIFE의 ${project.name} 프로젝트입니다.`;

        // Set details
        if (detailsGrid) {
            detailsGrid.innerHTML = '';
            const detailFields = [
                { label: 'Category', value: categoryNames[project.category] },
                { label: 'Images', value: `${mediaItems.length}` }
            ];
            detailFields.forEach(field => {
                if (field.value) {
                    const item = document.createElement('div');
                    item.className = 'detail-item';
                    item.innerHTML = `
                        <span class="detail-label">${field.label}</span>
                        <span class="detail-value">${field.value}</span>
                    `;
                    detailsGrid.appendChild(item);
                }
            });
        }

        // Reset tabs to Description
        modalTabs.forEach(tab => tab.classList.remove('active'));
        modalTabs[0]?.classList.add('active');
        if (tabDescription) tabDescription.classList.add('active');
        if (tabDetails) tabDetails.classList.remove('active');

        currentGalleryItems = mediaItems;
        currentSlide = 0;

        // Clear gallery container
        if (galleryContainer) galleryContainer.innerHTML = '';
        if (galleryDots) galleryDots.innerHTML = '';

        // Create gallery items
        mediaItems.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item' + (index === 0 ? ' active' : '');

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = project.name;
            galleryItem.appendChild(img);

            if (galleryContainer) galleryContainer.appendChild(galleryItem);

            // Create dot
            if (mediaItems.length > 1 && galleryDots) {
                const dot = document.createElement('button');
                dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
                dot.addEventListener('click', () => goToSlide(index));
                galleryDots.appendChild(dot);
            }
        });

        // Show/hide navigation arrows
        if (galleryPrev) galleryPrev.style.display = mediaItems.length > 1 ? 'block' : 'none';
        if (galleryNext) galleryNext.style.display = mediaItems.length > 1 ? 'block' : 'none';

        // Open modal
        if (projectModal) {
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Navigate to specific slide
    function goToSlide(index) {
        const items = galleryContainer?.querySelectorAll('.gallery-item');
        const dots = galleryDots?.querySelectorAll('.gallery-dot');

        if (!items || items.length === 0) return;

        items[currentSlide]?.classList.remove('active');
        dots?.[currentSlide]?.classList.remove('active');

        currentSlide = (index + items.length) % items.length;

        items[currentSlide]?.classList.add('active');
        dots?.[currentSlide]?.classList.add('active');
    }

    // Navigation buttons
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (galleryNext) {
        galleryNext.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    function closeModal() {
        if (projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Tab switching for Description/Details
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            const tabDescription = document.getElementById('tabDescription');
            const tabDetails = document.getElementById('tabDetails');

            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tabName === 'description') {
                if (tabDescription) tabDescription.classList.add('active');
                if (tabDetails) tabDetails.classList.remove('active');
            } else {
                if (tabDescription) tabDescription.classList.remove('active');
                if (tabDetails) tabDetails.classList.add('active');
            }
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!projectModal?.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // =====================================================
    // Video Configuration
    // =====================================================
    const projectsVideos = [
        'videos/projects/ddp/ddpzaha_003.mp4',
        'videos/projects/ddp/ddpzaha_004.mp4',
        'videos/projects/arena/Arena058.mp4',
        'videos/projects/arena/Arena064.mp4',
        'videos/projects/hyundai/Hyundai024.mp4',
        'videos/projects/lh/lh_002.mp4',
        'videos/projects/lh/lh_006.mp4',
        'videos/projects/soma/soma_002.mp4',
        'videos/projects/soma/soma_005.mp4',
        'videos/projects/villakosmos/villakosmos_030.mp4',
        'videos/projects/villakosmos/villakosmos_033.mp4'
    ];
    const companyVideos = [
        'videos/company/steellife/steellife (6).mp4',
        'videos/company/steellife/steellife (7).mp4'
    ];

    function setRandomVideos() {
        if (!heroVideoLeft || !heroVideoRight) return;
        const randomProjectVideo = projectsVideos[Math.floor(Math.random() * projectsVideos.length)];
        const randomCompanyVideo = companyVideos[Math.floor(Math.random() * companyVideos.length)];
        heroVideoLeft.src = randomProjectVideo;
        heroVideoRight.src = randomCompanyVideo;
        heroVideoLeft.play().catch(e => console.log("Auto-play prevented", e));
        heroVideoRight.play().catch(e => console.log("Auto-play prevented", e));
    }

    setRandomVideos();

    // Video Container Click Handlers
    const videoContainerLeft = document.querySelector('.video-container.left');
    const videoContainerRight = document.querySelector('.video-container.right');

    if (videoContainerLeft) {
        videoContainerLeft.addEventListener('click', () => {
            projectGrid.style.display = 'grid';
            if (studioSection) studioSection.classList.remove('active');
            document.querySelector('.category-bar').style.display = 'flex';
            navLinks.forEach(l => l.classList.remove('active'));
            const projectsNavLink = document.querySelector('.nav-link[data-category="projects"]');
            if (projectsNavLink) projectsNavLink.classList.add('active');
            projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (videoContainerRight) {
        videoContainerRight.addEventListener('click', () => {
            projectGrid.style.display = 'none';
            if (studioSection) studioSection.classList.add('active');
            document.querySelector('.category-bar').style.display = 'none';
            navLinks.forEach(l => l.classList.remove('active'));
            const companyNavLink = document.querySelector('.nav-link[data-category="company"]');
            if (companyNavLink) companyNavLink.classList.add('active');
            studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Intro Overlay Animation
    const introOverlay = document.getElementById('introOverlay');
    if (introOverlay) {
        setTimeout(() => {
            introOverlay.classList.add('hidden');
        }, 2500);
    }

    // =====================================================
    // Menu Toggle
    // =====================================================
    function toggleMenu() {
        menuBtn.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', toggleMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navOverlay.classList.contains('active')) {
            toggleMenu();
        }
    });

    // =====================================================
    // Category Filtering
    // =====================================================
    function filterProjects(category) {
        const projectItems = projectGrid.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            const itemCategory = item.dataset.category;
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hidden');
                item.style.animation = 'none';
                item.offsetHeight; // Trigger reflow
                item.style.animation = null;
            } else {
                item.classList.add('hidden');
            }
        });

        // Update active button
        categoryBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProjects(btn.dataset.filter);

            const heroSection = document.querySelector('.hero-section');
            const scrollY = window.pageYOffset;
            const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            if (scrollY < heroHeight - 100) {
                projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Navigation filter links in overlay
    const navFilterLinks = document.querySelectorAll('.nav-overlay a[data-filter]');
    navFilterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterProjects(link.dataset.filter);
            toggleMenu();
        });
    });

    // =====================================================
    // Projects/Company Toggle
    // =====================================================
    const heroSection = document.querySelector('.hero-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const category = link.dataset.category;
            const href = link.getAttribute('href');

            if (!category || (href && href !== '#' && !href.startsWith('#'))) {
                return;
            }

            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (category === 'company') {
                projectGrid.style.display = 'none';
                if (studioSection) studioSection.classList.add('active');
                document.querySelector('.category-bar').style.display = 'none';

                const scrollY = window.pageYOffset;
                const heroHeight = heroSection ? heroSection.offsetHeight : 0;
                if (scrollY < heroHeight - 100) {
                    studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                projectGrid.style.display = 'grid';
                if (studioSection) studioSection.classList.remove('active');
                document.querySelector('.category-bar').style.display = 'flex';

                const scrollY = window.pageYOffset;
                const heroHeight = heroSection ? heroSection.offsetHeight : 0;
                if (scrollY < heroHeight - 100) {
                    projectGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Handle About link in overlay menu
    document.querySelectorAll('a[data-category="company"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (navOverlay && navOverlay.classList.contains('active')) {
                toggleMenu();
            }

            navLinks.forEach(l => l.classList.remove('active'));
            const companyNavLink = document.querySelector('.nav-link[data-category="company"]');
            if (companyNavLink) companyNavLink.classList.add('active');

            projectGrid.style.display = 'none';
            if (studioSection) studioSection.classList.add('active');
            document.querySelector('.category-bar').style.display = 'none';

            setTimeout(() => {
                studioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                if (navOverlay.classList.contains('active')) {
                    toggleMenu();
                }

                if (href === '#contact') {
                    document.getElementById('contact').classList.add('active');
                }

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            console.log('Form submitted:', data);
            alert('Thank you for your message. We will get back to you soon.');
            contactForm.reset();
        });
    }

    // =====================================================
    // Header scroll effect
    // =====================================================
    let lastScroll = 0;
    const header = document.querySelector('.header');
    const categoryBar = document.querySelector('.category-bar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const threshold = window.innerHeight - 100;

        if (currentScroll > threshold) {
            header.style.background = 'rgba(0, 0, 0, 0.85)';
            header.style.backdropFilter = 'blur(20px)';
            if (categoryBar) {
                categoryBar.style.background = 'rgba(0, 0, 0, 0.85)';
                categoryBar.style.backdropFilter = 'blur(20px)';
            }
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            if (categoryBar) {
                categoryBar.style.background = 'transparent';
                categoryBar.style.backdropFilter = 'none';
            }
        }

        lastScroll = currentScroll;
    });

    // =====================================================
    // Initialize: Render project grid
    // =====================================================
    renderProjectGrid();

    console.log('STEELLIFE Heatherwick-style site initialized with', allProjects.length, 'projects');
});
