/* ========================================
    JavaScript文件 - 让网页有交互功能
    JavaScript可以让网页"动起来"，响应用户的操作
    比如点击按钮、滚动页面等
======================================== */

// ==================== 页面加载完成后执行 ====================
// DOMContentLoaded 事件在HTML完全加载后触发
// 这样可以确保所有元素都存在，不会报错
document.addEventListener('DOMContentLoaded', function() {

    // 调用各个功能函数
    initSmoothScroll();      // 初始化平滑滚动
    initNavHighlight();      // 初始化导航高亮
    initFormSubmit();        // 初始化表单提交
    initScrollAnimation();   // 初始化滚动动画

});


// ==================== 平滑滚动功能 ====================
// 点击导航链接时，页面平滑滚动到对应区域
function initSmoothScroll() {

    // 获取所有导航链接
    // querySelectorAll 选择所有匹配的元素
    // '.nav-links a' 表示选择 class="nav-links" 里面的所有 a 标签
    const navLinks = document.querySelectorAll('.nav-links a');

    // 遍历每个导航链接
    // forEach 是数组的循环方法，对每个元素执行函数
    navLinks.forEach(function(link) {

        // 给每个链接添加点击事件监听器
        // addEventListener 添加事件监听器
        // 'click' 是事件类型，表示点击事件
        link.addEventListener('click', function(e) {

            // e.preventDefault() 阻止默认行为
            // 默认行为是点击链接直接跳转，我们想用平滑滚动代替
            e.preventDefault();

            // 获取链接的目标区域ID
            // this 指向当前被点击的链接
            // getAttribute('href') 获取 href 属性值（如 "#about"）
            // slice(1) 去掉第一个字符（#），得到 "about"
            const targetId = this.getAttribute('href').slice(1);

            // 根据ID获取目标元素
            // getElementById 通过ID获取元素
            const targetElement = document.getElementById(targetId);

            // 如果目标元素存在
            if (targetElement) {

                // 平滑滚动到目标元素
                // scrollIntoView 让元素滚动到可视区域
                // behavior: 'smooth' 表示平滑滚动
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

            }

        });

    });

}


// ==================== 导航高亮功能 ====================
// 滚动页面时，导航栏中对应的链接高亮显示
function initNavHighlight() {

    // 获取所有需要高亮的区域
    // 这些区域的ID和导航链接的href对应
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    // 监听页面滚动事件
    // 'scroll' 是滚动事件
    window.addEventListener('scroll', function() {

        // 记录当前可见区域对应的导航链接
        let currentSection = '';

        // 遍历所有区域
        sections.forEach(function(section) {

            // 获取区域距离页面顶部的距离
            // offsetTop 是元素顶部距离页面顶部的距离
            const sectionTop = section.offsetTop;

            // 获取区域的高度
            // offsetHeight 是元素的高度
            const sectionHeight = section.offsetHeight;

            // 获取当前滚动位置
            // pageYOffset 是页面滚动的距离
            // 加150是因为导航栏是固定的，需要考虑导航栏高度
            const scrollPosition = window.pageYOffset + 150;

            // 判断当前滚动位置是否在这个区域内
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {

                // 获取区域的ID
                currentSection = section.getAttribute('id');

            }

        });

        // 遍历所有导航链接
        navLinks.forEach(function(link) {

            // 先移除所有链接的高亮样式
            // classList 操作元素的class属性
            // remove 移除指定的class
            link.classList.remove('active');

            // 获取链接的href属性
            const href = link.getAttribute('href');

            // 如果链接的href和当前区域匹配
            // href 格式是 "#about"，所以用 includes 判断
            if (href && href.includes(currentSection)) {

                // 给匹配的链接添加高亮样式
                // add 添加指定的class
                link.classList.add('active');

            }

        });

    });

}


