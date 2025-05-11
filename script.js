// 存储兽设数据的数组
let beastData = JSON.parse(localStorage.getItem('beastData')) || [];

// 页面加载时显示已登记兽设
document.addEventListener('DOMContentLoaded', function () {
    displayBeastRecords();
});

// 监听搜索按钮点击事件
document.getElementById('search-button').addEventListener('click', function () {
    searchBeasts();
});

// 监听搜索输入框回车事件
document.getElementById('search-input').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchBeasts();
    }
});

// 监听登记表单提交事件
document.getElementById('beast-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const beastName = document.getElementById('beast-name').value;
    const douyinName = document.getElementById('douyin-name').value;
    const douyinId = document.getElementById('douyin-id').value;
    const beastImageFile = document.getElementById('beast-image').files[0];

    if (!beastImageFile) {
        alert('请选择兽设图片');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const beastRecord = {
            id: Date.now(),
            name: beastName,
            douyinName: douyinName,
            douyinId: douyinId,
            image: e.target.result,
            registerTime: new Date().toLocaleString()
        };

        beastData.push(beastRecord);
        localStorage.setItem('beastData', JSON.stringify(beastData));
        displayBeastRecords();
        document.getElementById('beast-form').reset();
    };
    reader.readAsDataURL(beastImageFile);
});

// 显示兽设记录
function displayBeastRecords () {
    const beastRecordsContainer = document.getElementById('beast-records');
    beastRecordsContainer.innerHTML = '';

    if (beastData.length === 0) {
        beastRecordsContainer.innerHTML = '<p>暂无兽设记录</p>';
        return;
    }

    beastData.forEach(function (beast) {
        const beastCard = document.createElement('div');
        beastCard.className = 'beast-card';

        const waterMark = document.createElement('div');
        waterMark.className = 'water-mark';
        waterMark.textContent = beast.name;
        waterMark.style.position = 'absolute';
        waterMark.style.top = '50%';
        waterMark.style.left = '50%';
        waterMark.style.transform = 'translate(-50%, -50%)';
        waterMark.style.fontSize = '24px';
        waterMark.style.color = 'rgba(0, 0, 0, 0.2)';
        waterMark.style.pointerEvents = 'none';

        const img = document.createElement('img');
        img.className = 'beast-image';
        img.src = beast.image;
        img.alt = beast.name;

        const beastInfo = document.createElement('div');
        beastInfo.className = 'beast-info';
        beastInfo.innerHTML = `
            <p><strong>兽设名：</strong>${beast.name}</p>
            <p><strong>抖音名：</strong>${beast.douyinName}</p>
            <p><strong>抖音号：</strong>${beast.douyinId}</p>
            <p><strong>登记时间：</strong>${beast.registerTime}</p>
        `;

        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '修改';
        editBtn.addEventListener('click', function () {
            editBeast(beast.id);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', function () {
            deleteBeast(beast.id);
        });
        actionButtons.appendChild(editBtn);
        actionButtons.appendChild(deleteBtn);

        beastCard.appendChild(img);
        beastCard.appendChild(beastInfo);
        beastCard.appendChild(actionButtons);
        beastCard.appendChild(waterMark);

        beastRecordsContainer.appendChild(beastCard);
    });
}

// 搜索按钮点击事件
function searchBeasts () {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (!searchInput) {
        displayBeastRecords();
        return;
    }

    const filteredData = beastData.filter(function (beast) {
        return beast.name.toLowerCase().includes(searchInput) || beast.douyinName.toLowerCase().includes(searchInput);
    });

    const beastRecordsContainer = document.getElementById('beast-records');
    beastRecordsContainer.innerHTML = '';

    if (filteredData.length === 0) {
        beastRecordsContainer.innerHTML = '<p>未找到匹配的兽设</p>';
        return;
    }

    filteredData.forEach(function (beast) {
        const beastCard = document.createElement('div');
        beastCard.className = 'beast-card';

        const waterMark = document.createElement('div');
        waterMark.className = 'water-mark';
        waterMark.textContent = beast.name;
        waterMark.style.position = 'absolute';
        waterMark.style.top = '50%';
        waterMark.style.left = '50%';
        waterMark.style.transform = 'translate(-50%, -50%)';
        waterMark.style.fontSize = '24px';
        waterMark.style.color = 'rgba(0, 0, 0, 0.2)';
        waterMark.style.pointerEvents = 'none';

        const img = document.createElement('img');
        img.className = 'beast-image';
        img.src = beast.image;
        img.alt = beast.name;

        const beastInfo = document.createElement('div');
        beastInfo.className = 'beast-info';
        beastInfo.innerHTML = `
            <p><strong>兽设名：</strong>${beast.name}</p>
            <p><strong>抖音名：</strong>${beast.douyinName}</p>
            <p><strong>抖音号：</strong>${beast.douyinId}</p>
            <p><strong>登记时间：</strong>${beast.registerTime}</p>
        `;

        const actionButtons = document.createElement('div');
        actionButtons.className = 'action-buttons';
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '修改';
        editBtn.addEventListener('click', function () {
            editBeast(beast.id);
        });
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '删除';
        deleteBtn.addEventListener('click', function () {
            deleteBeast(beast.id);
        });
        actionButtons.appendChild(editBtn);
        actionButtons.appendChild(deleteBtn);

        beastCard.appendChild(img);
        beastCard.appendChild(beastInfo);
        beastCard.appendChild(actionButtons);
        beastCard.appendChild(waterMark);

        beastRecordsContainer.appendChild(beastCard);
    });
}

// 修改兽设信息
function editBeast (id) {
    const beast = beastData.find(function (beast) {
        return beast.id === id;
    });

    if (!beast) return;

    document.getElementById('beast-name').value = beast.name;
    document.getElementById('douyin-name').value = beast.douyinName;
    document.getElementById('douyin-id').value = beast.douyinId;

    document.getElementById('beast-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const newName = document.getElementById('beast-name').value;
        const newDouyinName = document.getElementById('douyin-name').value;
        const newDouyinId = document.getElementById('douyin-id').value;
        const beastImageFile = document.getElementById('beast-image').files[0];

        const index = beastData.findIndex(function (beast) {
            return beast.id === id;
        });

        if (index !== -1) {
            beastData[index].name = newName;
            beastData[index].douyinName = newDouyinName;
            beastData[index].douyinId = newDouyinId;
            beastData[index].registerTime = new Date().toLocaleString();

            if (beastImageFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    beastData[index].image = e.target.result;
                    localStorage.setItem('beastData', JSON.stringify(beastData));
                    displayBeastRecords();
                    document.getElementById('beast-form').reset();
                };
                reader.readAsDataURL(beastImageFile);
            } else {
                localStorage.setItem('beastData', JSON.stringify(beastData));
                displayBeastRecords();
                document.getElementById('beast-form').reset();
            }
        }
    }, { once: true });
}

// 删除兽设信息
function deleteBeast (id) {
    if (confirm('确定要删除这条兽设记录吗？')) {
        beastData = beastData.filter(function (beast) {
            return beast.id !== id;
        });
        localStorage.setItem('beastData', JSON.stringify(beastData));
        displayBeastRecords();
    }
}
