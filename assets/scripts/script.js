document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        hamburger.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        if (!section.classList.contains('hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            sectionObserver.observe(section);
        }
    });

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const daySchedules = document.querySelectorAll('.day-schedule');
    const currentDayElement = document.getElementById('current-day');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    
    function getDayIndex(dayName) {
        return days.findIndex(day => day === dayName.toLowerCase());
    }
    
    let currentDayIndex = new Date().getDay();
    
    if (currentDayIndex === 0 || currentDayIndex === 6) {
        currentDayIndex = 1;
    } else {

        currentDayIndex -= 1;
    }
    

    function showDay(dayIndex) {
        daySchedules.forEach(schedule => {
            schedule.classList.remove('active');
        });
        
        const dayName = days[dayIndex + 1];
        const currentSchedule = document.querySelector(`.day-schedule[data-day="${dayName}"]`);
        
        if (currentSchedule) {
            currentSchedule.classList.add('active');
            currentDayElement.textContent = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)}'s Schedule`;
        }
    }
    
    function showNextDay() {
        currentDayIndex = (currentDayIndex + 1) % 5;
        showDay(currentDayIndex);
    }
    
    function showPrevDay() {
        currentDayIndex = (currentDayIndex - 1 + 5) % 5;
        showDay(currentDayIndex);
    }
    
    if (prevDayBtn && nextDayBtn) {
        prevDayBtn.addEventListener('click', showPrevDay);
        nextDayBtn.addEventListener('click', showNextDay);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                showPrevDay();
            } else if (e.key === 'ArrowRight') {
                showNextDay();
            }
        });
    }
    
    showDay(currentDayIndex);
    
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        const clockElement = document.getElementById('current-time');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
    
    updateTime();
    setInterval(updateTime, 60000);
});