// ==================== 表单提交功能 ====================
// 处理联系表单的提交
function initFormSubmit() {

    // 获取表单元素
    // querySelector 选择第一个匹配的元素
    const form = document.querySelector('.contact-form');

    // 如果表单存在
    if (form) {

        // 监听表单提交事件
        // 'submit' 是表单提交事件
        form.addEventListener('submit', function(e) {

            // 阻止表单默认提交行为
            // 默认行为是刷新页面或跳转，我们想用JavaScript处理
            e.preventDefault();

            // 获取表单数据
            // FormData 可以获取表单中所有输入框的值
            const formData = new FormData(form);

            // 从FormData中获取各个字段的值
            // get 方法获取指定字段的值
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // 简单验证（检查是否为空）
            if (!name || !email || !message) {

                // alert 弹出提示框
                alert('请填写所有字段！');
                return; // 结束函数执行

            }

            // 这里可以添加发送数据到服务器的代码
            // 目前只是模拟提交成功
            console.log('表单数据：', {
                name: name,
                email: email,
                message: message
            });

            // 显示成功提示
            alert('感谢您的留言！我们会尽快回复您。');

            // 清空表单
            // reset 方法重置表单到初始状态
            form.reset();

        });

    }

}


// ==================== 滚动动画功能 ====================
// 当元素滚动到可视区域时，添加动画效果
function initScrollAnimation() {

    // 获取需要动画的元素
    // 这里选择所有服务卡片
    const animatedElements = document.querySelectorAll('.service-card, .about-text, .about-image');

    // 创建观察器
    // IntersectionObserver 可以观察元素是否进入可视区域
    const observer = new IntersectionObserver(function(entries) {

        // entries 是所有被观察元素的数组
        entries.forEach(function(entry) {

            // 如果元素进入可视区域
            // isIntersecting 为 true 表示元素可见
            if (entry.isIntersecting) {

                // 添加动画类
                entry.target.classList.add('animate-in');

            }

        });

    }, {
        // threshold 表示元素进入可视区域多少比例时触发
        // 0.1 表示进入10%就触发
        threshold: 0.1
    });

    // 观察每个需要动画的元素
    animatedElements.forEach(function(element) {

        observer.observe(element);

    });

    // 添加动画样式（通过JavaScript动态添加CSS）
    // 创建一个style元素
    const style = document.createElement('style');

    // 设置CSS内容
    // .animate-in 类定义了动画结束状态
    // 初始状态在CSS中设置，这里设置动画后的状态
    style.textContent = `
        /* 动画元素的初始状态 */
        .service-card,
        .about-text,
        .about-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        /* 动画元素的结束状态 */
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    // 将style元素添加到head中
    document.head.appendChild(style);

}


// ==================== 导航栏滚动效果 ====================
// 页面滚动时，导航栏背景变化
(function() {

    // 获取导航栏元素
    const navbar = document.querySelector('.navbar');

    // 如果导航栏存在
    if (navbar) {

        // 监听页面滚动
        window.addEventListener('scroll', function() {

            // 获取滚动距离
            const scrollPosition = window.pageYOffset;

            // 如果滚动超过50像素
            if (scrollPosition > 50) {

                // 添加阴影效果
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';

            } else {

                // 移除阴影效果
                navbar.style.boxShadow = 'none';

            }

        });

    }

})();


// ==================== 工具函数 ====================

/**
 * 防抖函数
 * 作用：防止函数被频繁调用
 * 使用场景：比如搜索框输入时，只在用户停止输入后才执行搜索
 *
 * @param {Function} func - 需要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
function debounce(func, wait) {

    // timer 用于存储定时器
    let timer = null;

    // 返回一个新函数
    return function(...args) {

        // 清除之前的定时器
        clearTimeout(timer);

        // 设置新的定时器
        // wait 毫秒后执行函数
        timer = setTimeout(function() {
            func.apply(this, args);
        }, wait);

    };

}


/**
 * 节流函数
 * 作用：限制函数的执行频率
 * 使用场景：比如滚动事件，每200毫秒最多执行一次
 *
 * @param {Function} func - 需要节流的函数
 * @param {number} limit - 时间间隔（毫秒）
 * @returns {Function} - 节流后的函数
 */
function throttle(func, limit) {

    // inThrottle 标记是否在节流中
    let inThrottle = false;

    // 返回一个新函数
    return function(...args) {

        // 如果不在节流中
        if (!inThrottle) {

            // 执行函数
            func.apply(this, args);

            // 标记为节流中
            inThrottle = true;

            // limit 毫秒后解除节流
            setTimeout(function() {
                inThrottle = false;
            }, limit);

        }

    };

}


// ==================== 控制台提示 ====================
// 在控制台输出一些提示信息
// console.log 可以在浏览器的开发者工具控制台中看到
console.log('网页加载完成！');
console.log('如有问题，请检查浏览器控制台的错误信息。');