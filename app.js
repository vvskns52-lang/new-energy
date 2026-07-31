// ==========================================
// 그린시티 에너지 연구소 - 인터랙티브 애플리케이션 스크립트
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadClassState();      // 저장된 모둠 기록을 먼저 불러온다
    initTabs();
    initSubTabs();         // 범용 서브 탭 시스템 초기화
    initClimateTimeMachine(); // 2050 기후 위기 타임머신 모듈 초기화
    initClassroomBar();
    initLabSimulator();
    initLabExploration();
    initLabRecords();
    initGameScenario();
    initGameWorksheet();
    initMapGame();
    initQuiz();
    initReport();
    initTeacherGuide();
});

/* ==========================================
   1. 글로벌 탭 & 서브 탭 제어
   ========================================== */
function initSubTabs() {
    document.querySelectorAll('.sub-nav-bar').forEach(bar => {
        const buttons = bar.querySelectorAll('.sub-nav-btn');
        const container = bar.closest('.card') || bar.parentElement;

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const subtabId = btn.getAttribute('data-subtab');
                
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                container.querySelectorAll('.sub-tab-content').forEach(content => {
                    content.classList.remove('active');
                    const cId = content.getAttribute('id');
                    if (cId === subtabId || 
                        cId === `lab-tab-${subtabId.replace('lab-', '')}` ||
                        cId === `game-tab-${subtabId.replace('game-', '')}` ||
                        cId === `report-tab-${subtabId.replace('report-', '')}`) {
                        content.classList.add('active');
                    }
                });
            });
        });
    });
}

function initClimateTimeMachine() {
    const btnFossil = document.getElementById('ct-btn-fossil');
    const btnGreen = document.getElementById('ct-btn-green');
    const visualCard = document.getElementById('ct-visual-card');
    const statusBadge = document.getElementById('ct-status-badge');
    const tempVal = document.getElementById('ct-temp-val');
    const co2Val = document.getElementById('ct-co2-val');
    const disasterVal = document.getElementById('ct-disaster-val');
    const scenarioTitle = document.getElementById('ct-scenario-title');
    const scenarioDesc = document.getElementById('ct-scenario-desc');
    const missionCallout = document.getElementById('ct-mission-callout');

    if (!btnFossil || !btnGreen || !visualCard) return;

    btnFossil.addEventListener('click', () => {
        btnFossil.classList.add('active');
        btnGreen.classList.remove('active');
        visualCard.className = 'ct-visual-card fossil-mode';

        statusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> 지구 온난화 경보 발생!';
        statusBadge.className = 'ct-status-badge fossil';
        
        tempVal.textContent = '+2.0 °C 상승';
        tempVal.className = 'ct-m-val text-red';

        co2Val.textContent = '580 ppm (위험)';
        co2Val.className = 'ct-m-val text-red';

        disasterVal.textContent = '400% 급증';
        disasterVal.className = 'ct-m-val text-red';

        scenarioTitle.innerHTML = '<i class="fa-solid fa-smog"></i> 2050년 예상 시나리오: 화석연료 연소 지속';
        scenarioDesc.textContent = '석탄과 석유를 계속 태우면서 매연과 이산화 탄소가 대기에 가득 차 지구 온도가 2°C 이상 치솟습니다. 북극의 빙하가 녹아 해수면이 상승하고, 매년 극심한 폭염과 가뭄, 초대형 태풍이 도시를 위협합니다.';

        missionCallout.innerHTML = '<span><i class="fa-solid fa-bullhorn"></i> <strong>연구원 미션:</strong> 정전 없이 24시간 동안 탄소 배출 0%인 그린시티를 설계하여 지구의 잿빛 미래를 푸른빛으로 바꿔 주세요!</span>';
    });

    btnGreen.addEventListener('click', () => {
        btnGreen.classList.add('active');
        btnFossil.classList.remove('active');
        visualCard.className = 'ct-visual-card green-mode';

        statusBadge.innerHTML = '<i class="fa-solid fa-leaf"></i> 2050 넷제로(Net-Zero) 성공!';
        statusBadge.className = 'ct-status-badge green';

        tempVal.textContent = '+0.5 °C (안정)';
        tempVal.className = 'ct-m-val text-green';

        co2Val.textContent = '350 ppm (청정)';
        co2Val.className = 'ct-m-val text-green';

        disasterVal.textContent = '정상 수치 회복';
        disasterVal.className = 'ct-m-val text-green';

        scenarioTitle.innerHTML = '<i class="fa-solid fa-sun-plant-wilt"></i> 2050년 미래 시나리오: 신재생에너지 그린시티 완공';
        scenarioDesc.textContent = '태양광, 풍력, 지열, 해양 에너지와 ESS 배터리가 조화를 이루어 이산화 탄소 배출이 0%가 되었습니다! 맑은 공기와 푸른 산림이 돌아오고, 24시간 안정적인 청정 전력이 시에 가득 공급됩니다.';

        missionCallout.innerHTML = '<span><i class="fa-solid fa-trophy text-green"></i> <strong>축하합니다!</strong> 여러분의 스마트한 에너지 믹스로 지구가 건강을 되찾고 지속 가능한 그린 미래가 완성되었습니다!</span>';
    });
}
function switchTab(targetTab, lessonNo) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('id') === targetTab);
    });

    // 차시가 지정되면 그 차시의 메뉴를, 아니면 해당 도구의 첫 메뉴를 선택 표시한다
    const navButtons = document.querySelectorAll('.nav-btn');
    let matched = null;
    navButtons.forEach(b => {
        const isTab = b.getAttribute('data-tab') === targetTab;
        const isLesson = lessonNo === undefined || parseInt(b.getAttribute('data-lesson')) === lessonNo;
        if (isTab && isLesson && !matched) matched = b;
    });
    if (!matched) matched = document.querySelector(`.nav-btn[data-tab="${targetTab}"]`);
    navButtons.forEach(b => b.classList.toggle('active', b === matched));

    document.querySelectorAll('.nav-lesson-group').forEach(g => {
        g.classList.toggle('current', matched && g.getAttribute('data-lesson') === matched.getAttribute('data-lesson'));
    });

    // 골든벨은 차시에 따라 사전 진단 / 정리 모드를 미리 골라 준다
    const wantMode = matched && matched.getAttribute('data-quiz-mode');
    if (targetTab === 'quiz' && wantMode) selectQuizMode(wantMode);

    if (targetTab !== 'game' && isSimulating) stopGameSimulation();
    if (targetTab === 'report') renderCollectedData();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initTabs() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lesson = parseInt(btn.getAttribute('data-lesson'));
            if (!isNaN(lesson)) {
                classState.lesson = lesson;
                saveClassState();
                renderLessonBrief();
            }
            switchTab(btn.getAttribute('data-tab'), lesson);
        });
    });
}


/* ==========================================
   2. 발전 실험실 (Lab Simulator) 로직
   ========================================== */
let activeEnergy = 'solar';
let steamIntervalId = null;
let currentWaterLinesIntervalId = null;
let smokeIntervalId = null;
let nuclearSteamIntervalId = null;

function initLabSimulator() {
    const energyTabs = document.querySelectorAll('.energy-tab');
    const energyControls = document.querySelectorAll('.energy-controls');
    const svgWrappers = document.querySelectorAll('.svg-wrapper');

    energyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const energy = tab.getAttribute('data-energy');
            activeEnergy = energy;

            energyTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            energyControls.forEach(ctrl => {
                ctrl.classList.remove('active');
                if (ctrl.getAttribute('id') === `${energy}-controls`) {
                    ctrl.classList.add('active');
                }
            });

            svgWrappers.forEach(svg => {
                svg.classList.remove('active');
                if (svg.getAttribute('id') === `${energy}-svg`) {
                    svg.classList.add('active');
                }
            });

            // 발전소 변경 시 타이머 해제
            if (energy !== 'geo' && steamIntervalId) {
                clearInterval(steamIntervalId);
                steamIntervalId = null;
            }
            if (energy !== 'tidal_current' && currentWaterLinesIntervalId) {
                clearInterval(currentWaterLinesIntervalId);
                currentWaterLinesIntervalId = null;
            }
            if (energy !== 'fossil' && smokeIntervalId) {
                clearInterval(smokeIntervalId);
                smokeIntervalId = null;
            }
            if (energy !== 'nuclear' && nuclearSteamIntervalId) {
                clearInterval(nuclearSteamIntervalId);
                nuclearSteamIntervalId = null;
            }

            updateTechInfo(energy);
            updateLabSimulator();
        });
    });

    // 슬라이더 조작 리스너 연결
    document.getElementById('solar-time').addEventListener('input', updateLabSimulator);
    document.getElementById('solar-weather').addEventListener('input', updateLabSimulator);
    document.getElementById('wind-speed').addEventListener('input', updateLabSimulator);
    document.getElementById('hydro-flow').addEventListener('input', updateLabSimulator);
    document.getElementById('geo-depth').addEventListener('input', updateLabSimulator);
    document.getElementById('tidal-head').addEventListener('input', updateLabSimulator);
    document.getElementById('tidal-velocity').addEventListener('input', updateLabSimulator);
    document.getElementById('wave-height').addEventListener('input', updateLabSimulator);
    document.getElementById('fossil-fuel').addEventListener('input', updateLabSimulator);
    document.getElementById('nuclear-rod').addEventListener('input', updateLabSimulator);

    // 초기 상태 렌더링
    updateTechInfo('solar');
    updateLabSimulator();
    generateSunRays();
    generateWindLines();
}

// 기술 설명 카드 및 Pros / Cons 데이터 업데이트 (장단점 개편)
function updateTechInfo(energy) {
    const title = document.getElementById('tech-title');
    const desc = document.getElementById('tech-desc');
    const method = document.getElementById('tech-method');
    const prosList = document.getElementById('tech-pros');
    const consList = document.getElementById('tech-cons');

    const infoData = {
        solar: {
            title: "태양광 발전이란? (터빈 없이 직접 전기를 만드는 발전)",
            desc: "태양광 발전은 터빈(회전날개)을 돌리지 않는 유일한 발전 방식입니다. 태양 전지판(반도체 P-N 접합)에 태양 빛(입자)이 닿을 때 전자가 이동하며 기판 양끝으로 모이는 '광전 효과(Photovoltaic Effect)'를 통해 빛에너지를 곧바로 직류(DC) 전기에너지로 직접 바꿉니다.",
            method: "⚙️ 발전 메커니즘: [태양 빛에너지] ➔ [태양 전지판 반도체 흡수] ➔ [전자-양공 분리 (광전 효과)] ➔ [회전 터빈 없이 전기에너지 직접 생성]",
            pros: [
                "터빈 등 회전 기계 부품이 없어 소음과 기계적 고장이 매우 적음",
                "환경오염 물질과 이산화 탄소를 전혀 배출하지 않는 대표 무탄소 에너지",
                "주택 지붕, 건물 외벽, 저수지 수면(수상 태양광) 등 남는 유휴 공간 활용"
            ],
            cons: [
                "밤이나 흐린 날, 비가 올 때 발전량이 급격히 줄어듦 (간헐성)",
                "빛을 받는 넓은 태양 전지판 설치 면적이 필요함",
                "초기 설치 비용이 높고 낮 동안 남는 전기를 모아둘 ESS(배터리)가 필요함"
            ]
        },
        wind: {
            title: "풍력 발전이란? (바람의 힘으로 풍력 터빈을 돌리는 발전)",
            desc: "바람의 운동에너지가 대형 회전 날개(Blades)를 때릴 때 양력이 발생하여 회전합니다. 날개 축에 연결된 '풍력 터빈(Turbine)'과 증속기(Gearbox)가 발전기 내부의 대형 자석을 빠른 속도로 회전시키며, 자석의 회전으로 자속이 바뀌는 '전자기 유도 법칙'에 의해 코일에 강력한 전기가 만들어집니다.",
            method: "⚙️ 발전 메커니즘: [바람의 운동에너지] ➔ [풍력 터빈 날개 회전] ➔ [발전기 회전축 전자기 유도] ➔ [교류 전기에너지 생성]\n💡 터빈(Turbine)이란? 흐르는 바람의 힘을 회전 운동으로 바꾸어 발전 자석을 돌려주는 대형 회전 날개 기계입니다.",
            pros: [
                "무한한 자연 바람을 이용하므로 연료비가 들지 않고 탄소 배출이 없음",
                "산간 지역이나 바다 위(해상 풍력)에 건설하여 국토 공간을 다각도 활용",
                "단위 면적당 대형 터빈 설치 시 높은 전기 생산량을 기대할 수 있음"
            ],
            cons: [
                "바람이 약하거나, 반대로 태풍(안전 정지) 시 날개가 멈추어 발전 불가",
                "거대한 날개가 돌아갈 때 저주파 소음 및 조류 충돌 문제 발생",
                "바람의 세기가 불규칙하여 전력망의 안정성을 유지할 대비책 필요"
            ]
        },
        hydro: {
            title: "수력 발전이란? (낙하하는 물의 압력으로 수차 터빈을 돌리는 발전)",
            desc: "높은 곳에 가두어 둔 물이 댐 수로를 따라 거세게 떨어질 때 발생하는 강력한 낙하 운동에너지가 '수차 터빈(Water Turbine)'의 쇠날개를 때립니다. 물의 수압으로 수차 터빈이 빠르게 돌면 상부에 연결된 발전기의 대형 자석이 돌면서 강력한 전기가 유도 생성됩니다.",
            method: "⚙️ 발전 메커니즘: [댐 물의 위치에너지] ➔ [수수로 낙하 운동에너지] ➔ [수차 터빈(Water Turbine) 회전] ➔ [발전기 전자기 유도 전력 생성]\n💡 터빈(Turbine)이란? 거센 물살의 수압을 받아 회전축을 돌려주는 묵직한 수중 쇠날개 수차 기계입니다.",
            pros: [
                "발전 효율이 80~90%로 매우 높고, 수문을 열고 닫아 출력 조절이 신속함",
                "화석연료를 태우지 않아 미세먼지와 온실가스를 배출하지 않음",
                "댐을 이용해 가뭄 예방, 홍수 조절, 용수 공급 등 다목적 수자원 활용"
            ],
            cons: [
                "대규모 댐 건설 시 수몰 지역이 생겨 주민 이주 및 생태계 변화가 큼",
                "물이 풍부하고 낙차가 큰 협곡 지형으로 건설 입지가 제한됨",
                "초기 댐 건설에 막대한 비용과 오랜 시간이 소요됨"
            ]
        },
        geo: {
            title: "지열 발전이란? (지하 마그마 증기로 증기 터빈을 돌리는 발전)",
            desc: "땅속 수 킬로미터 깊은 곳에 위치한 마그마의 열로 지하수를 데우거나 지하에 주입한 물을 끓여 100°C 이상의 고온·고압 수증기를 만듭니다. 이 고압 증기가 '증기 터빈(Steam Turbine)'의 촘촘한 수많은 블레이드 날개를 초속 수십 미터 속도로 강하게 밀어내며 돌리고, 터빈 축에 연결된 발전기가 전기를 만듭니다.",
            method: "⚙️ 발전 메커니즘: [땅속 마그마 지열] ➔ [고온 고압 수증기 팽창] ➔ [증기 터빈(Steam Turbine) 고속 회전] ➔ [발전기 전자기 유도 24시간 가동]\n💡 터빈(Turbine)이란? 고압 증기의 강한 팽창 뿜어져 나오는 힘을 받아 1분 동안 수천 번 고속 회전하는 날개 기계입니다.",
            pros: [
                "햇빛이나 바람과 달리 기상 조건에 영향을 받지 않고 24시간 365일 일정하게 발전 (가동률 최고)",
                "연료를 태우지 않아 대기 오염 물질 및 탄소 배출이 없음",
                "발전소 부지 면적이 작아 토지 이용 효율이 높음"
            ],
            cons: [
                "마그마 열원이 풍부한 화산 지대나 지열이 유독 높은 지역으로 입지 제한",
                "지하 수 킬로미터를 깊게 파고 내려가는 시추 기술과 막대한 초기 비용 필요",
                "지하 시추 과정에서 지반에 미세한 진동이나 가스 누출 통제가 요구됨"
            ]
        },
        tidal_barrage: {
            title: "조력 발전이란? (밀물·썰물 수차 낙차로 수중 터빈을 돌리는 발전)",
            desc: "달과 태양의 인력으로 발생하는 밀물과 썰물 때 바닷물의 높이 차(조차)를 이용합니다. 바다에 댐(방조제)을 가두어 놓고 밀물 때 들어오는 바닷물이나 썰물 때 빠져나가는 바닷물이 수문을 통과할 때, 강한 물살이 방조제 하부의 '양방향 수중 터빈(Bulb Turbine)'을 돌려 전기를 생산합니다.",
            method: "⚙️ 발전 메커니즘: [밀물·썰물 수위 차] ➔ [방조제 수문 수압 유입] ➔ [수중 양방향 터빈(Bulb Turbine) 회전] ➔ [발전기 전자기 유도 발전]\n💡 터빈(Turbine) me: 수문 사이에 뉘어져 물이 들어오거나 나갈 때 모두 회전하는 프로펠러형 수중 회전 기계입니다.",
            pros: [
                "조석 주기가 정확하므로 하루 중 전기가 들어오는 시각과 양을 정확히 예측 가능",
                "무한한 바닷물 수위 차를 쓰므로 연료비가 전혀 들지 않음",
                "방조제 위에 도로나 교량을 설치하여 지역 교통 망 개선 효과"
            ],
            cons: [
                "방조제로 바다를 막아 갯벌이 줄어들고 해양 생태계 교란 발생",
                "조수 간만의 차가 5~9m 이상 크게 벌어지는 서해안 등 특정 해안으로 제한",
                "밀물/썰물 수위차가 가장 큰 시간대에만 출력이 집중됨"
            ]
        },
        tidal_current: {
            title: "조류 발전이란? (댐 없이 빠르는 바닷물 흐름으로 수중 프로펠러 터빈을 돌리는 발전)",
            desc: "조력 발전과 달리 바다에 댐(방조제)을 건설하지 않습니다. 울돌목처럼 바닷물이 좁은 해협을 지나갈 때 물살의 속도(유속)가 매우 빨라지는데, 바다 밑바닥에 설치한 '수중 프로펠러 터빈'이 바닷물 흐름을 직접 받아 수중 바람개비처럼 회전하며 발전기를 돌려 전기를 냅니다.",
            method: "⚙️ 발전 메커니즘: [해협의 빠른 조류 유속] ➔ [바다 밑 수중 프로펠러 터빈 회전] ➔ [발전기 축 회전 전자기 유도] ➔ [무탄소 전기 생산]\n💡 터빈(Turbine)이란? 방조제 없이 수중에 세워져 거센 물살 흐름만으로 돌아가는 바닷속 풍력발전기 형태의 날개 기계입니다.",
            pros: [
                "방조제를 쌓지 않아 해수가 자유롭게 순환하고 갯벌 등 해양 환경 파괴가 없음",
                "물고기의 이동을 막지 않고 해안선 지형 변형이 없음",
                "바닷물 흐름 시각이 일정한 주기로 반복되므로 전력 예측이 쉬움"
            ],
            cons: [
                "유속이 2m/s 이상으로 빠른 좁은 해협이나 바닷길에만 설치 가능",
                "바닷속 염분에 의한 기계 부식 방지와 해저 수중 보수가 까다로움",
                "물살이 잠시 멈추는 정체 시각(슬랙 타임)에는 발전이 잠시 중단됨"
            ]
        },
        wave: {
            title: "파력 발전이란? (파도의 상하 파동으로 공기 터빈/유압 실린더를 돌리는 발전)",
            desc: "바다 표면에서 파도가 오르내릴 때 발생하는 출렁임(상하 운동에너지)을 활용합니다. 해수면에 뜬 부표가 위아래로 움직일 때 내부 공기실의 공기를 압축시켜 뿜어내며, 이 거센 공기 바람이 '공기 터빈(Air Turbine)'의 날개를 돌리거나 유압 피스톤이 발전기를 돌려 전기를 냅니다.",
            method: "⚙️ 발전 메커니즘: [파도의 상하 출렁임] ➔ [부표 둥실둥실 피스톤 운동] ➔ [공기실 공기 압축 뿜어냄] ➔ [공기 터빈(Air Turbine) 회전 발전]\n💡 터빈(Turbine)이란? 공기가 들어오거나 빠져나갈 때 한 방향으로만 연속 회전하는 특수 공기 회전 날개 기계입니다.",
            pros: [
                "삼면이 바다인 대한민국 지형에 적합하며 어디서나 파도를 활용할 수 있음",
                "댐이나 거대 방조제가 불필요하여 해안 환경 파괴가 현저히 적음",
                "소형 부표 단위로 바다에 띄워 섬 지역(도서 지역)에 독립 전력 공급 유리"
            ],
            cons: [
                "파도의 높이와 횟수가 날씨에 따라 불규칙하여 전력 생산 변동폭이 큼",
                "태풍이나 높은 파도가 칠 때 해상 시설물이 손상되거나 파손될 위험이 큼",
                "해상에 띄워둔 장비를 정비하기 위해 매번 정비 선박과 인력이 소요됨"
            ]
        },
        fossil: {
            title: "화석연료 발전이란? (연소 열로 물을 끓여 증기 터빈을 돌리는 발전)",
            desc: "석탄, 석유, 천연가스(LNG)를 고온 보일러에서 불태울 때 발생하는 막대한 열에너지로 물을 끓여 고온·고압의 수증기를 만듭니다. 이 강한 증기가 뿜어져 나오면서 '증기 터빈(Steam Turbine)'의 수천 개 날개를 세차게 돌리고, 터빈 축에 연결된 발전기가 대규모 전기를 발생시킵니다.",
            method: "⚙️ 발전 메커니즘: [석탄·가스 연소 열] ➔ [보일러 물 끓임 고압 증기] ➔ [증기 터빈(Steam Turbine) 고속 회전] ➔ [발전기 전자기 유도 대량 발전]\n💡 터빈(Turbine)이란? 고온 고압의 수증기 압력을 받아서 분당 3,600번 고속 회전하며 발전기 자석을 돌려주는 핵심 날개 장치입니다.",
            pros: [
                "연료만 투입하면 날씨나 밤낮에 관계없이 24시간 원하는 만큼 대규모 전력 생산",
                "발전소 건설비가 저렴하고 전력 수요가 급증할 때 즉시 발전량을 늘릴 수 있음",
                "입지 조건의 제약이 비교적 적어 도시 근교나 공단 지역에 설치 용이"
            ],
            cons: [
                "연소 과정에서 대량의 이산화탄소(온실가스)를 배출하여 지구 온난화의 주원인이 됨",
                "미세먼지, 황산화물, 질소산화물 등 대기 오염 물질을 지속 배출함",
                "지하에 묻힌 매장량이 한정되어 있어 미래에 연료가 고갈됨"
            ]
        },
        nuclear: {
            title: "원자력 발전이란? (우라늄 핵분열 열로 물을 끓여 증기 터빈을 돌리는 발전)",
            desc: "원자로 내부에서 우라늄 원자핵이 중성자와 부딪쳐 쪼개질 때 발생하는 천문학적인 '핵분열 열에너지'를 이용합니다. 이 열로 증기발생기의 물을 끓여 고온·고압 증기를 만들고, 강력한 증기 압력이 '증기 터빈(Steam Turbine)'을 돌려 발전기 내부 자석을 고속 회전시켜 대량의 전기를 생성합니다.",
            method: "⚙️ 발전 메커니즘: [우라늄 핵분열 반응] ➔ [방출 열에너지로 물 끓임] ➔ [고압 증기 뿜어짐] ➔ [증기 터빈(Steam Turbine) 고속 회전 전자기 유도]\n💡 터빈(Turbine)이란? 우라늄 분열 열로 만든 강력한 팽창 증기를 받아 분당 수천 회 회전하는 발전기 구동 날개 기계입니다.",
            pros: [
                "소량의 우라늄 연료(10g)로 석탄 1t 분량의 엄청난 전기를 만드는 초고효율 발전",
                "발전 중 이산화탄소와 온실가스를 배출하지 않아 대기 오염이 없음",
                "연료 교체 없이 1~2년 동안 24시간 안정적으로 대규모 기저 전력 공급"
            ],
            cons: [
                "만약의 방사능 누출 사고 발생 시 회복 불가능한 치명적 대재앙을 유발함",
                "수만 년 동안 독성이 유지되는 사용 후 핵연료(고준위 방사성 폐기물) 처리 문제",
                "발전소 수명이 다한 후 해체(폐로) 비용과 방사능 관리 비용이 막대함"
            ]
        }
    };

    const current = infoData[energy];
    title.textContent = current.title;
    desc.textContent = current.desc;
    method.textContent = current.method;

    // 장단점 목록 쪼개기 매핑
    prosList.innerHTML = current.pros.map(p => `<li>${p}</li>`).join('');
    consList.innerHTML = current.cons.map(c => `<li>${c}</li>`).join('');
}

// 태양 빛 애니메이션 입자 생성
function generateSunRays() {
    const container = document.getElementById('sun-rays');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const xOffset = 130 + (i * 35);
        line.setAttribute('x1', xOffset.toString());
        line.setAttribute('y1', '30');
        line.setAttribute('x2', (xOffset - 20).toString());
        line.setAttribute('y2', '100');
        line.setAttribute('stroke', '#fef08a');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('opacity', '0.6');
        line.setAttribute('class', 'ray-particle');
        line.style.animationDelay = `${i * 0.3}s`;
        container.appendChild(line);
    }
}

// 풍력 효과선 생성
function generateWindLines() {
    const container = document.getElementById('wind-lines');
    if (!container) return;
    container.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const yOffset = 50 + (i * 45);
        path.setAttribute('d', `M -50 ${yOffset} C 100 ${yOffset - 10}, 200 ${yOffset + 10}, 450 ${yOffset}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-dasharray', '30, 200');
        path.setAttribute('class', 'wind-flow-line');
        path.style.animation = `windFlow ${1.5 + i * 0.4}s linear infinite`;
        container.appendChild(path);
    }
}

// 지열 증기 입자 제어
function startSteamParticles(efficiency) {
    if (steamIntervalId) clearInterval(steamIntervalId);
    
    const container = document.getElementById('steam-particles');
    if (!container) return;

    const intervalMs = Math.max(100, 800 - (efficiency * 7));

    steamIntervalId = setInterval(() => {
        if (activeEnergy !== 'geo' || efficiency === 0) return;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'steam-particle');
        const xOffset = 150 + (Math.random() * 10 - 5);
        circle.setAttribute('cx', xOffset.toString());
        circle.setAttribute('cy', '160');
        const rVal = 3 + Math.random() * 8;
        circle.setAttribute('r', rVal.toString());

        container.appendChild(circle);

        setTimeout(() => {
            if (circle.parentNode) container.removeChild(circle);
        }, 1200);
    }, intervalMs);
}

// 조류 수중 수류 가이드선 동적 생성
function startCurrentWaterLines(efficiency, velocity) {
    if (currentWaterLinesIntervalId) clearInterval(currentWaterLinesIntervalId);
    
    const container = document.getElementById('current-water-lines');
    if (!container) return;
    container.innerHTML = '';

    if (velocity === 0) return;

    for (let i = 0; i < 4; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const yOffset = 80 + (i * 40);
        path.setAttribute('d', `M -50 ${yOffset} L 450 ${yOffset}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('class', 'current-water-line');
        const duration = (2.5 - (velocity / 4) * 2).toFixed(2);
        path.style.animation = `currentWaterFlow ${duration}s linear infinite`;
        container.appendChild(path);
    }
}

// 화석연료 연기 파티클 동적 생성
function startSmokeParticles(efficiency) {
    if (smokeIntervalId) clearInterval(smokeIntervalId);
    
    const container = document.getElementById('fossil-smoke');
    if (!container) return;
    container.innerHTML = '';
    
    if (efficiency === 0) return;

    const intervalMs = Math.max(300, 1500 - (efficiency * 12));
    
    smokeIntervalId = setInterval(() => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const r = 8 + Math.random() * 8;
        const xOffset = 115 + (Math.random() * 10 - 5);
        circle.setAttribute('cx', xOffset.toString());
        circle.setAttribute('cy', '60');
        circle.setAttribute('r', r.toString());
        circle.setAttribute('fill', '#9ca3af');
        circle.setAttribute('class', 'smoke-particle');
        
        container.appendChild(circle);
        
        setTimeout(() => {
            if (container.contains(circle)) {
                container.removeChild(circle);
            }
        }, 2000);
    }, intervalMs);
}

// 원자력 냉각탑 수증기 파티클 동적 생성
function startNuclearSteamParticles(efficiency) {
    if (nuclearSteamIntervalId) clearInterval(nuclearSteamIntervalId);
    
    const container = document.getElementById('nuclear-steam');
    if (!container) return;
    container.innerHTML = '';
    
    if (efficiency === 0) return;

    const intervalMs = Math.max(400, 2000 - (efficiency * 16));
    
    nuclearSteamIntervalId = setInterval(() => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        const r = 10 + Math.random() * 10;
        const xOffset = 100 + (Math.random() * 20 - 10);
        circle.setAttribute('cx', xOffset.toString());
        circle.setAttribute('cy', '40');
        circle.setAttribute('r', r.toString());
        circle.setAttribute('fill', '#e2e8f0');
        circle.setAttribute('class', 'steam-particle');
        
        container.appendChild(circle);
        
        setTimeout(() => {
            if (container.contains(circle)) {
                container.removeChild(circle);
            }
        }, 3000);
    }, intervalMs);
}

// 실시간 시뮬레이터 수치 및 그래픽 업데이트
function updateLabSimulator() {
    const efficiencyMetric = document.getElementById('metric-efficiency');
    const generationMetric = document.getElementById('metric-generation');
    const efficiencyBar = document.getElementById('bar-efficiency');

    if (activeEnergy === 'solar') {
        const time = parseInt(document.getElementById('solar-time').value);
        const weather = parseInt(document.getElementById('solar-weather').value);

        let timeText = `낮 (${time}시)`;
        if (time < 12) timeText = `오전 (${time}시)`;
        if (time > 12) timeText = `오후 (${time}시)`;
        document.getElementById('val-solar-time').textContent = timeText;

        let weatherText = "맑음 (100%)";
        let weatherCoeff = 1.0;
        if (weather === 2) {
            weatherText = "흐림 (30%)";
            weatherCoeff = 0.3;
        } else if (weather === 1) {
            weatherText = "비/눈 (5%)";
            weatherCoeff = 0.05;
        }
        document.getElementById('val-solar-weather').textContent = weatherText;

        let timeCoeff = 0;
        if (time >= 6 && time <= 18) {
            const radians = ((time - 6) / 12) * Math.PI;
            timeCoeff = Math.sin(radians);
        }

        const efficiency = Math.round(timeCoeff * weatherCoeff * 100);
        const generation = (efficiency * 0.05).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        const sun = document.getElementById('visual-sun');
        const skyBg = document.getElementById('sky-bg');
        
        const sunX = 15 + ((time - 6) / 12) * 70;
        const sunY = 90 - (timeCoeff * 70);
        sun.style.left = `${sunX}%`;
        sun.style.top = `${sunY}px`;

        if (time < 6 || time > 18) {
            sun.style.opacity = '0';
        } else {
            sun.style.opacity = '1';
        }

        let bgGradient = 'linear-gradient(to bottom, #1e3a8a, #93c5fd)';
        if (time >= 6 && time <= 8) bgGradient = 'linear-gradient(to bottom, #d97706, #cbd5e1)';
        else if (time > 8 && time < 16) bgGradient = 'linear-gradient(to bottom, #bfdbfe, #eff6ff)';
        else if (time >= 16 && time <= 18) bgGradient = 'linear-gradient(to bottom, #b91c1c, #94a3b8)';
        skyBg.style.background = bgGradient;

        const clouds = document.getElementById('visual-clouds');
        const rain = document.getElementById('visual-rain');
        
        clouds.className = 'cloud-layer';
        rain.className = 'rain-layer';
        
        if (weather === 2) {
            clouds.classList.add('cloudy');
        } else if (weather === 1) {
            clouds.classList.add('rainy');
            rain.classList.add('raining');
        }

        const powerLine = document.getElementById('power-line');
        const bulb = document.getElementById('bulb-glow');
        const rayParticles = document.querySelectorAll('.ray-particle');
        
        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;

            rayParticles.forEach(ray => {
                ray.style.display = 'block';
                ray.style.animationPlayState = 'running';
            });
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#64748b');
            bulb.style.filter = 'none';

            rayParticles.forEach(ray => {
                ray.style.display = 'none';
                ray.style.animationPlayState = 'paused';
            });
        }

    } else if (activeEnergy === 'wind') {
        const windSpeed = parseInt(document.getElementById('wind-speed').value);
        const windAlert = document.getElementById('wind-alert');

        let windDesc = `미풍 (${windSpeed} m/s)`;
        if (windSpeed === 0) windDesc = "무풍 (0 m/s)";
        else if (windSpeed >= 3 && windSpeed < 12) windDesc = `보통 바람 (${windSpeed} m/s)`;
        else if (windSpeed >= 12 && windSpeed <= 20) windDesc = `강풍 (정격 출력) (${windSpeed} m/s)`;
        else if (windSpeed > 20) windDesc = `태풍급 강풍 (${windSpeed} m/s) [보호 장치 작동]`;

        document.getElementById('val-wind-speed').textContent = windDesc;

        let efficiency = 0;

        if (windSpeed < 3) {
            efficiency = 0;
            windAlert.className = "info-alert";
            windAlert.querySelector('span').textContent = "풍속이 너무 낮아 (3m/s 미만) 날개가 돌아가지 않아 발전할 수 없습니다.";
        } else if (windSpeed >= 3 && windSpeed <= 12) {
            efficiency = Math.round(30 + ((windSpeed - 3) / 9) * 70);
            windAlert.className = "info-alert info-active";
            windAlert.querySelector('span').textContent = "정상 작동 중: 바람이 풍력 날개를 돌려 회전 운동에너지를 발생시키고 있습니다.";
        } else if (windSpeed > 12 && windSpeed <= 20) {
            efficiency = 100;
            windAlert.className = "info-alert info-active";
            windAlert.querySelector('span').textContent = "최대 정격 출력 작동 중: 발전 시설이 안전 범위 내 최고의 효율을 내고 있습니다.";
        } else if (windSpeed > 20) {
            efficiency = 0;
            windAlert.className = "info-alert";
            windAlert.querySelector('span').textContent = "위험 상황! 태풍(20m/s 초과) 감지로 인한 풍력기 보호 장치(Cut-out)가 동작하여 작동을 중지했습니다.";
        }

        const generation = (efficiency * 0.08).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        const root = document.documentElement;
        if (efficiency > 0) {
            const speed = (4 - (efficiency / 100) * 3.5).toFixed(2);
            root.style.setProperty('--wind-spin-speed', `${speed}s`);
        } else {
            root.style.setProperty('--wind-spin-speed', '0s');
        }

        const windFlowLines = document.querySelectorAll('.wind-flow-line');
        windFlowLines.forEach(line => {
            if (windSpeed === 0) {
                line.style.animationPlayState = 'paused';
            } else {
                line.style.animationPlayState = 'running';
                const duration = Math.max(0.4, 2.5 - (windSpeed / 25) * 2);
                line.style.animationDuration = `${duration}s`;
            }
        });

    } else if (activeEnergy === 'hydro') {
        const flow = parseInt(document.getElementById('hydro-flow').value);
        document.getElementById('val-hydro-flow').textContent = `수문 개방 (${flow}%)`;

        const efficiency = flow;
        const generation = (efficiency * 0.1).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        const flowStream = document.getElementById('water-flow-stream');
        if (flow > 0) {
            flowStream.style.opacity = (0.3 + (flow / 100) * 0.7).toString();
            flowStream.setAttribute('stroke-width', (5 + (flow / 100) * 15).toString());
            flowStream.style.strokeDasharray = '10, 10';
            flowStream.style.animation = 'electricityFlow 0.5s linear infinite';
        } else {
            flowStream.style.opacity = '0';
            flowStream.style.animation = 'none';
        }

        const root = document.documentElement;
        if (flow > 0) {
            const speed = (3 - (flow / 100) * 2.6).toFixed(2);
            root.style.setProperty('--hydro-spin-speed', `${speed}s`);
        } else {
            root.style.setProperty('--hydro-spin-speed', '0s');
        }

        const powerLine = document.getElementById('hydro-power-line');
        const bulb = document.getElementById('hydro-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#64748b');
            bulb.style.filter = 'none';
        }

    } else if (activeEnergy === 'geo') {
        const depth = parseInt(document.getElementById('geo-depth').value);
        document.getElementById('val-geo-depth').textContent = `${depth.toLocaleString()} m`;

        const temperature = 15 + Math.round((depth / 100) * 3);
        const geoAlert = document.getElementById('geo-alert');

        let alertMsg = `시추를 시작하지 않았습니다. 파이프를 땅속 깊은 곳으로 내려보내세요.`;
        let efficiency = 0;

        if (depth > 0) {
            alertMsg = `현재 시추 깊이 ${depth}m (예상 지하 온도: 약 ${temperature}℃). `;
            if (temperature < 60) {
                alertMsg += `온도가 너무 낮아 물을 끓이기 어렵습니다. (최소 60도 이상 필요)`;
                efficiency = 0;
            } else {
                efficiency = Math.round(((depth - 1500) / 2500) * 100);
                efficiency = Math.min(100, Math.max(10, efficiency));
                alertMsg += `마그마 열로 지하수가 끓어 고압의 수증기를 생산 중입니다!`;
            }
        }

        geoAlert.querySelector('span').textContent = alertMsg;

        const generation = (efficiency * 0.07).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        const pipeHeight = (depth / 4000) * 105;
        document.getElementById('geo-pipe').setAttribute('height', pipeHeight.toString());

        if (efficiency > 0) {
            startSteamParticles(efficiency);
        } else {
            if (steamIntervalId) {
                clearInterval(steamIntervalId);
                steamIntervalId = null;
            }
            document.getElementById('steam-particles').innerHTML = '';
        }

        const root = document.documentElement;
        if (efficiency > 0) {
            const speed = (3.5 - (efficiency / 100) * 3.1).toFixed(2);
            root.style.setProperty('--geo-spin-speed', `${speed}s`);
        } else {
            root.style.setProperty('--geo-spin-speed', '0s');
        }

        const powerLine = document.getElementById('geo-power-line');
        const bulb = document.getElementById('geo-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#64748b');
            bulb.style.filter = 'none';
        }

    } else if (activeEnergy === 'tidal_barrage') {
        const head = parseInt(document.getElementById('tidal-head').value);
        document.getElementById('val-tidal-head').textContent = `조석차 ${head} m`;

        const efficiency = Math.round((head / 9) * 100);
        const generation = (efficiency * 0.09).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        const seaOuter = document.getElementById('sea-outer');
        const newY = 120 + (9 - head) * 8;
        seaOuter.setAttribute('y', newY.toString());
        seaOuter.setAttribute('height', (260 - newY).toString());

        const flowStream = document.getElementById('tidal-flow-stream');
        const root = document.documentElement;

        if (head > 0) {
            flowStream.style.opacity = (0.3 + (head / 9) * 0.7).toString();
            flowStream.style.strokeDasharray = '10, 10';
            flowStream.style.animation = 'electricityFlow 0.5s linear infinite';

            const speed = (3.5 - (efficiency / 100) * 3.1).toFixed(2);
            root.style.setProperty('--tidal-spin-speed', `${speed}s`);
        } else {
            flowStream.style.opacity = '0';
            flowStream.style.animation = 'none';
            root.style.setProperty('--tidal-spin-speed', '0s');
        }

        const powerLine = document.getElementById('tidal-power-line');
        const bulb = document.getElementById('tidal-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#64748b');
            bulb.style.filter = 'none';
        }

    } else if (activeEnergy === 'tidal_current') {
        const velocity = parseFloat(document.getElementById('tidal-velocity').value);
        document.getElementById('val-tidal-velocity').textContent = `${velocity.toFixed(1)} m/s`;

        const currentAlert = document.getElementById('tidal-current-alert');
        let efficiency = 0;

        if (velocity < 1.0) {
            efficiency = 0;
            currentAlert.className = "info-alert";
            currentAlert.querySelector('span').textContent = "유속이 너무 느려(1.0m/s 미만) 해저 터빈의 관성을 이겨내지 못해 발전할 수 없습니다.";
        } else {
            efficiency = Math.round(((velocity - 1.0) / 3.0) * 100);
            efficiency = Math.min(100, Math.max(10, efficiency));
            currentAlert.className = "info-alert info-active";
            currentAlert.querySelector('span').textContent = "정상 가동 중: 빠른 바닷물의 해류 운동에너지가 날개를 회전시키고 있습니다.";
        }

        const generation = (efficiency * 0.06).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        startCurrentWaterLines(efficiency, velocity);
        
        const root = document.documentElement;
        if (efficiency > 0) {
            const speed = (4.0 - (efficiency / 100) * 3.6).toFixed(2);
            root.style.setProperty('--current-spin-speed', `${speed}s`);
        } else {
            root.style.setProperty('--current-spin-speed', '0s');
        }

        const powerLine = document.getElementById('current-power-line');
        const bulb = document.getElementById('current-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#64748b');
            bulb.style.filter = 'none';
        }

    } else if (activeEnergy === 'wave') {
        const height = parseFloat(document.getElementById('wave-height').value);
        document.getElementById('val-wave-height').textContent = `${height.toFixed(1)} m`;

        const efficiency = Math.round((height / 5) * 100);
        const generation = (efficiency * 0.04).toFixed(2);

        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;

        // SVG 물결 3중 일렁임 스피드 및 부표 롤링 주기 조작
        const root = document.documentElement;
        const backWave = document.querySelector('.wave-back');
        const middleWave = document.querySelector('.wave-middle');
        const frontWave = document.querySelector('.wave-front');

        if (height > 0) {
            backWave.style.animationPlayState = 'running';
            middleWave.style.animationPlayState = 'running';
            frontWave.style.animationPlayState = 'running';

            // 파고(height)에 따라 일렁임 속도와 부표 움직임 가속
            backWave.style.animationDuration = `${(9.0 - (height / 5.0) * 6.5).toFixed(2)}s`;
            middleWave.style.animationDuration = `${(7.5 - (height / 5.0) * 5.5).toFixed(2)}s`;
            frontWave.style.animationDuration = `${(6.0 - (height / 5.0) * 4.5).toFixed(2)}s`;

            const buoySpeed = (2.4 - (efficiency / 100) * 2.0).toFixed(2);
            root.style.setProperty('--wave-motion-speed', `${buoySpeed}s`);

            const speed = (4.0 - (efficiency / 100) * 3.6).toFixed(2);
            root.style.setProperty('--wave-spin-speed', `${speed}s`);
        } else {
            backWave.style.animationPlayState = 'paused';
            middleWave.style.animationPlayState = 'paused';
            frontWave.style.animationPlayState = 'paused';
            root.style.setProperty('--wave-motion-speed', '0s');
            root.style.setProperty('--wave-spin-speed', '0s');
        }

        const powerLine = document.getElementById('wave-power-line');
        const bulb = document.getElementById('wave-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#64748b');
            bulb.style.filter = 'none';
        }
    } else if (activeEnergy === 'fossil') {
        const fuel = parseInt(document.getElementById('fossil-fuel').value);
        let fuelText = `${fuel}%`;
        if (fuel === 0) fuelText = "정지 (0%)";
        else if (fuel === 50) fuelText = "보통 (50%)";
        else if (fuel === 100) fuelText = "최대 (100%)";
        
        document.getElementById('val-fossil-fuel').textContent = fuelText;
        
        const efficiency = fuel;
        const generation = (efficiency * 1.5).toFixed(2);
        
        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;
        
        const alertBox = document.getElementById('fossil-alert');
        if (efficiency === 0) {
            alertBox.className = "info-alert";
            alertBox.querySelector('span').textContent = "연료 공급이 중단되어 발전이 정지되었습니다.";
        } else {
            alertBox.className = "info-alert info-active";
            alertBox.querySelector('span').textContent = `화석연료를 태워 전기를 생산합니다. 발전량이 많을수록 이산화탄소 배출량도 크게 증가합니다.`;
        }
        
        startSmokeParticles(efficiency);

        const powerLine = document.getElementById('fossil-power-line');
        const bulb = document.getElementById('fossil-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#4a5568');
            bulb.style.filter = 'none';
        }
    } else if (activeEnergy === 'nuclear') {
        const rod = parseInt(document.getElementById('nuclear-rod').value);
        let rodText = `${rod}%`;
        if (rod === 0) rodText = "완전 인출 (0%)";
        else if (rod === 50) rodText = "보통 (50%)";
        else if (rod === 100) rodText = "완전 삽입 (100%)";
        
        document.getElementById('val-nuclear-rod').textContent = rodText;
        
        // 제어봉 삽입 깊이가 깊을수록(100%) 핵분열 억제 -> 효율 감소. 0%면 효율 100%
        const efficiency = 100 - rod;
        const generation = (efficiency * 2.0).toFixed(2);
        
        efficiencyMetric.textContent = `${efficiency}%`;
        generationMetric.textContent = `${generation} kW`;
        efficiencyBar.style.width = `${efficiency}%`;
        
        const alertBox = document.getElementById('nuclear-alert');
        if (efficiency === 0) {
            alertBox.className = "info-alert";
            alertBox.querySelector('span').textContent = "제어봉이 완전히 삽입되어 원자로 가동이 중단되었습니다.";
        } else {
            alertBox.className = "info-alert info-active";
            alertBox.querySelector('span').textContent = `우라늄 핵분열을 통해 막대한 에너지를 생산 중입니다. 제어봉을 빼낼수록(얕게 넣을수록) 발전량이 증가합니다.`;
        }
        
        startNuclearSteamParticles(efficiency);
        
        const controlRods = document.getElementById('control-rods');
        const reactorGlow = document.getElementById('reactor-core-glow');
        
        // 제어봉 위치 조정 (y: 140~200)
        controlRods.setAttribute('y', (140 + (rod * 0.6)).toString());
        
        // 노심 밝기 조정
        reactorGlow.setAttribute('opacity', (0.2 + (efficiency * 0.008)).toString());

        const powerLine = document.getElementById('nuclear-power-line');
        const bulb = document.getElementById('nuclear-bulb-glow');

        if (generation > 0) {
            powerLine.classList.add('active');
            const brightness = Math.min(100, Math.max(20, efficiency));
            bulb.setAttribute('fill', `rgb(234, 179, ${8 + (100 - brightness) * 2})`);
            bulb.style.filter = `drop-shadow(0 0 ${brightness/5}px rgba(234, 179, 8, 0.8))`;
        } else {
            powerLine.classList.remove('active');
            bulb.setAttribute('fill', '#4a5568');
            bulb.style.filter = 'none';
        }
    }
}


/* ==========================================
   3. 그린시티 건설 게임 (Green City Builder) 로직
   ========================================== */
/*
   day  = 맑은 낮처럼 조건이 가장 좋을 때 만드는 양
   night= 해도 없고 바람도 없는 것처럼 조건이 나쁠 때 보장되는 양
   이 두 값의 차이가 곧 '간판 용량과 실제의 차이'다.
*/
/* ==========================================
   3. 그린시티 건설 게임 (Green City Builder) 로직
   ========================================== */
/*
   day  = 맑은 낮처럼 조건이 가장 좋을 때 만드는 양
   night= 해도 없고 바람도 없는 것처럼 조건이 나쁠 때 보장되는 양
   이 두 값의 차이가 곧 '간판 용량과 실제의 차이'다.
*/
const PLANT_SPECS = {
    fossil: { cost: 800, power: 400, carbon: 80, day: 400, night: 400, color: '#64748b', bg: 'bg-gray',
        name: "화석연료 발전소", icon: "fa-industry", class: "built-fossil",
        blurb: "연료만 넣으면 밤에도 24시간 돌아가지만, 탄소를 가장 많이 내뿜습니다." },
    solar: { cost: 1000, power: 200, carbon: 0, day: 200, night: 0, color: '#d97706', bg: 'bg-yellow',
        name: "태양광 발전단지", icon: "fa-solar-panel", class: "built-solar",
        blurb: "햇빛이 있어야 합니다. 밤과 비 오는 날에는 거의 만들지 못합니다." },
    wind: { cost: 1200, power: 300, carbon: 0, day: 300, night: 0, color: '#059669', bg: 'bg-teal',
        name: "풍력 발전단지", icon: "fa-wind", class: "built-wind",
        blurb: "바람이 알맞게 불 때만 돕니다. 무풍에도, 태풍에도 멈춥니다." },
    geothermal: { cost: 1500, power: 350, carbon: 0, day: 350, night: 350, color: '#ea580c', bg: 'bg-orange',
        name: "지열 발전소", icon: "fa-fire-flame-simple", class: "built-geothermal",
        blurb: "땅속 열을 쓰기 때문에 날씨·밤낮과 관계없이 늘 일정합니다." },
    tidal_barrage: { cost: 1300, power: 450, carbon: 0, day: 450, night: 0, color: '#2563eb', bg: 'bg-blue',
        name: "조력 발전소", icon: "fa-bridge", class: "built-tidal-barrage",
        blurb: "한 번에 많이 만들지만 물이 드나드는 하루 네 번 무렵에만 돕니다." },
    tidal_current: { cost: 1100, power: 250, carbon: 0, day: 250, night: 50, color: '#0d9488', bg: 'bg-teal',
        name: "조류 발전소", icon: "fa-water-ladder", class: "built-tidal-current",
        blurb: "물살이 빠른 시간에 세게 돌고, 느릴 때도 조금씩은 만듭니다." },
    wave_power: { cost: 800, power: 150, carbon: 0, day: 150, night: 60, color: '#7c3aed', bg: 'bg-purple',
        name: "파력 발전소", icon: "fa-water", class: "built-wave-power",
        blurb: "값은 싸지만 만드는 양이 적고 파도에 따라 들쭉날쭉합니다." },
    hydro: { cost: 1400, power: 500, carbon: 0, day: 500, night: 500, color: '#1d4ed8', bg: 'bg-blue',
        name: "수력 발전소", icon: "fa-droplet", class: "built-hydro",
        blurb: "가장 많이 만들고 밤에도 돌지만, 가뭄이 오면 크게 줄어듭니다." },
    ess: { cost: 700, power: 0, carbon: 0, capacity: 300, day: 0, night: 0, color: '#9333ea', bg: 'bg-purple',
        name: "친환경 배터리 (ESS)", icon: "fa-car-battery", class: "built-ess",
        blurb: "스스로 전기를 만들지는 못합니다. 낮에 남는 전기를 담아 두었다가 밤에 꺼내 주는 큰 보조배터리입니다." }
};

// 도시가 시각마다 필요로 하는 전기 (사람들이 활동하는 시간에 많이 쓴다)
const DEMAND_CURVE = [
    450, 450, 450, 450, 450, 450,   // 0~5시 새벽
    750, 750, 750,                  // 6~8시 아침
    880, 880, 880, 880, 880, 880, 880, 880,  // 9~16시 낮
    980, 980, 980, 980,             // 17~20시 저녁 (가장 많이 씀)
    600, 600, 600                   // 21~23시 밤
];

const PEAK_DEMAND = Math.max(...DEMAND_CURVE);

// 그래프에 쌓는 순서 (아래부터)
const STACK_ORDER = ['hydro', 'geothermal', 'fossil', 'tidal_barrage', 'tidal_current', 'wave_power', 'wind', 'solar'];

const WEATHER_PROFILES = {
    normal:  { sky: 'CCCCCCCCCOOCCCCCOOCRRCCC', wind: 'nnwwwsssswwwsssswwwwwwnn' },
    drought: { sky: 'DDDDDDDDDDDDDDDDDDDDDDDD', wind: 'nnwwwwwwwwnnwwwwwwwwnnnn' },
    typhoon: { sky: 'HHHHHHHHHHHHHHHHHHHHHHHH', wind: 'xxxxsxxxxxxsxxxxxxxsxxxx' }
};

const SKY_INFO = {
    C: { weather: '맑음', coeff: 1.0 },
    O: { weather: '흐림', coeff: 0.3 },
    R: { weather: '비', coeff: 0.1 },
    D: { weather: '황사 가득함', coeff: 0.3 },
    H: { weather: '집중 호우', coeff: 0.05 }
};

const WIND_INFO = {
    n: { desc: '무풍', coeff: 0.0 },
    w: { desc: '보통 바람', coeff: 0.7 },
    s: { desc: '센 바람 (정격 출력)', coeff: 1.0 },
    x: { desc: '초강력 태풍 — 컷아웃', coeff: 0.0 }
};

const WAVE_PROFILE = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.6, 0.5, 0.4, 0.5,
                      0.6, 0.7, 0.8, 0.9, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5];

const SCENARIO_EVENTS = {
    normal: {
        15: { msg: '☁️ 돌발 상황: 초대형 먹구름이 도시를 덮쳤습니다! 태양광 발전량이 급감합니다.', weatherCoeff: 0.1 }
    },
    drought: {
        13: { msg: '🔥 돌발 상황: 가뭄이 더 심해져 댐 수위가 낮아졌습니다. 수력 발전 효율이 30%로 떨어집니다.', hydroCoeff: 0.3 }
    },
    typhoon: {
        19: { msg: '🌀 돌발 상황: 돌풍 경보! 안전을 위해 모든 풍력 발전기가 컷아웃(정지)되었습니다.', windCoeff: 0.0 }
    }
};

function getHourEnvironment(scenario, hour) {
    const profile = WEATHER_PROFILES[scenario];
    const sky = SKY_INFO[profile.sky[hour]] || SKY_INFO.C;
    const wind = WIND_INFO[profile.wind[hour]] || WIND_INFO.w;

    return {
        weather: sky.weather,
        weatherCoeff: sky.coeff,
        windDesc: wind.desc,
        windCoeff: wind.coeff,
        hydroCoeff: scenario === 'drought' ? 0.4 : 1.0
    };
}

let activeScenario = 'normal';
let budget = 5000;
let citySlots = [null, null, null, null, null, null];
let targetBuildSlot = null; // 현재 건설 선택 중인 부지 번호
let isSimulating = false;
let simIntervalId = null;
let simTickFn = null;
let simSpeed = 400;
let isSimPaused = false;
let simHistory = []; // 24시간 발전 결과 기록 (Stacked Bar 렌더링용)

// 게임 시나리오 및 이벤트 연결
function initGameScenario() {
    const cards = document.querySelectorAll('.scenario-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (isSimulating) return;
            
            const sc = card.getAttribute('data-scenario');
            activeScenario = sc;

            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            resetScenarioState();
        });
    });

    // 지도 부지(슬롯) 클릭 이벤트 연결
    const slotElements = document.querySelectorAll('.map-slot');
    slotElements.forEach((el, index) => {
        el.addEventListener('click', () => onSlotClick(index));
    });

    // 건설 모달 닫기 버튼
    const btnCloseBuild = document.getElementById('btn-close-build');
    if (btnCloseBuild) {
        btnCloseBuild.addEventListener('click', closeBuildModal);
    }

    // 미니 수요 그래프 및 상점 카드 목록 렌더링
    renderDemandPreviewChart();
    renderShopList();
    resetScenarioState();
}

function resetScenarioState() {
    citySlots = [null, null, null, null, null, null];
    
    if (activeScenario === 'normal') {
        budget = 5000;
    } else if (activeScenario === 'drought') {
        budget = 4000;
    } else if (activeScenario === 'typhoon') {
        budget = 4500;
    }

    updateGameUI();
}

// 1. 하루 전기 사용 미니 차트 렌더링
function renderDemandPreviewChart() {
    const chartContainer = document.getElementById('demand-chart');
    if (!chartContainer) return;

    chartContainer.innerHTML = '';
    const maxDemand = PEAK_DEMAND;

    DEMAND_CURVE.forEach((demand, h) => {
        const col = document.createElement('div');
        const isPeak = demand === PEAK_DEMAND;
        col.className = `demand-bar-col ${isPeak ? 'peak-bar' : ''}`;
        col.style.height = `${(demand / maxDemand) * 100}%`;
        col.title = `${h}시: ${demand}kW ${isPeak ? '(저녁 최대 피크)' : ''}`;

        if (h === 0 || h === 6 || h === 12 || h === 18 || h === 23) {
            const label = document.createElement('span');
            label.className = 'bar-label';
            label.textContent = `${h}시`;
            col.appendChild(label);
        }

        chartContainer.appendChild(col);
    });
}

// 2. 상점 도감 목록 렌더링 (시설 안내용)
function renderShopList() {
    const shopContainer = document.getElementById('shop-list');
    if (!shopContainer) return;

    shopContainer.innerHTML = Object.keys(PLANT_SPECS).map(key => {
        const spec = PLANT_SPECS[key];
        return `
            <div class="shop-item">
                <div class="item-icon ${spec.bg}"><i class="fa-solid ${spec.icon}"></i></div>
                <div class="item-info">
                    <h4>${spec.name}</h4>
                    <p class="specs">낮 ${spec.day}kW · 밤/악조건 ${spec.night}kW · 탄소 ${spec.carbon}%</p>
                </div>
                <div class="cost">${spec.cost.toLocaleString()}만 원</div>
            </div>
        `;
    }).join('');
}

// 3. 지형 부지(슬롯) 클릭 처리: 빈 땅은 건설, 지어진 땅은 철거
function onSlotClick(index) {
    if (isSimulating) {
        showToast("시뮬레이션이 진행 중입니다. 먼저 중단하세요.", "warn");
        return;
    }

    if (citySlots[index] === null) {
        openBuildModal(index);
    } else {
        removePlant(index);
    }
}

// 건설 선택 모달 열기
function openBuildModal(slotIndex) {
    targetBuildSlot = slotIndex;
    const modal = document.getElementById('build-modal');
    const slotTitle = document.getElementById('build-slot-title');
    const budgetLeft = document.getElementById('build-budget-left');
    const grid = document.getElementById('build-grid');

    let currentCost = 0;
    citySlots.forEach(s => { if (s) currentCost += PLANT_SPECS[s].cost; });
    const remaining = budget - currentCost;

    slotTitle.textContent = `${slotIndex + 1}번 빈 부지`;
    budgetLeft.textContent = `${remaining.toLocaleString()}만 원`;

    grid.innerHTML = Object.keys(PLANT_SPECS).map(key => {
        const spec = PLANT_SPECS[key];
        const isAffordable = remaining >= spec.cost;
        return `
            <div class="build-card ${isAffordable ? '' : 'disabled'}" onclick="${isAffordable ? `selectPlantToBuild('${key}')` : ''}">
                <div class="build-card-head">
                    <i class="fa-solid ${spec.icon}" style="color: ${spec.color}"></i>
                    <div>
                        <h4>${spec.name}</h4>
                        <span class="cost">${spec.cost.toLocaleString()}만 원</span>
                    </div>
                </div>
                <p class="build-card-specs">${spec.blurb}</p>
                <div class="build-card-foot">
                    <span class="dp-label">맑은 낮 ${spec.day}kW / 밤 ${spec.night}kW</span>
                    <span class="val-badge">${isAffordable ? '선택 건설' : '예산 부족'}</span>
                </div>
            </div>
        `;
    }).join('');

    modal.classList.remove('hidden');
}

function closeBuildModal() {
    document.getElementById('build-modal').classList.add('hidden');
    targetBuildSlot = null;
}

function selectPlantToBuild(type) {
    if (targetBuildSlot === null) return;
    buyPlantOnSlot(targetBuildSlot, type);
    closeBuildModal();
}

// 지정한 부지(slotIndex)에 건설
function buyPlantOnSlot(slotIndex, type) {
    const spec = PLANT_SPECS[type];
    let currentCost = 0;
    citySlots.forEach(s => { if (s) currentCost += PLANT_SPECS[s].cost; });
    const remaining = budget - currentCost;

    if (remaining < spec.cost) {
        showToast(`예산이 부족합니다. (필요: ${spec.cost}만 원 > 남은 예산: ${remaining}만 원)`, "warn");
        return;
    }

    citySlots[slotIndex] = type;
    updateGameUI();
    showToast(`${slotIndex + 1}번 부지에 [${spec.name}] 건설 완료!`, "ok");
}

// 발전시설 철거
function removePlant(index) {
    if (isSimulating) {
        showToast("시뮬레이션이 도는 동안에는 철거할 수 없어요.", "warn");
        return;
    }
    if (citySlots[index] === null) return;

    const spec = PLANT_SPECS[citySlots[index]];
    showConfirm(
        `${index + 1}번 부지 시설을 철거할까요?`,
        `[${spec.name}]를 철거하면 건설비 ${spec.cost.toLocaleString()}만 원이 예산으로 되돌아옵니다.`,
        () => {
            citySlots[index] = null;
            updateGameUI();
            showToast(`${spec.name}를 철거했습니다.`, "ok");
        }
    );
}

// 도시 UI 업데이트 (사전 전력 예상치 및 진단 메시지 포함)
function updateGameUI() {
    let usedBudget = 0;
    let dayPowerSum = 0;
    let nightPowerSum = 0;
    let activePlantsCount = 0;
    let carbonSum = 0;

    citySlots.forEach(slot => {
        if (slot) {
            const spec = PLANT_SPECS[slot];
            usedBudget += spec.cost;
            dayPowerSum += spec.day;
            nightPowerSum += spec.night;
            
            if (slot !== 'ess') {
                carbonSum += spec.carbon;
                activePlantsCount++;
            }
        }
    });

    const currentBudget = budget - usedBudget;
    const averageCarbon = activePlantsCount > 0 ? Math.round(carbonSum / activePlantsCount) : 0;

    document.getElementById('game-budget').textContent = `${currentBudget.toLocaleString()}만 원`;
    document.getElementById('game-carbon').textContent = `${averageCarbon}%`;
    document.getElementById('game-carbon-bar').style.width = `${averageCarbon}%`;

    // 상단 대시보드 저녁 필요량(980kW) 대비 맑은 낮 발전 용량 표기
    document.getElementById('game-total-power').textContent = `${dayPowerSum} / 980 kW`;
    const powerPercentage = Math.min(100, (dayPowerSum / 980) * 100);
    document.getElementById('game-power-bar').style.width = `${powerPercentage}%`;

    // 사전 발전량 실시간 갱신 (맑은 낮 vs 밤/악조건)
    document.getElementById('dp-day').textContent = `${dayPowerSum} kW`;
    document.getElementById('dp-night').textContent = `${nightPowerSum} kW`;

    // 사전 정전 예측 진단 문구
    const verdictEl = document.getElementById('dp-verdict');
    const essCount = citySlots.filter(s => s === 'ess').length;
    
    if (dayPowerSum === 0 && nightPowerSum === 0) {
        verdictEl.className = "dp-verdict";
        verdictEl.innerHTML = "아직 지은 시설이 없습니다. 오른쪽 빈 땅을 눌러 발전소를 지어 보세요.";
    } else if (nightPowerSum >= PEAK_DEMAND) {
        verdictEl.className = "dp-verdict verdict-ok";
        verdictEl.innerHTML = "✅ <strong>완벽합니다!</strong> 밤/악조건 최소 발전량이 저녁 피크(980kW)를 넘어서 24시간 정전 없이 안전하게 전기를 공급할 수 있습니다.";
    } else if ((nightPowerSum + essCount * 150) >= PEAK_DEMAND) {
        verdictEl.className = "dp-verdict verdict-ok";
        verdictEl.innerHTML = "✅ <strong>안정적입니다!</strong> 기저 발전소와 ESS 배터리에 저장된 전력이 저녁 피크(980kW)를 충분히 보완해 줄 것으로 예상됩니다.";
    } else if (dayPowerSum >= PEAK_DEMAND) {
        verdictEl.className = "dp-verdict verdict-warn";
        verdictEl.innerHTML = `⚠️ <strong>정전 주의!</strong> 맑은 낮(${dayPowerSum}kW)은 충분해 보이지만, 밤/악조건(${nightPowerSum}kW)에는 최대로 내도 부족합니다. 저녁 피크시간(17~20시)에 정전이 발생할 확률이 높습니다. 지열이나 ESS를 보강해 보세요.`;
    } else {
        verdictEl.className = "dp-verdict verdict-warn";
        verdictEl.innerHTML = `⚠️ <strong>발전량 부족!</strong> 맑은 낮 최대 발전량(${dayPowerSum}kW)이 도시의 저녁 최대 필요량(980kW)에 못 미칩니다. 발전소를 추가로 더 건설해 주세요.`;
    }

    // 영토 맵 슬롯 업데이트
    const slotElements = document.querySelectorAll('.map-slot');
    slotElements.forEach((el, index) => {
        const plant = citySlots[index];
        el.className = 'map-slot';

        if (plant) {
            const spec = PLANT_SPECS[plant];
            el.classList.add('built', spec.class);
            el.innerHTML = `<i class="fa-solid ${spec.icon}"></i> ${index + 1}. ${spec.name}`;
        } else {
            el.className = 'map-slot empty';
            el.innerHTML = `<i class="fa-solid fa-plus"></i> ${index + 1}번 빈 부지 (클릭하여 건설)`;
        }
    });
}

// 24시간 시뮬레이션 제어
document.getElementById('btn-start-simulation').addEventListener('click', () => {
    if (isSimulating) {
        stopGameSimulation();
    } else {
        startGameSimulation();
    }
});

function startGameSimulation() {
    if (isSimulating) return;
    clearInterval(simIntervalId);

    const builtCount = citySlots.filter(s => s !== null).length;
    if (builtCount === 0) {
        showToast("도시 영토에 발전 시설을 최소 1개 이상 건설한 뒤 시뮬레이션을 시작하세요.", "warn");
        return;
    }
    const onlyEss = citySlots.every(s => s === null || s === 'ess');
    if (onlyEss) {
        showToast("ESS는 전기를 만들지 못하고 저장만 합니다. 발전소를 최소 1개 지어 보세요.", "warn");
        return;
    }

    isSimulating = true;
    isSimPaused = false;
    simHistory = []; // 기록 초기화

    const btn = document.getElementById('btn-start-simulation');
    btn.innerHTML = `<i class="fa-solid fa-stop"></i> 시뮬레이션 중단`;
    btn.classList.add('btn-red');

    const pauseBtn = document.getElementById('btn-pause-simulation');
    pauseBtn.disabled = false;
    pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i> 일시정지`;

    document.querySelectorAll('.scenario-card').forEach(c => c.style.pointerEvents = 'none');

    const simScreen = document.getElementById('sim-screen');
    simScreen.classList.remove('hidden');

    const timelinePanel = document.getElementById('timeline-panel');
    timelinePanel.classList.remove('hidden');
    
    const slotsPanel = document.getElementById('city-slots');
    slotsPanel.style.opacity = '0.5';

    let hour = 0;
    let blackoutCount = 0;
    let carbonSum = 0;
    let activePlantsCount = 0;

    citySlots.forEach(s => {
        if (s && s !== 'ess') {
            carbonSum += PLANT_SPECS[s].carbon;
            activePlantsCount++;
        }
    });
    const avgCarbon = activePlantsCount > 0 ? carbonSum / activePlantsCount : 0;

    let batteryLevel = 0;
    const essCount = citySlots.filter(s => s === 'ess').length;
    const maxBatteryCapacity = essCount * 300;

    const logOutput = document.getElementById('sim-log-output');
    logOutput.innerHTML = `<div class="log-line log-success">⚡ [도전 시나리오: ${activeScenario === 'normal' ? '평화로운 그린시티' : (activeScenario === 'drought' ? '황사와 봄가뭄' : '강력 태풍과 폭우')}] 시뮬레이션 시작...</div>`;

    const blackoutHours = [];

    simTickFn = () => {
        if (hour >= 24) {
            endGameSimulation(blackoutCount, avgCarbon, essCount, blackoutHours);
            return;
        }

        // 1. 기상 환경
        const env = getHourEnvironment(activeScenario, hour);
        let weather = env.weather;
        let weatherCoeff = env.weatherCoeff;
        let windDesc = env.windDesc;
        let windCoeff = env.windCoeff;
        let hydroCoeff = env.hydroCoeff;

        // 1.5. 돌발 재난
        let disasterMessage = null;
        const disaster = SCENARIO_EVENTS[activeScenario][hour];
        if (disaster) {
            if (disaster.weatherCoeff !== undefined) weatherCoeff = disaster.weatherCoeff;
            if (disaster.windCoeff !== undefined) windCoeff = disaster.windCoeff;
            if (disaster.hydroCoeff !== undefined) hydroCoeff = disaster.hydroCoeff;
            disasterMessage = disaster.msg;
        }

        const disasterAlert = document.getElementById('disaster-alert');
        if (disasterMessage) {
            disasterAlert.classList.remove('hidden');
            document.getElementById('disaster-desc').textContent = disasterMessage;
            
            const logLine = document.createElement('div');
            logLine.className = 'log-line';
            logLine.innerHTML = `<span class="log-alert" style="color:#ef4444; font-weight:bold;">${disasterMessage}</span>`;
            logOutput.appendChild(logLine);
        } else {
            disasterAlert.classList.add('hidden');
        }

        // 2. 시간별 전력 수요
        const demand = DEMAND_CURVE[hour];

        // 3. 발전소별 전력 공급 계산
        let supply = 0;
        const breakdown = {};
        citySlots.forEach(plant => {
            if (!plant || plant === 'ess') return;
            let amount = 0;

            if (plant === 'fossil') {
                amount = PLANT_SPECS.fossil.power;
            } else if (plant === 'solar') {
                let timeCoeff = 0;
                if (hour >= 6 && hour <= 18) {
                    const radians = ((hour - 6) / 12) * Math.PI;
                    timeCoeff = Math.sin(radians);
                }
                amount = Math.round(PLANT_SPECS.solar.power * timeCoeff * weatherCoeff);
            } else if (plant === 'wind') {
                amount = Math.round(PLANT_SPECS.wind.power * windCoeff);
            } else if (plant === 'geothermal') {
                amount = PLANT_SPECS.geothermal.power;
            } else if (plant === 'hydro') {
                amount = Math.round(PLANT_SPECS.hydro.power * hydroCoeff);
            } else if (plant === 'tidal_barrage') {
                amount = [4, 10, 16, 22].includes(hour) ? PLANT_SPECS.tidal_barrage.power : 0;
            } else if (plant === 'tidal_current') {
                amount = ((hour >= 2 && hour <= 7) || (hour >= 14 && hour <= 19))
                    ? PLANT_SPECS.tidal_current.power : 50;
            } else if (plant === 'wave_power') {
                amount = Math.round(PLANT_SPECS.wave_power.power * WAVE_PROFILE[hour]);
            }

            supply += amount;
            breakdown[plant] = (breakdown[plant] || 0) + amount;
        });

        // 4. ESS 연동
        let netPower = supply - demand;
        let batteryActionLog = "";
        let essDischargeAmount = 0;

        if (netPower > 0 && essCount > 0) {
            const charging = Math.min(netPower, maxBatteryCapacity - batteryLevel);
            batteryLevel += charging;
            if (charging > 0) batteryActionLog = ` [🔋 ESS 충전 +${Math.round(charging)}kW]`;
        } else if (netPower < 0 && essCount > 0 && batteryLevel > 0) {
            const discharging = Math.min(Math.abs(netPower), batteryLevel);
            batteryLevel -= discharging;
            supply += discharging;
            essDischargeAmount = discharging;
            netPower = supply - demand;
            if (discharging > 0) batteryActionLog = ` [🔋 ESS 방출 -${Math.round(discharging)}kW]`;
        }

        // 5. 정전 판정
        let isBlackout = false;
        if (supply < demand) {
            isBlackout = true;
            blackoutCount++;
            blackoutHours.push(hour);
        }

        // 6. 24시간 실시간 차트 기록 데이터 축적 및 렌더링
        simHistory.push({
            hour,
            weather,
            windDesc,
            demand,
            supply,
            breakdown,
            essDischargeAmount,
            batteryLevel,
            isBlackout,
            shortfall: isBlackout ? (demand - supply) : 0
        });

        renderTimelineChart(simHistory);

        // UI 실시간 지표 갱신
        const clockFormatted = `${hour.toString().padStart(2, '0')}:00`;
        document.getElementById('sim-clock').innerHTML = `<i class="fa-regular fa-clock"></i> ${clockFormatted}`;
        document.getElementById('sim-env').innerHTML = `<i class="fa-solid fa-cloud-sun"></i> 날씨: ${weather} / 바람: ${windDesc}`;

        const maxVal = Math.max(supply, demand, 1200);
        document.getElementById('bar-sim-supply').style.width = `${(supply / maxVal) * 100}%`;
        document.getElementById('bar-sim-demand').style.width = `${(demand / maxVal) * 100}%`;
        
        document.getElementById('lbl-sim-supply').textContent = `${supply} kW`;
        document.getElementById('lbl-sim-demand').textContent = `${demand} kW`;

        if (essCount > 0) {
            document.getElementById('sim-battery-area').classList.remove('hidden');
            document.getElementById('lbl-sim-battery').textContent = `${Math.round(batteryLevel)} / ${maxBatteryCapacity} kWh`;
            document.getElementById('bar-sim-battery').style.width = `${(batteryLevel / maxBatteryCapacity) * 100}%`;
        } else {
            document.getElementById('sim-battery-area').classList.add('hidden');
        }

        const logLine = document.createElement('div');
        logLine.className = 'log-line';
        if (isBlackout) {
            const shortfall = demand - supply;
            logLine.innerHTML = `<span class="log-alert">⚠️ [${clockFormatted}] 정전! 공급 ${supply}kW < 수요 ${demand}kW — ${shortfall}kW 부족</span>`;
        } else {
            logLine.innerHTML = `<span>[${clockFormatted}] 공급 ${supply}kW / 수요 ${demand}kW — 전력망 정상.${batteryActionLog}</span>`;
        }
        logOutput.appendChild(logLine);
        logOutput.scrollTop = logOutput.scrollHeight;

        hour++;
    };

    simIntervalId = setInterval(simTickFn, simSpeed);
}

// 24시간 Stacked Bar Chart 렌더링 함수 (요구사항 1)
function renderTimelineChart(history) {
    const chart = document.getElementById('timeline-chart');
    const legend = document.getElementById('timeline-legend');
    if (!chart) return;

    chart.innerHTML = '';
    const maxAxis = 1300; // Y축 최대 기준 전력

    history.forEach(item => {
        const col = document.createElement('div');
        col.className = `timeline-col ${item.isBlackout ? 'blackout-col' : ''}`;
        col.setAttribute('data-hour', item.hour);

        // 막대 누적(Stacked) 컨테이너
        const stackContainer = document.createElement('div');
        stackContainer.className = 'stack-container';
        
        let totalHeightPercent = 0;
        
        // 발전소별 기여량 쌓기
        STACK_ORDER.forEach(plantKey => {
            const amount = item.breakdown[plantKey] || 0;
            if (amount > 0) {
                const seg = document.createElement('div');
                seg.className = 'stack-segment';
                const heightPercent = (amount / maxAxis) * 100;
                seg.style.height = `${heightPercent}%`;
                seg.style.backgroundColor = PLANT_SPECS[plantKey].color;
                seg.title = `${PLANT_SPECS[plantKey].name}: ${amount}kW`;
                stackContainer.appendChild(seg);
                totalHeightPercent += heightPercent;
            }
        });

        // ESS 방출분 표시
        if (item.essDischargeAmount > 0) {
            const seg = document.createElement('div');
            seg.className = 'stack-segment';
            const heightPercent = (item.essDischargeAmount / maxAxis) * 100;
            seg.style.height = `${heightPercent}%`;
            seg.style.backgroundColor = PLANT_SPECS.ess.color;
            seg.title = `ESS 방출 전력: ${item.essDischargeAmount}kW`;
            stackContainer.appendChild(seg);
            totalHeightPercent += heightPercent;
        }

        stackContainer.style.height = `${Math.min(100, (item.supply / maxAxis) * 100)}%`;

        // 수요선(Demand Line Marker)
        const demandMarker = document.createElement('div');
        demandMarker.className = 'demand-line-marker';
        demandMarker.style.bottom = `${(item.demand / maxAxis) * 100}%`;
        col.appendChild(demandMarker);

        col.appendChild(stackContainer);

        // 시간 축 라벨
        const label = document.createElement('span');
        label.className = 'col-hour-label';
        label.textContent = `${String(item.hour).padStart(2, '0')}시`;
        col.appendChild(label);

        // 클릭 시 상세 수치 툴팁 업데이트
        col.addEventListener('click', () => showHourDetail(item));

        chart.appendChild(col);
    });

    // 범례 (Legend) 생성
    if (legend) {
        const usedPlants = new Set();
        history.forEach(h => {
            Object.keys(h.breakdown).forEach(k => { if (h.breakdown[k] > 0) usedPlants.add(k); });
            if (h.essDischargeAmount > 0) usedPlants.add('ess');
        });

        legend.innerHTML = Array.from(usedPlants).map(key => {
            const spec = PLANT_SPECS[key];
            return `
                <div class="legend-item">
                    <span class="legend-color" style="background-color: ${spec.color}"></span>
                    <span>${spec.name}</span>
                </div>
            `;
        }).join('') + `<div class="legend-item"><span class="legend-color" style="background-color: #0f172a"></span><span>검은선: 필요 전력(수요)</span></div>`;
    }
}

// 클릭한 시각의 세부 발전 Breakdown 표시
function showHourDetail(item) {
    const detailBox = document.getElementById('hour-detail');
    if (!detailBox) return;

    document.querySelectorAll('.timeline-col').forEach(c => c.classList.remove('active-col'));
    const targetCol = document.querySelector(`.timeline-col[data-hour="${item.hour}"]`);
    if (targetCol) targetCol.classList.add('active-col');

    const hourStr = `${String(item.hour).padStart(2, '0')}:00`;
    let breakdownHTML = Object.keys(item.breakdown)
        .filter(k => item.breakdown[k] > 0)
        .map(k => `<strong>${PLANT_SPECS[k].name}</strong>: ${item.breakdown[k]}kW`)
        .join(' · ');

    if (item.essDischargeAmount > 0) {
        breakdownHTML += ` · <strong>ESS 보조 방출</strong>: ${Math.round(item.essDischargeAmount)}kW`;
    }

    if (!breakdownHTML) breakdownHTML = "발전기 가동 없음 (0 kW)";

    detailBox.innerHTML = `
        <div style="font-size: 0.95rem; font-weight: bold; margin-bottom: 0.3rem;">
            🕒 [${hourStr}] 기상: ${item.weather} (${item.windDesc})
        </div>
        <div>
            ⚡ Total 공급: <strong>${item.supply} kW</strong> vs 💡 필요 수요: <strong>${item.demand} kW</strong>
        </div>
        <div style="margin-top: 0.3rem; font-size: 0.82rem; color: #475569;">
            📊 발전소별 기여: ${breakdownHTML}
        </div>
        ${item.isBlackout ? `<div style="color:#dc2626; font-weight:bold; margin-top:0.4rem;">⚠️ 전력 부족: ${item.shortfall}kW 정전 발생!</div>` : `<div style="color:#059669; margin-top:0.4rem;">✅ 전력 공급 정상</div>`}
    `;
}

// 시뮬레이션 속도 변경 / 일시정지
function setSimSpeed(ms) {
    simSpeed = ms;
    if (isSimulating && !isSimPaused && simTickFn) {
        clearInterval(simIntervalId);
        simIntervalId = setInterval(simTickFn, simSpeed);
    }
}

function toggleSimPause() {
    if (!isSimulating) return;
    const pauseBtn = document.getElementById('btn-pause-simulation');

    if (isSimPaused) {
        isSimPaused = false;
        simIntervalId = setInterval(simTickFn, simSpeed);
        pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i> 일시정지`;
    } else {
        isSimPaused = true;
        clearInterval(simIntervalId);
        pauseBtn.innerHTML = `<i class="fa-solid fa-play"></i> 이어서 보기`;
        showToast("일시정지했습니다. 지금 화면의 수치를 모둠끼리 이야기해 보세요.", "info");
    }
}

// 시뮬레이션 중단 (결과 차트는 닫히지 않고 영속 유지됨)
function stopGameSimulation() {
    clearInterval(simIntervalId);
    isSimulating = false;
    isSimPaused = false;
    simTickFn = null;

    const btn = document.getElementById('btn-start-simulation');
    btn.innerHTML = `<i class="fa-solid fa-play"></i> 24시간 시뮬레이션 시작`;
    btn.classList.remove('btn-red');

    const pauseBtn = document.getElementById('btn-pause-simulation');
    if (pauseBtn) {
        pauseBtn.disabled = true;
        pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i> 일시정지`;
    }

    document.querySelectorAll('.scenario-card').forEach(c => c.style.pointerEvents = 'auto');

    // 실시간 시뮬레이션 창만 닫고 24시간 결과 그래프(timeline-panel)는 그대로 유지!
    document.getElementById('sim-screen').classList.add('hidden');
    document.getElementById('disaster-alert').classList.add('hidden');
    document.getElementById('city-slots').style.opacity = '1';
    document.getElementById('timeline-panel').classList.remove('hidden');
}

const SCENARIO_LABELS = {
    normal: '평화로운 그린시티',
    drought: '먼지와 가뭄의 습격',
    typhoon: '강력 태풍과 장마'
};

// 시뮬레이션 결과 판정
function endGameSimulation(blackoutCount, avgCarbon, essCount, blackoutHours = []) {
    if (!isSimulating) return;
    stopGameSimulation();

    let stabilityGrade = 'S';
    if (blackoutCount > 0 && blackoutCount <= 2) stabilityGrade = 'A';
    else if (blackoutCount > 2 && blackoutCount <= 5) stabilityGrade = 'B';
    else if (blackoutCount > 5 && blackoutCount <= 9) stabilityGrade = 'C';
    else if (blackoutCount > 9) stabilityGrade = 'F';

    let ecoGrade = 'S';
    if (avgCarbon > 0 && avgCarbon <= 20) ecoGrade = 'A';
    else if (avgCarbon > 20 && avgCarbon <= 40) ecoGrade = 'B';
    else if (avgCarbon > 40 && avgCarbon <= 60) ecoGrade = 'C';
    else if (avgCarbon > 60) ecoGrade = 'F';

    const scenarioLabel = SCENARIO_LABELS[activeScenario];
    let summaryText = "";
    if (stabilityGrade === 'S' && ecoGrade === 'S') {
        summaryText = `🎉 <strong>정전 0회 · 탄소 0%</strong> — [${scenarioLabel}] 조건에서 하루 종일 전기를 끊기지 않게 공급하면서 탄소도 전혀 내보내지 않았습니다.`;
    } else if (stabilityGrade === 'S' && ecoGrade !== 'S') {
        summaryText = `💡 <strong>정전은 막았지만 탄소가 남았습니다.</strong> 화석연료 발전소가 안정적인 전기를 준 대신 평균 탄소 배출이 ${Math.round(avgCarbon)}%입니다. 지열이나 조력처럼 <strong>날씨와 덜 관계있는 무탄소 발전소</strong>로 바꿔 보면 어떨까요?`;
    } else if (stabilityGrade !== 'S' && ecoGrade === 'S') {
        summaryText = `🌱 <strong>탄소는 0인데 전기가 끊겼습니다(${blackoutCount}회).</strong> 신재생에너지만으로 채우면 날씨가 나쁠 때 발전이 멈춥니다. <strong>지열·조력</strong>처럼 꾸준한 발전원이나 <strong>ESS</strong>로 간헐성을 메워 보세요.`;
    } else {
        summaryText = `🔧 <strong>정전 ${blackoutCount}회 · 평균 탄소 ${Math.round(avgCarbon)}%</strong> — 안정성과 환경 둘 다 아쉽습니다. 하단 막대그래프에서 정전이 난 시각에 어떤 발전소가 쉬고 있었는지 확인해 보세요.`;
    }

    let detailHTML = `<div class="rd-row"><span class="rd-key">시나리오</span><span>${scenarioLabel}</span></div>`;
    detailHTML += `<div class="rd-row"><span class="rd-key">발전 시설</span><span>${describeCity() || '없음'}</span></div>`;
    if (blackoutHours.length > 0) {
        const hoursText = blackoutHours.map(h => `${String(h).padStart(2, '0')}시`).join(', ');
        detailHTML += `<div class="rd-row rd-warn"><span class="rd-key">정전 시각</span><span>${hoursText}</span></div>`;
        detailHTML += `<div class="rd-tip">💬 하단의 <strong>24시간 발전 결과 그래프</strong>에서 이 시각에 어떤 발전소가 멈춰 있었는지 손가락으로 짚으며 모둠 토의해 보세요.</div>`;
    } else {
        detailHTML += `<div class="rd-row rd-ok"><span class="rd-key">정전 시각</span><span>없음 — 24시간 모두 정상 공급</span></div>`;
    }
    if (essCount === 0) {
        detailHTML += `<div class="rd-tip">🔋 아직 ESS가 없습니다. 남는 전기를 저장했다가 저녁 피크에 꺼내 쓰면 결과가 달라질 수 있어요.</div>`;
    }

    document.getElementById('score-stability').textContent = stabilityGrade;
    document.getElementById('score-eco').textContent = ecoGrade;
    document.getElementById('result-summary').innerHTML = summaryText;
    document.getElementById('result-detail').innerHTML = detailHTML;

    document.getElementById('score-stability').className = `score-val ${stabilityGrade === 'F' ? 'text-red' : (stabilityGrade === 'S' ? 'text-green' : '')}`;
    document.getElementById('score-eco').className = `score-val ${ecoGrade === 'F' ? 'text-red' : (ecoGrade === 'S' ? 'text-green' : '')}`;

    recordSimulationRun({
        scenario: scenarioLabel,
        city: describeCity(),
        usedBudget: citySlots.reduce((sum, s) => sum + (s ? PLANT_SPECS[s].cost : 0), 0),
        blackoutCount,
        blackoutHours,
        avgCarbon: Math.round(avgCarbon),
        stabilityGrade,
        ecoGrade
    });

    document.getElementById('game-modal').classList.remove('hidden');
}

// 현재 도시 구성을 "지열 2 · 태양광 1" 형태의 문장으로
const PLANT_SHORT = {
    fossil: '화석연료', solar: '태양광', wind: '풍력', geothermal: '지열',
    tidal_barrage: '조력', tidal_current: '조류', wave_power: '파력',
    hydro: '수력', ess: 'ESS'
};

function describeCity() {
    const counts = {};
    citySlots.forEach(s => { if (s) counts[s] = (counts[s] || 0) + 1; });
    return Object.keys(counts)
        .map(k => `${PLANT_SHORT[k] || PLANT_SPECS[k].name} ${counts[k]}`)
        .join(' · ');
}

// 결과를 근거로 설계 수정 (도시는 그대로 유지)
function closeGameModal() {
    document.getElementById('game-modal').classList.add('hidden');
}

function reviseCity() {
    document.getElementById('game-modal').classList.add('hidden');
    showToast("도시가 그대로 남아 있습니다. 결과를 근거로 배치를 고친 뒤 다시 돌려 보세요.", "info");
    const panel = document.getElementById('rationale-panel-anchor') || document.querySelector('.city-map-panel');
    if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function newCity() {
    document.getElementById('game-modal').classList.add('hidden');
    resetScenarioState();
    showToast("새 도시를 시작합니다. 시뮬레이션 기록은 비교표에 남아 있어요.", "info");
}


/* ==========================================
   4. 에너지 골든벨 퀴즈 (Quiz Module) 로직
   ========================================== */
/*
   문제 은행: modes 에 'pre'(1차시 사전 진단) / 'final'(5차시 정리 골든벨) 을 표기한다.
   사전 진단은 '무엇을 모르는지 찾기'가 목적이므로 개념·오개념 확인 문항 위주로 묶었다.
*/
const QUIZ_BANK = [
    {
        modes: ['pre', 'final'],
        question: "다음 중 신재생에너지의 특징에 대한 설명으로 올바르지 않은 것은 무엇일까요?",
        options: [
            "자연에서 지속해서 얻을 수 있어 화석연료와 달리 고갈될 염려가 없다.",
            "기후나 기상 조건에 관계없이 언제나 일정한 발전량을 낼 수 있다.",
            "화석연료에 비해 초기에 발전 설비를 설치할 때 막대한 비용이 필요하다.",
            "온실가스나 유해 물질을 배출하지 않기 때문에 환경 보호에 유리하다."
        ],
        answer: 1,
        explanation: "해설: 태양광이나 풍력과 같은 재생에너지는 햇빛의 세기, 기온, 바람의 속도 등 기후나 기상 조건에 따라 전력 공급량이 변하는 '간헐성(불안정성)'이라는 대표적인 단점이 있습니다."
    },
    {
        modes: ['pre', 'final'],
        question: "다음 중 '재생에너지'로 묶을 수 없는 것은 무엇일까요?",
        options: [
            "태양광 발전",
            "풍력 발전",
            "석탄 화력 발전",
            "지열 발전"
        ],
        answer: 2,
        explanation: "해설: 석탄·석유·천연가스는 땅속에 묻힌 양이 정해져 있어 쓰면 없어지는 화석연료입니다. 반면 태양·바람·땅속 열은 자연에서 계속 다시 채워지므로 재생에너지로 분류합니다."
    },
    {
        modes: ['pre', 'final'],
        question: "우리가 전기를 쓸 때 지구 온난화에 가장 큰 영향을 주는 것은 발전 과정에서 나오는 무엇 때문일까요?",
        options: [
            "이산화 탄소 등의 온실가스",
            "발전기가 만드는 소음",
            "발전소에서 나오는 빛",
            "송전선이 만드는 자기장"
        ],
        answer: 0,
        explanation: "해설: 화석연료를 태워 전기를 만들 때 나오는 이산화 탄소가 대기에 쌓이면 지구의 열이 빠져나가지 못해 기온이 올라갑니다. 그래서 '탄소 배출이 적은 전기'를 만드는 일이 기후 위기 대응의 핵심입니다."
    },
    {
        modes: ['pre', 'final'],
        question: "태양광 발전이 밤에는 전기를 만들지 못하는 까닭으로 가장 알맞은 것은?",
        options: [
            "밤에는 기온이 낮아 전선이 얼어붙기 때문이다.",
            "태양 전지판은 빛을 받아야 전기를 만들 수 있기 때문이다.",
            "밤에는 사람들이 전기를 쓰지 않기 때문이다.",
            "태양 전지판이 밤에는 자동으로 접히기 때문이다."
        ],
        answer: 1,
        explanation: "해설: 태양 전지판은 빛이 닿을 때 생기는 광전 효과로 전기를 만듭니다. 그래서 밤이나 흐린 날에는 발전량이 크게 줄고, 이 성질이 바로 신재생에너지의 '간헐성'입니다."
    },
    {
        modes: ['pre', 'final'],
        question: "다음 중 자연에서 지속해서 얻을 수 있는 '신재생에너지'의 종류로 올바르게 짝지어진 것은 무엇일까요?",
        options: [
            "석탄, 석유, 천연가스",
            "태양광, 풍력, 지열",
            "우라늄, 석탄, 휘발유",
            "디젤, 벙커C유, 석탄"
        ],
        answer: 1,
        explanation: "해설: 태양광, 풍력, 지열, 수력, 조력 등 자연의 힘을 이용해 계속 다시 채워지는 에너지가 신재생에너지입니다. 석탄, 석유, 천연가스는 사용하면 사라지는 화석연료입니다."
    },
    {
        modes: ['final'],
        question: "바람의 힘으로 발전을 하는 풍력 발전기에서, 태풍처럼 너무 강한 바람이 불 때 기기가 파손되는 것을 방지하기 위해 날개를 정지시키는 안전 기능을 무엇이라 부를까요?",
        options: [
            "스타트인 (Start-in)",
            "바람막이 (Wind-break)",
            "컷아웃 (Cut-out) 제어",
            "오토 스탠바이 (Auto-standby)"
        ],
        answer: 2,
        explanation: "해설: 풍력 발전기는 바람이 일정 속도 이상(보통 20~25m/s)으로 과도하게 불 경우, 터빈의 기계적 파손을 예방하기 위해 브레이크를 걸고 회전을 강제 차단하는 '컷아웃(Cut-out)' 안전 기능이 작동합니다. 그래서 태풍이 오면 오히려 풍력 발전이 멈춥니다."
    },
    {
        modes: ['final'],
        question: "신재생에너지의 최대 약점인 '간헐성(발전량 불안정)'을 극복하기 위해, 전기가 남을 때 배터리에 대량 저장했다가 필요할 때 꺼내어 쓰도록 돕는 에너지 저장장치의 약자는 무엇일까요?",
        options: [
            "CPU (Central Processing Unit)",
            "ESS (Energy Storage System)",
            "LED (Light Emitting Diode)",
            "GPS (Global Positioning System)"
        ],
        answer: 1,
        explanation: "해설: 에너지 저장 시스템(ESS)은 날씨와 시간에 따라 전력 생산량이 바뀌는 신재생에너지를 한데 모아 대형 저장 장치에 담아두어 정전을 방지하는 스마트 그리드의 핵심 장치입니다."
    },
    {
        modes: ['final'],
        question: "해양 에너지 3대장(조력, 조류, 파력) 중, '바다에 댐(방조제)을 건설하지 않고 빠른 바닷물의 흐름을 직접 이용하여 수중 터빈을 돌려 발전하는 방식'으로 갯벌 파괴 등 환경 파괴 우려가 가장 적은 친환경 해양 에너지는 무엇일까요?",
        options: [
            "조력 발전",
            "조류 발전",
            "파력 발전",
            "수력 발전"
        ],
        answer: 1,
        explanation: "해설: 조류 발전은 조력 발전과 달리 바다를 막는 댐(방조제)을 건설하지 않고 바닷물 본연의 빠른 흐름만을 활용하므로 해양 생태계 교란과 환경 파괴가 현저히 적은 발전 기술입니다."
    },
    {
        modes: ['final'],
        question: "수력 발전은 물이 아래로 떨어질 때 발생하는 위치에너지를 활용합니다. 다음 중 수력 발전소의 시간당 전력 생산량을 증가시키기 위한 조작 방법으로 알맞은 것은?",
        options: [
            "댐의 수문을 조금 더 개방하여 유량을 증가시킨다.",
            "발전기 내 터빈의 날개 개수를 최대한 줄인다.",
            "댐에 고여있는 물의 내부 온도를 뜨겁게 가열한다.",
            "수차가 돌아가지 않도록 수문을 완전히 폐쇄한다."
        ],
        answer: 0,
        explanation: "해설: 수력 발전량은 물이 떨어지는 높이(낙차)와 단위 시간당 수차를 지나는 물의 양(유량)에 비례합니다. 수문을 더 열어서 유량을 높이면 터빈이 더 큰 물리적인 힘으로 회전하게 되어 전기 에너지가 더 많이 생산됩니다."
    },
    {
        modes: ['final'],
        question: "지열 발전소가 다른 신재생에너지와 달리 24시간 거의 일정하게 전기를 만들 수 있는 까닭은 무엇일까요?",
        options: [
            "발전기 안에 커다란 배터리가 들어 있기 때문이다.",
            "땅속 깊은 곳의 열은 날씨나 밤낮에 관계없이 유지되기 때문이다.",
            "지열 발전소는 전기를 만들 때 연료를 태우기 때문이다.",
            "발전소를 반드시 바닷가에만 짓기 때문이다."
        ],
        answer: 1,
        explanation: "해설: 지열은 땅속 마그마의 열을 이용하므로 햇빛이나 바람과 달리 날씨의 영향을 거의 받지 않습니다. 그래서 간헐성이 큰 태양광·풍력을 보완하는 '기저 발전'으로 활용됩니다."
    },
    {
        modes: ['pre', 'final'],
        question: "서해안에 조력 발전소를 짓기에 유리한 우리나라의 지리적 조건은 무엇일까요?",
        options: [
            "밀물과 썰물의 수위 차이(조수 간만의 차)가 크다.",
            "일 년 내내 햇빛이 가장 강하다.",
            "화산 활동이 활발해 땅속이 뜨겁다.",
            "산이 높고 비가 많이 내린다."
        ],
        answer: 0,
        explanation: "해설: 우리나라 서해안은 밀물과 썰물의 높이 차가 세계적으로 큰 편입니다. 이 낙차를 이용해 방조제 아래 수차를 돌리는 것이 조력 발전이며, 발전소의 입지는 이렇게 지역의 자연 조건에 따라 결정됩니다."
    },
    {
        modes: ['final'],
        question: "태풍이 지나가는 날, 우리 도시의 전기를 가장 안정적으로 공급해 줄 수 있는 발전소 조합은 무엇일까요?",
        options: [
            "태양광 발전 + 풍력 발전",
            "태양광 발전만 여러 개",
            "지열 발전 + ESS(에너지 저장장치)",
            "풍력 발전만 여러 개"
        ],
        answer: 2,
        explanation: "해설: 태풍이 오면 비구름 때문에 태양광이 거의 멈추고, 풍력도 컷아웃으로 정지합니다. 날씨의 영향을 받지 않는 지열을 기본으로 두고 ESS로 부족한 시간을 메우는 조합이 가장 안정적입니다."
    },
    {
        modes: ['final'],
        question: "우리 도시의 에너지 조합(에너지 믹스)을 설계할 때, 아래 중 가장 바람직한 판단 태도는 무엇일까요?",
        options: [
            "값이 가장 싼 발전소만 최대한 많이 짓는다.",
            "탄소 배출, 정전 위험, 예산, 지역 조건을 함께 따져 근거를 들어 결정한다.",
            "가장 발전량이 큰 발전소 하나만 골라 전부 채운다.",
            "주민들의 의견은 듣지 않고 전문가가 정한 대로만 짓는다."
        ],
        answer: 1,
        explanation: "해설: 에너지 선택은 정답이 하나로 정해진 문제가 아니라 여러 조건이 서로 부딪히는 의사결정 문제입니다. 어떤 지표를 근거로 무엇을 우선했는지 설명할 수 있는 것이 가장 중요합니다."
    },
    {
        modes: ['final'],
        question: "신재생에너지 발전소를 지을 때 지역 주민과 갈등이 생기는 경우가 있습니다. 그 까닭으로 알맞지 않은 것은?",
        options: [
            "풍력 발전기의 소음이나 그림자가 생활에 불편을 줄 수 있다.",
            "조력 발전소의 방조제가 갯벌 생태계를 바꿀 수 있다.",
            "넓은 땅이 필요해 농지나 산림이 줄어들 수 있다.",
            "신재생에너지는 전기를 만들 때 매연을 많이 내뿜는다."
        ],
        answer: 3,
        explanation: "해설: 신재생에너지는 발전 과정에서 온실가스나 매연을 거의 내뿜지 않습니다. 다만 소음·경관·생태계 변화·토지 이용 같은 문제가 생길 수 있으므로, 기술만이 아니라 주민의 삶까지 함께 고려해야 합니다."
    }
];

let currentQuizIndex = 0;
let quizCorrectCount = 0;
let quizMode = 'pre';
let activeQuestions = [];
let quizWrongList = [];

const QUIZ_MODE_INFO = {
    pre: { count: 5, label: '사전 진단 골든벨 (1차시)' },
    final: { count: 10, label: '정리 골든벨 (5차시)' }
};

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initQuiz() {
    document.getElementById('btn-start-quiz').addEventListener('click', startQuiz);
    document.getElementById('btn-next-question').addEventListener('click', nextQuestion);
    document.getElementById('btn-retry-quiz').addEventListener('click', resetQuiz);

    document.querySelectorAll('.quiz-mode-card').forEach(card => {
        card.addEventListener('click', () => selectQuizMode(card.getAttribute('data-mode')));
    });
}

function selectQuizMode(mode) {
    quizMode = mode;
    document.querySelectorAll('.quiz-mode-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-mode') === mode);
    });
}

function startQuiz() {
    currentQuizIndex = 0;
    quizCorrectCount = 0;
    quizWrongList = [];

    const pool = QUIZ_BANK.filter(q => q.modes.includes(quizMode));
    activeQuestions = shuffle(pool).slice(0, Math.min(QUIZ_MODE_INFO[quizMode].count, pool.length));

    document.getElementById('quiz-start-screen').classList.remove('active');
    document.getElementById('quiz-play-screen').classList.add('active');
    document.getElementById('quiz-result-screen').classList.remove('active');

    renderQuestion();
}

function currentQuizScore() {
    if (activeQuestions.length === 0) return 0;
    return Math.round((quizCorrectCount / activeQuestions.length) * 100);
}

function renderQuestion() {
    const qData = activeQuestions[currentQuizIndex];

    document.getElementById('quiz-progress-text').textContent = `문제 ${currentQuizIndex + 1} / ${activeQuestions.length}`;
    document.getElementById('quiz-score-text').textContent = `맞힌 문제: ${quizCorrectCount}개`;

    const progressPercent = ((currentQuizIndex + 1) / activeQuestions.length) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;

    document.getElementById('quiz-question').textContent = `${currentQuizIndex + 1}. ${qData.question}`;
    document.getElementById('quiz-feedback').classList.add('hidden');

    const nextBtn = document.getElementById('btn-next-question');
    nextBtn.innerHTML = (currentQuizIndex === activeQuestions.length - 1)
        ? `결과 보기 <i class="fa-solid fa-flag-checkered"></i>`
        : `다음 문제로 <i class="fa-solid fa-arrow-right"></i>`;

    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';

    qData.options.forEach((optText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = `${index + 1}. ${optText}`;
        btn.addEventListener('click', () => handleOptionClick(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function handleOptionClick(selectedIndex, clickedBtn) {
    const qData = activeQuestions[currentQuizIndex];
    const allOptionButtons = document.querySelectorAll('.option-btn');

    allOptionButtons.forEach(btn => { btn.disabled = true; });

    const feedbackBox = document.getElementById('quiz-feedback');
    const feedbackTitle = document.getElementById('feedback-status-title');
    const feedbackDesc = document.getElementById('feedback-desc');

    if (selectedIndex === qData.answer) {
        quizCorrectCount++;
        clickedBtn.classList.add('correct');
        feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> ⭕ 정답입니다!`;
    } else {
        clickedBtn.classList.add('incorrect');
        allOptionButtons[qData.answer].classList.add('correct');
        feedbackTitle.innerHTML = `<i class="fa-solid fa-circle-xmark text-red"></i> ❌ 아쉽게도 오답입니다.`;
        quizWrongList.push({
            question: qData.question,
            chosen: qData.options[selectedIndex],
            correct: qData.options[qData.answer],
            explanation: qData.explanation
        });
    }

    document.getElementById('quiz-score-text').textContent = `맞힌 문제: ${quizCorrectCount}개`;
    feedbackDesc.textContent = qData.explanation;
    feedbackBox.classList.remove('hidden');
}

function nextQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < activeQuestions.length) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-play-screen').classList.remove('active');
    document.getElementById('quiz-result-screen').classList.add('active');

    const score = currentQuizScore();
    document.getElementById('quiz-final-score').textContent = score.toString();

    const badgeIcon = document.getElementById('result-badge-icon');
    const resultTitle = document.getElementById('quiz-result-title');
    const tierText = document.getElementById('quiz-tier');
    const feedbackSummary = document.getElementById('quiz-feedback-summary');

    if (quizMode === 'pre') {
        // 사전 진단은 등급을 매기지 않는다 — '무엇을 모르는지 확인'이 목적
        badgeIcon.className = "fa-solid fa-compass result-award-icon";
        badgeIcon.style.color = "#2563eb";
        resultTitle.textContent = "사전 진단이 끝났습니다!";
        tierText.textContent = "지금부터 배울 것 찾기";
        feedbackSummary.textContent = quizWrongList.length === 0
            ? "이미 기본 개념을 잘 알고 있네요. 앞으로는 '어떤 조건에서 어떤 에너지를 골라야 하는가'를 판단하는 활동에 집중해 봅시다."
            : `헷갈린 문제가 ${quizWrongList.length}개 있었습니다. 지금은 몰라도 괜찮습니다 — 아래 오답 노트의 내용이 앞으로 다섯 차시 동안 배울 내용입니다.`;
    } else if (score === 100) {
        badgeIcon.className = "fa-solid fa-crown result-award-icon";
        badgeIcon.style.color = "#d97706";
        resultTitle.textContent = "완벽합니다! 백점만점!";
        tierText.textContent = "미래 에너지 마스터 👑";
        feedbackSummary.textContent = "발전 원리와 장단점은 물론, 조건에 맞는 에너지 선택까지 설명할 수 있는 수준입니다. 제안서에도 근거를 자신 있게 적어 보세요!";
    } else if (score >= 80) {
        badgeIcon.className = "fa-solid fa-award result-award-icon";
        badgeIcon.style.color = "#059669";
        resultTitle.textContent = "훌륭합니다!";
        tierText.textContent = "그린 에너지 전문가 🥇";
        feedbackSummary.textContent = "신재생에너지에 대한 이해가 아주 훌륭합니다. 아래 오답 노트만 한 번 더 읽어 보면 마스터 등급도 어렵지 않습니다.";
    } else if (score >= 50) {
        badgeIcon.className = "fa-solid fa-medal result-award-icon";
        badgeIcon.style.color = "#2563eb";
        resultTitle.textContent = "좋은 성적입니다!";
        tierText.textContent = "에너지 꿈나무 🥈";
        feedbackSummary.textContent = "원리는 파악했지만 간헐성이나 조건별 판단에서 헷갈린 부분이 있습니다. 발전 실험실에서 슬라이더를 다시 조작해 보면 훨씬 또렷해집니다.";
    } else {
        badgeIcon.className = "fa-solid fa-seedling result-award-icon";
        badgeIcon.style.color = "#ef4444";
        resultTitle.textContent = "조금만 더 힘내요!";
        tierText.textContent = "에너지 탐구자 🥉";
        feedbackSummary.textContent = "발전 실험실에서 조건을 바꿔 가며 발전량이 어떻게 달라지는지 다시 관찰해 보세요. 오답 노트의 해설을 읽고 나면 훨씬 쉬워집니다.";
    }

    renderWrongNote();
    saveQuizResult(quizMode, score, quizCorrectCount, activeQuestions.length, quizWrongList);
}

function renderWrongNote() {
    const box = document.getElementById('quiz-wrong-note');
    const list = document.getElementById('quiz-wrong-list');

    if (quizWrongList.length === 0) {
        box.classList.add('hidden');
        return;
    }

    list.innerHTML = quizWrongList.map(w => `
        <div class="wrong-item">
            <p class="wrong-q">${escapeHTML(w.question)}</p>
            <p class="wrong-line"><span class="wl-x">내가 고른 답</span> ${escapeHTML(w.chosen)}</p>
            <p class="wrong-line"><span class="wl-o">정답</span> ${escapeHTML(w.correct)}</p>
            <p class="wrong-exp">${escapeHTML(w.explanation)}</p>
        </div>
    `).join('');
    box.classList.remove('hidden');
}

function resetQuiz() {
    document.getElementById('quiz-result-screen').classList.remove('active');
    document.getElementById('quiz-start-screen').classList.add('active');
}

/* ==========================================
   5. 대한민국 에너지 지형도 미션 로직
   ========================================== */
const MAP_MISSIONS = [
    { id: 'seohae', name: '서해안 (경기만 일대)', x: 120, y: 220, hint: '이곳 서해안은 밀물과 썰물의 수위 차(낙차)가 세계적으로 큽니다. 방조제를 쌓아 만들 수 있는 이 발전은?', correct: 'tidal_barrage' },
    { id: 'jeju', name: '제주도', x: 120, y: 650, hint: '제주도는 연중 바람이 매우 강하게 부는 지역입니다. 거대한 회전 날개를 세워 전기를 만드는 이 발전은?', correct: 'wind' },
    { id: 'donghae', name: '동해안·울릉도', x: 430, y: 220, hint: '울릉도와 동해안은 파도가 높게 치는 곳입니다. 파도의 상하 출렁임을 이용해 부표를 띄우는 이 발전은?', correct: 'wave' },
    { id: 'city', name: '수도권 대도시', x: 200, y: 250, hint: '이곳은 인구가 밀집된 대도시입니다. 아파트 베란다나 건물 옥상 유휴 공간에 쉽게 설치할 수 있는 발전은?', correct: 'solar' },
    { id: 'mountain', name: '태백산맥 산간 지역', x: 300, y: 150, hint: '이곳은 산세가 험하고 비가 많이 와 물을 가두기 좋습니다. 댐을 건설하여 물의 위치에너지를 이용하는 이 발전은?', correct: 'hydro' },
    { id: 'base', name: '남동 임해 산업 단지', x: 350, y: 450, hint: '이곳은 대규모 산업 단지가 있어 24시간 안정적인 기저 전력이 필요합니다. 우라늄을 원료로 하는 이 발전은?', correct: 'nuclear' }
];

const ENERGY_LABELS = {
    solar: '태양광', wind: '풍력', hydro: '수력',
    tidal_barrage: '조력', wave: '파력', nuclear: '원자력'
};

let mapMissionsCompleted = [];
let currentMissionId = null;

function initMapGame() {
    const svg = document.getElementById('korea-map-svg');
    if (!svg) return;

    // 저장된 기록이 있으면 완료 지역을 복원한다
    mapMissionsCompleted = Object.keys(classState.mapReasons || {});

    MAP_MISSIONS.forEach(mission => {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('class', 'map-marker');
        group.setAttribute('data-id', mission.id);
        group.setAttribute('transform', `translate(${mission.x}, ${mission.y})`);

        const isDone = mapMissionsCompleted.includes(mission.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', isDone ? '18' : '15');
        circle.setAttribute('fill', isDone ? '#10b981' : '#f59e0b');
        if (!isDone) circle.setAttribute('class', 'marker-pulse');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '0');
        text.setAttribute('y', '5');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-weight', 'bold');
        text.textContent = isDone ? 'O' : '?';

        group.appendChild(circle);
        group.appendChild(text);
        
        group.addEventListener('click', () => {
            if (mapMissionsCompleted.includes(mission.id)) {
                showToast(`${mission.name}은(는) 이미 완료했습니다. 아래 기록장에서 근거를 고쳐 쓸 수 있어요.`, "info");
                return;
            }

            currentMissionId = mission.id;
            document.getElementById('mission-status-content').innerHTML = `
                <div class="mission-hint-box">
                    <span class="mission-place">${mission.name}</span>
                    <p>${mission.hint}</p>
                </div>
            `;
            document.querySelectorAll('.energy-badge').forEach(b => b.classList.remove('badge-correct'));
        });

        svg.appendChild(group);
    });

    renderMapProgress();
    renderMapReasons();

    document.querySelectorAll('.energy-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            if (!currentMissionId) {
                showToast("먼저 지도에서 깜빡이는 '?' 마커를 눌러 미션 지역을 골라 주세요.", "warn");
                return;
            }

            const selectedEnergy = badge.getAttribute('data-energy');
            const mission = MAP_MISSIONS.find(m => m.id === currentMissionId);

            if (mission.correct === selectedEnergy) {
                mapMissionsCompleted.push(mission.id);
                badge.classList.add('badge-correct');

                const marker = document.querySelector(`.map-marker[data-id="${mission.id}"]`);
                marker.innerHTML = `
                    <circle cx="0" cy="0" r="18" fill="#10b981"></circle>
                    <text x="0" y="5" text-anchor="middle" fill="#fff" font-weight="bold">O</text>
                `;

                // 정답 뒤에는 곧바로 '왜 알맞은지' 근거를 쓰게 한다
                document.getElementById('mission-status-content').innerHTML = `
                    <div class="mission-ok-box">
                        <p class="mission-ok-title">🎉 정답! ${mission.name}에 <strong>${ENERGY_LABELS[selectedEnergy]} 발전소</strong>를 세웠습니다.</p>
                        <label class="reason-input-label">이 지역에 왜 알맞을까요? 한 문장으로 적어 보세요.</label>
                        <textarea id="reason-input" rows="3" placeholder="예: 서해안은 밀물과 썰물의 높이 차가 커서 방조제 아래 수차를 돌릴 힘이 충분하기 때문이다."></textarea>
                        <button class="btn btn-primary btn-sm" id="btn-save-reason">
                            <i class="fa-solid fa-floppy-disk"></i> 근거 저장하기
                        </button>
                    </div>
                `;

                const savedMission = mission;
                const savedEnergy = selectedEnergy;
                document.getElementById('btn-save-reason').addEventListener('click', () => {
                    const text = document.getElementById('reason-input').value.trim();
                    if (!text) {
                        showToast("근거를 한 문장이라도 적어 주세요. 이 문장이 5차시 제안서의 재료가 됩니다.", "warn");
                        return;
                    }
                    saveMapReason(savedMission.id, savedMission.name, savedEnergy, text);
                    document.getElementById('mission-status-content').innerHTML = `
                        <div class="empty-mission-state">근거를 저장했습니다! 지도에서 다음 <strong style="color:#f97316;">? 마커</strong>를 눌러 주세요.</div>
                    `;
                    showToast("입지 근거를 저장했습니다.", "ok");
                });

                currentMissionId = null;
                renderMapProgress();

                if (mapMissionsCompleted.length === MAP_MISSIONS.length) {
                    showToast("🎊 여섯 지역을 모두 완성했습니다! 아래 기록장의 근거를 다시 읽어 보세요.", "ok", 5000);
                }
            } else {
                document.getElementById('mission-status-content').innerHTML = `
                    <div class="mission-no-box">
                        <p><strong>다시 생각해 볼까요?</strong></p>
                        <p>${ENERGY_LABELS[selectedEnergy]} 발전은 이 지역의 조건과 잘 맞지 않습니다. 힌트에 나온 <strong>지형·기후 단어</strong>에 밑줄을 그어 보고 다시 골라 보세요.</p>
                        <p class="mission-hint-again">${mission.hint}</p>
                    </div>
                `;
            }
        });
    });
}

function renderMapProgress() {
    const done = mapMissionsCompleted.length;
    const total = MAP_MISSIONS.length;
    document.getElementById('map-progress-text').textContent = `${done} / ${total} 지역`;
    document.getElementById('map-progress-bar').style.width = `${(done / total) * 100}%`;
}


/* ==========================================
   6. 수업 운영 모듈 (모둠 기록 · 차시 안내 · 제안서)
   ========================================== */

const STORAGE_KEY = 'greencity-classroom-v1';

function defaultClassState() {
    return {
        team: '',
        lesson: 2,
        labRecords: [],
        exploredEnergies: [],
        questsDone: [],
        mapReasons: {},
        rationale: { condition: '', choice: '', revision: '' },
        simRuns: [],
        quiz: { pre: null, final: null },
        report: { problem: '', mix: '', evidence: '', effect: '' },
        peer: { checks: [false, false, false, false, false], question: '' }
    };
}

let classState = defaultClassState();

function loadClassState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) classState = Object.assign(defaultClassState(), JSON.parse(raw));
    } catch (e) {
        // 저장 공간을 쓸 수 없는 환경에서도 수업은 진행되어야 한다
        classState = defaultClassState();
    }
}

let saveTimer = null;
function saveClassState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(classState));
    } catch (e) { /* 저장 실패해도 화면 동작은 유지 */ }

    const indicator = document.getElementById('save-indicator');
    if (!indicator) return;
    indicator.classList.add('saved');
    indicator.innerHTML = `<i class="fa-solid fa-check"></i> 저장됨`;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        indicator.classList.remove('saved');
        indicator.innerHTML = `<i class="fa-solid fa-cloud-arrow-down"></i> 자동 저장`;
    }, 1500);
}

function escapeHTML(str) {
    return String(str === null || str === undefined ? '' : str)
        .replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/* ------------------------------------------
   공용 UI: 토스트 알림 / 확인 대화상자
   ------------------------------------------ */
function showToast(message, type = 'info', duration = 3200) {
    const area = document.getElementById('toast-area');
    if (!area) return;

    const icons = { ok: 'fa-circle-check', warn: 'fa-triangle-exclamation', info: 'fa-circle-info' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${escapeHTML(message)}</span>`;
    area.appendChild(el);

    setTimeout(() => {
        el.classList.add('toast-out');
        setTimeout(() => el.remove(), 300);
    }, duration);
}

let confirmCallback = null;
function showConfirm(title, message, onOk) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    confirmCallback = onOk;
    document.getElementById('confirm-modal').classList.remove('hidden');
}

/* ------------------------------------------
   차시 안내 데이터
   ------------------------------------------ */
const LESSONS = {
    1: {
        tab: 'quiz',
        title: '에너지 전환의 필요성',
        mission: '우리 도시의 전기가 어디서 오는지 살펴보고, 사전 진단 골든벨로 내가 아는 것과 모르는 것을 확인합니다.',
        criteria: [
            '사전 진단 골든벨 5문항을 끝까지 풀었다.',
            '오답 노트를 읽고 앞으로 배울 내용을 한 가지 이상 말할 수 있다.',
            '우리 모둠의 탐구 질문을 한 문장으로 정했다.'
        ],
        tool: '에너지 골든벨 (사전 진단 모드)',
        teacher: '점수를 공개하지 않고 “무엇이 헷갈렸는지”만 발표하게 하면 진단 활동의 부담이 줄어듭니다. 오답이 많이 나온 문항을 판서해 두었다가 5차시에 다시 확인하세요.'
    },
    2: {
        tab: 'lab',
        title: '발전 원리 탐구',
        mission: '슬라이더로 조건을 바꿔 가며 발전량이 어떻게 달라지는지 스스로 찾아내고, 9가지 에너지원을 비교해 정리합니다.',
        criteria: [
            '탐구 미션 10개 중 7개 이상을 찾아냈다.',
            '9가지 에너지원을 모두 눌러 비교표를 완성했다.',
            '실험 기록표에 조건과 결과를 3건 이상 남겼다.',
            '조건이 나빠지면 발전이 멈추는 성질(간헐성)을 말로 설명할 수 있다.'
        ],
        tool: '발전 실험실 (탐구 미션 · 비교표 · 기록표)',
        teacher: '정답을 먼저 알려주지 마세요. 탐구 미션은 학생이 조건을 찾아내면 자동으로 체크되고 그때서야 원리가 공개됩니다. “멈추는 조건 5개”를 모두 찾은 모둠에게 간헐성을 자기 말로 설명하게 한 뒤 전체 공유하면 좋습니다.'
    },
    3: {
        tab: 'map',
        title: '지형과 에너지 입지',
        mission: '지역의 지형·기후 단서를 읽고 알맞은 발전소를 배치한 뒤, 왜 알맞은지 근거를 씁니다.',
        criteria: [
            '6개 지역의 발전소를 모두 맞게 배치했다.',
            '각 지역마다 입지 근거를 한 문장으로 적었다.',
            '근거에 지형이나 기후를 나타내는 낱말이 들어 있다.'
        ],
        tool: '에너지 지형도 + 입지 근거 기록장',
        teacher: '정답을 맞히는 것보다 근거 문장이 중요합니다. “바람이 세다” 수준의 문장을 “연평균 풍속이 높아 날개가 정격 회전에 도달한다”처럼 다듬도록 발문하세요.'
    },
    4: {
        tab: 'game',
        title: '그린시티 설계 (본시)',
        mission: '예산과 기후 조건 속에서 발전소를 배치하고, 24시간 시뮬레이션 결과를 근거로 설계를 한 번 이상 수정합니다.',
        criteria: [
            '예산 안에서 6개 슬롯에 발전 시설을 배치했다.',
            '24시간 시뮬레이션을 돌리고 정전 시각을 확인했다.',
            '결과를 근거로 배치를 1회 이상 수정했다.',
            '설계 근거 기록지 ①②③을 모두 채웠다.'
        ],
        tool: '그린시티 건설 + 설계 근거 기록지',
        teacher: '모둠 역할(설계·기록·검증)을 먼저 정하고, 태블릿은 모둠당 2대로 제한합니다. 시뮬레이션을 [일시정지]해 정전이 난 시각의 화면을 함께 읽는 순간이 핵심 발문 지점입니다.'
    },
    5: {
        tab: 'report',
        title: '우리 도시 에너지 제안',
        mission: '앞선 차시의 기록을 모아 제안서를 완성하고, 패들렛에 공유한 뒤 서로의 제안에 질문을 남깁니다.',
        criteria: [
            '제안서에 시뮬레이션 수치가 들어간 근거를 3가지 적었다.',
            '좋은 점과 걱정되는 점을 모두 적었다.',
            '다른 모둠의 제안서에 질문을 1개 남겼다.',
            '정리 골든벨로 배운 내용을 확인했다.'
        ],
        tool: '에너지 제안서 + 패들렛 + 정리 골든벨',
        teacher: '제안서의 [복사] 버튼으로 패들렛에 바로 붙여넣게 하면 옮겨 적는 시간을 줄일 수 있습니다. 상호 평가는 점수가 아니라 질문 1개 남기기로 운영하세요.'
    }
};

/* ------------------------------------------
   수업 운영 바
   ------------------------------------------ */
function initClassroomBar() {
    const teamInput = document.getElementById('team-name');
    teamInput.value = classState.team;
    teamInput.addEventListener('input', () => {
        classState.team = teamInput.value;
        saveClassState();
    });

    document.getElementById('btn-reset-all').addEventListener('click', () => {
        showConfirm(
            '기록을 모두 지울까요?',
            '이 태블릿에 저장된 모둠 이름, 실험 기록, 입지 근거, 설계 근거, 제안서가 모두 지워집니다. 되돌릴 수 없습니다.',
            () => {
                try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* 무시 */ }
                location.reload();
            }
        );
    });

    document.getElementById('btn-confirm-ok').addEventListener('click', () => {
        document.getElementById('confirm-modal').classList.add('hidden');
        if (confirmCallback) confirmCallback();
        confirmCallback = null;
    });
    document.getElementById('btn-confirm-cancel').addEventListener('click', () => {
        document.getElementById('confirm-modal').classList.add('hidden');
        confirmCallback = null;
    });

    renderLessonBrief();
    switchTab(LESSONS[classState.lesson].tab, classState.lesson);
}

function renderLessonBrief() {
    const n = classState.lesson;
    const info = LESSONS[n];

    document.getElementById('brief-tag').textContent = `${n}차시`;
    document.getElementById('brief-title').textContent = info.title;
    document.getElementById('brief-mission').textContent = info.mission;
    document.getElementById('brief-criteria').innerHTML =
        info.criteria.map(c => `<li>${escapeHTML(c)}</li>`).join('');
}

/* ------------------------------------------
   2차시: 발전 실험실 기록표
   ------------------------------------------ */
function initLabRecords() {
    document.getElementById('btn-record-lab').addEventListener('click', () => {
        const snap = getLabSnapshot();
        classState.labRecords.push(snap);
        saveClassState();
        renderLabRecords();
        showToast(`${snap.energy} 조건을 기록했습니다. '알게 된 점'도 적어 보세요.`, 'ok');
    });

    document.getElementById('btn-clear-lab-records').addEventListener('click', () => {
        if (classState.labRecords.length === 0) return;
        showConfirm('실험 기록을 모두 지울까요?', '표에 적은 내용이 모두 사라집니다.', () => {
            classState.labRecords = [];
            saveClassState();
            renderLabRecords();
            showToast('실험 기록을 비웠습니다.', 'info');
        });
    });

    renderLabRecords();
}

// 지금 화면에 보이는 조건과 결과를 그대로 한 줄로 담아 온다
function getLabSnapshot() {
    const energyBtn = document.querySelector('.energy-tab.active');
    const panel = document.querySelector('.energy-controls.active');

    const conditions = Array.from(panel.querySelectorAll('.slider-group')).map(group => {
        const spans = group.querySelectorAll('label > span');
        if (spans.length < 2) return '';
        return `${spans[0].textContent.trim()} → ${spans[1].textContent.trim()}`;
    }).filter(Boolean).join(' / ');

    return {
        energy: energyBtn ? energyBtn.textContent.trim() : '알 수 없음',
        condition: conditions,
        efficiency: document.getElementById('metric-efficiency').textContent,
        generation: document.getElementById('metric-generation').textContent,
        note: ''
    };
}

function renderLabRecords() {
    const body = document.getElementById('lab-record-body');
    const empty = document.getElementById('lab-record-empty');
    const summary = document.getElementById('lab-record-summary');
    const records = classState.labRecords;

    if (records.length === 0) {
        body.innerHTML = '';
        empty.classList.remove('hidden');
        summary.classList.add('hidden');
        return;
    }
    empty.classList.add('hidden');

    body.innerHTML = records.map((r, i) => `
        <tr>
            <td><strong>${escapeHTML(r.energy)}</strong></td>
            <td class="cell-cond">${escapeHTML(r.condition)}</td>
            <td class="cell-num">${escapeHTML(r.efficiency)}</td>
            <td class="cell-num">${escapeHTML(r.generation)}</td>
            <td><input type="text" class="note-input" data-index="${i}" value="${escapeHTML(r.note)}" placeholder="예: 낮 12시에 가장 많이 만들어진다."></td>
            <td><button class="row-del" data-index="${i}" title="이 줄 지우기"><i class="fa-solid fa-xmark"></i></button></td>
        </tr>
    `).join('');

    body.querySelectorAll('.note-input').forEach(input => {
        input.addEventListener('input', () => {
            classState.labRecords[parseInt(input.dataset.index)].note = input.value;
            saveClassState();
        });
    });
    body.querySelectorAll('.row-del').forEach(btn => {
        btn.addEventListener('click', () => {
            classState.labRecords.splice(parseInt(btn.dataset.index), 1);
            saveClassState();
            renderLabRecords();
        });
    });

    renderLabSummary(records, summary);
}

// 기록이 쌓이면 "가장 잘 만든 조건"을 자동으로 짚어 준다
function renderLabSummary(records, summaryEl) {
    const byEnergy = {};
    records.forEach(r => {
        const eff = parseInt(r.efficiency) || 0;
        if (!byEnergy[r.energy] || eff > byEnergy[r.energy].eff) {
            byEnergy[r.energy] = { eff, condition: r.condition };
        }
    });

    const lines = Object.keys(byEnergy).map(energy => {
        const b = byEnergy[energy];
        if (b.eff === 0) {
            return `<li><strong>${escapeHTML(energy)}</strong> — 아직 전기가 만들어진 조건을 찾지 못했습니다. 조건을 더 바꿔 보세요.</li>`;
        }
        return `<li><strong>${escapeHTML(energy)}</strong> — 효율이 가장 높았던 조건은 <em>${escapeHTML(b.condition)}</em> (${b.eff}%)</li>`;
    });

    const zeroCases = records.filter(r => (parseInt(r.efficiency) || 0) === 0);
    let zeroLine = '';
    if (zeroCases.length > 0) {
        zeroLine = `<p class="summary-zero">⚡ 발전량이 <strong>0</strong>이 된 경우가 ${zeroCases.length}번 있었습니다. 신재생에너지가 조건에 따라 멈추는 이 성질을 <strong>간헐성</strong>이라고 합니다.</p>`;
    }

    summaryEl.innerHTML = `
        <h5><i class="fa-solid fa-magnifying-glass-chart"></i> 기록에서 찾은 규칙</h5>
        <ul>${lines.join('')}</ul>
        ${zeroLine}
    `;
    summaryEl.classList.remove('hidden');
}

/* ------------------------------------------
   2차시: 탐구 미션 + 에너지원 비교표
   ------------------------------------------ */

// 슬라이더 값을 숫자로 읽는 도우미
function sv(id) { return parseFloat(document.getElementById(id).value); }

/*
   미션은 정답을 알려주지 않는다. 학생이 조건을 직접 찾아내면 자동으로 체크된다.
   max 그룹 = 조건이 좋을 때 최대 출력 / stop 그룹 = 조건이 나쁘면 멈춤(간헐성)
*/
const LAB_QUESTS = [
    {
        id: 'hydro-max', group: 'max', energy: 'hydro', label: '수력',
        text: '수문을 끝까지 열어 효율 100%를 만들어 보자',
        reveal: '유량이 많을수록 수차를 더 세게 밀어 발전량이 늘어납니다.',
        check: () => activeEnergy === 'hydro' && sv('hydro-flow') === 100
    },
    {
        id: 'geo-hot', group: 'max', energy: 'geo', label: '지열',
        text: '땅속 온도가 60℃를 넘어 증기가 만들어지는 깊이를 찾아보자',
        reveal: '100m 내려갈 때마다 약 3℃씩 오릅니다. 1,500m부터 물이 끓기 시작했습니다.',
        check: () => activeEnergy === 'geo' && sv('geo-depth') >= 1500
    },
    {
        id: 'tidal-max', group: 'max', energy: 'tidal_barrage', label: '조력',
        text: '밀물과 썰물의 수위차를 최대로 벌려 보자',
        reveal: '수위차(낙차)가 클수록 방조제 아래 수차가 강하게 돌아갑니다.',
        check: () => activeEnergy === 'tidal_barrage' && sv('tidal-head') === 9
    },
    {
        id: 'wave-max', group: 'max', energy: 'wave', label: '파력',
        text: '파도를 가장 높게 만들어 효율 100%를 내 보자',
        reveal: '파고가 높을수록 부표가 크게 오르내리며 유압 실린더를 밀어 줍니다.',
        check: () => activeEnergy === 'wave' && sv('wave-height') === 5
    },
    {
        id: 'nuclear-max', group: 'max', energy: 'nuclear', label: '원자력',
        text: '제어봉을 조절해 최대 출력을 내 보자',
        reveal: '제어봉을 뽑을수록 핵분열이 활발해집니다. 그래서 제어봉은 원자로의 브레이크입니다.',
        check: () => activeEnergy === 'nuclear' && sv('nuclear-rod') === 0
    },

    {
        id: 'solar-dark', group: 'stop', energy: 'solar', label: '태양광',
        text: '태양광 발전량이 0이 되는 시각을 찾아보자',
        reveal: '해가 뜨기 전과 진 뒤에는 빛이 없어 전기를 전혀 만들지 못합니다.',
        check: () => activeEnergy === 'solar' && (sv('solar-time') <= 6 || sv('solar-time') >= 18)
    },
    {
        id: 'solar-rain', group: 'stop', energy: 'solar', label: '태양광',
        text: '낮 12시인데도 발전량이 뚝 떨어지는 날씨를 찾아보자',
        reveal: '같은 정오라도 비가 오면 효율이 5%까지 내려갑니다. 시각뿐 아니라 날씨도 변인입니다.',
        check: () => activeEnergy === 'solar' && sv('solar-time') === 12 && sv('solar-weather') === 1
    },
    {
        id: 'wind-calm', group: 'stop', energy: 'wind', label: '풍력',
        text: '바람이 약해서 날개가 돌지 못하는 풍속을 찾아보자',
        reveal: '3m/s보다 약한 바람은 무거운 날개를 돌릴 힘이 되지 못합니다.',
        check: () => activeEnergy === 'wind' && sv('wind-speed') < 3
    },
    {
        id: 'wind-cutout', group: 'stop', energy: 'wind', label: '풍력',
        text: '바람이 너무 세서 발전기가 스스로 멈추는 풍속을 찾아보자',
        reveal: '20m/s를 넘으면 부서지지 않도록 스스로 멈춥니다. 이것을 컷아웃(Cut-out)이라고 합니다.',
        check: () => activeEnergy === 'wind' && sv('wind-speed') > 20
    },
    {
        id: 'current-slow', group: 'stop', energy: 'tidal_current', label: '조류',
        text: '해저 터빈이 돌지 못하는 느린 유속을 찾아보자',
        reveal: '1.0m/s보다 느리면 물살이 터빈을 돌리지 못합니다. 그래서 물살이 빠른 좁은 물길에 짓습니다.',
        check: () => activeEnergy === 'tidal_current' && sv('tidal-velocity') < 1.0
    }
];

// 9가지 에너지원의 특성 (비교표 · 성취기준 [9기가03-10])
const ENERGY_FACTS = {
    solar: {
        name: '태양광', icon: 'fa-sun', use: '햇빛(빛에너지)', carbon: '없음',
        stop: '밤·흐린 날·비 오는 날에 크게 줄거나 멈춤',
        place: '건물 옥상, 넓은 평지, 저수지 수면(수상 태양광)',
        think: '넓은 땅이 필요해 농지·산림과 자리를 두고 다툴 수 있다'
    },
    wind: {
        name: '풍력', icon: 'fa-wind', use: '바람(운동에너지)', carbon: '없음',
        stop: '바람이 약해도(3m/s 미만), 너무 세도(20m/s 초과) 멈춤',
        place: '제주도, 대관령 같은 고지대, 해안·해상',
        think: '날개 소음과 그림자가 가까이 사는 주민에게 불편을 줄 수 있다'
    },
    hydro: {
        name: '수력', icon: 'fa-droplet', use: '높은 곳의 물이 떨어지는 힘', carbon: '없음',
        stop: '가뭄으로 댐 수위가 낮아지면 크게 줄어듦',
        place: '비가 많고 산세가 험한 산간 계곡의 댐',
        think: '댐을 만들면 마을과 숲이 물에 잠기고 물고기 길이 끊긴다'
    },
    geo: {
        name: '지열', icon: 'fa-fire-flame-simple', use: '땅속 깊은 곳의 열', carbon: '없음',
        stop: '날씨·밤낮과 관계없이 24시간 꾸준함',
        place: '화산 지형이나 온천 지대 (우리나라는 조건이 제한적)',
        think: '깊이 시추하는 과정에서 작은 지진이 생길 수 있다'
    },
    tidal_barrage: {
        name: '조력', icon: 'fa-bridge', use: '밀물과 썰물의 수위차', carbon: '없음',
        stop: '수위차가 벌어지는 하루 네 번 무렵에만 발전',
        place: '조수 간만의 차가 큰 서해안(경기만)',
        think: '방조제가 갯벌 생태계와 어민의 생활을 바꿀 수 있다'
    },
    tidal_current: {
        name: '조류', icon: 'fa-water-ladder', use: '빠르게 흐르는 바닷물', carbon: '없음',
        stop: '유속이 1.0m/s보다 느리면 터빈이 멈춤',
        place: '울돌목처럼 물살이 빠른 좁은 물길',
        think: '댐이 없어 갯벌 훼손은 적지만 배가 다니는 길과 겹칠 수 있다'
    },
    wave: {
        name: '파력', icon: 'fa-wave-square', use: '파도가 오르내리는 힘', carbon: '없음',
        stop: '바다가 잔잔하면 발전량이 크게 줄어듦',
        place: '파도가 높은 동해안과 제주 앞바다',
        think: '바닷물과 태풍에 시달려 시설이 잘 상하고 수리가 어렵다'
    },
    fossil: {
        name: '화석연료', icon: 'fa-industry', use: '석탄·석유를 태운 열', carbon: '매우 많음',
        stop: '연료만 넣으면 날씨와 관계없이 24시간 가동',
        place: '전기를 많이 쓰는 대도시 가까운 화력 발전소',
        think: '온실가스와 미세먼지의 가장 큰 원인이며 언젠가 고갈된다'
    },
    nuclear: {
        name: '원자력', icon: 'fa-radiation', use: '우라늄의 핵분열 열', carbon: '발전 중에는 거의 없음',
        stop: '날씨와 관계없이 24시간 꾸준함(기저 발전)',
        place: '냉각수를 얻기 쉬운 바닷가',
        think: '사고 위험과 수만 년 보관해야 하는 방사성 폐기물 문제가 남는다'
    }
};

const ENERGY_ORDER = ['solar', 'wind', 'hydro', 'geo', 'tidal_barrage', 'tidal_current', 'wave', 'fossil', 'nuclear'];

function initLabExploration() {
    // 실험실에서 에너지원을 누르면 '탐험함'으로 기록된다
    document.querySelectorAll('.energy-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            markEnergyExplored(tab.getAttribute('data-energy'));
            checkLabQuests();
        });
    });

    // 슬라이더를 움직일 때마다 미션 달성 여부를 살핀다
    document.querySelectorAll('.energy-controls input[type="range"]').forEach(slider => {
        slider.addEventListener('input', checkLabQuests);
    });

    markEnergyExplored('solar');   // 처음 화면에 열려 있는 태양광은 이미 만난 셈
    renderQuests();
    renderEnergyCompare();
    checkLabQuests();
}

function markEnergyExplored(energy) {
    if (!energy || classState.exploredEnergies.includes(energy)) return;
    classState.exploredEnergies.push(energy);
    saveClassState();
    renderEnergyCompare();
}

function checkLabQuests() {
    let newlyDone = null;

    LAB_QUESTS.forEach(q => {
        if (classState.questsDone.includes(q.id)) return;
        let ok = false;
        try { ok = q.check(); } catch (e) { ok = false; }
        if (ok) {
            classState.questsDone.push(q.id);
            newlyDone = q;
        }
    });

    if (newlyDone) {
        saveClassState();
        renderQuests();
        showToast(`🔎 발견! ${newlyDone.label} — ${newlyDone.reveal}`, 'ok', 6000);
    }
}

function renderQuests() {
    const done = classState.questsDone;

    ['max', 'stop'].forEach(group => {
        const box = document.getElementById(`quest-list-${group}`);
        box.innerHTML = LAB_QUESTS.filter(q => q.group === group).map(q => {
            const isDone = done.includes(q.id);
            return `
                <div class="quest-item ${isDone ? 'quest-done' : ''}">
                    <i class="fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle'}"></i>
                    <div>
                        <span class="quest-label">${escapeHTML(q.label)}</span>
                        <p class="quest-text">${escapeHTML(q.text)}</p>
                        ${isDone ? `<p class="quest-reveal">${escapeHTML(q.reveal)}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    });

    document.getElementById('quest-count').textContent = `${done.length} / ${LAB_QUESTS.length}`;
    document.getElementById('quest-bar').style.width = `${(done.length / LAB_QUESTS.length) * 100}%`;

    renderQuestConclusion(done);
}

// 미션이 모이면 스스로 결론을 내리도록 발문을 띄운다
function renderQuestConclusion(done) {
    const box = document.getElementById('quest-conclusion');
    const stopIds = LAB_QUESTS.filter(q => q.group === 'stop').map(q => q.id);
    const stopDone = stopIds.filter(id => done.includes(id)).length;

    if (done.length === LAB_QUESTS.length) {
        box.className = 'quest-conclusion conclusion-all';
        box.innerHTML = `
            <h5>🎉 10가지 비밀을 모두 찾았습니다!</h5>
            <p>같은 발전소라도 <strong>조건에 따라 0%가 되기도, 100%가 되기도</strong> 했습니다.
            그렇다면 우리 도시에 발전소를 지을 때는 무엇을 함께 생각해야 할까요?
            4차시 <strong>그린시티 건설</strong>에서 직접 골라 봅시다.</p>
        `;
    } else if (stopDone === stopIds.length) {
        box.className = 'quest-conclusion conclusion-stop';
        box.innerHTML = `
            <h5>💡 멈추는 조건을 모두 찾았습니다</h5>
            <p>태양광은 밤에, 풍력은 바람이 약하거나 너무 셀 때, 조류는 물살이 느릴 때 멈췄습니다.
            이렇게 자연 조건에 따라 발전량이 들쭉날쭉한 성질을 <strong>간헐성</strong>이라고 합니다.
            <br>그렇다면 <strong>밤에도, 태풍이 와도 멈추지 않는 발전소</strong>는 무엇이었나요? 비교표에서 찾아보세요.</p>
        `;
    } else {
        box.className = 'quest-conclusion hidden';
        return;
    }
    box.classList.remove('hidden');
}

function renderEnergyCompare() {
    const body = document.getElementById('energy-compare-body');
    if (!body) return;

    const explored = classState.exploredEnergies;

    body.innerHTML = ENERGY_ORDER.map(key => {
        const f = ENERGY_FACTS[key];
        if (!explored.includes(key)) {
            return `
                <tr class="row-locked">
                    <td><i class="fa-solid fa-lock"></i> ???</td>
                    <td colspan="5">실험실에서 <strong>${escapeHTML(f.name)}</strong>을(를) 눌러 보면 이 줄이 채워집니다.</td>
                </tr>
            `;
        }
        const carbonClass = f.carbon === '매우 많음' ? 'num-bad' : 'num-good';
        return `
            <tr>
                <td><strong><i class="fa-solid ${f.icon}"></i> ${escapeHTML(f.name)}</strong></td>
                <td class="cell-cond">${escapeHTML(f.use)}</td>
                <td class="cell-num ${carbonClass}">${escapeHTML(f.carbon)}</td>
                <td class="cell-cond">${escapeHTML(f.stop)}</td>
                <td class="cell-cond">${escapeHTML(f.place)}</td>
                <td class="cell-cond">${escapeHTML(f.think)}</td>
            </tr>
        `;
    }).join('');

    const n = explored.length;
    document.getElementById('explore-count').textContent = `${n} / ${ENERGY_ORDER.length} 종`;
    document.getElementById('explore-bar').style.width = `${(n / ENERGY_ORDER.length) * 100}%`;

    const summary = document.getElementById('explore-summary');
    if (n === ENERGY_ORDER.length) {
        summary.innerHTML = `
            <h5><i class="fa-solid fa-lightbulb"></i> 표를 다 채웠다면 이렇게 생각해 봅시다</h5>
            <ul>
                <li><strong>날씨와 관계없이 24시간 돌아가는 것</strong>은 무엇인가요? (지열 · 화석연료 · 원자력)</li>
                <li>그중 <strong>탄소를 내뿜지 않는 것</strong>만 남기면 무엇이 남나요?</li>
                <li>탄소가 없다고 해서 걱정거리까지 없는 것은 아닙니다. '함께 생각할 점' 칸을 다시 읽어 보세요.</li>
            </ul>
        `;
        summary.classList.remove('hidden');
    } else {
        summary.classList.add('hidden');
    }
}

/* ------------------------------------------
   3차시: 입지 근거 기록장
   ------------------------------------------ */
function saveMapReason(id, name, energy, text) {
    classState.mapReasons[id] = { name, energy, text };
    saveClassState();
    renderMapReasons();
}

function renderMapReasons() {
    const list = document.getElementById('map-reason-list');
    if (!list) return;

    const ids = Object.keys(classState.mapReasons);
    if (ids.length === 0) {
        list.innerHTML = `<div class="record-empty">아직 완료한 지역이 없습니다. 지도의 마커부터 눌러 보세요.</div>`;
        return;
    }

    list.innerHTML = ids.map(id => {
        const r = classState.mapReasons[id];
        return `
            <div class="reason-item">
                <div class="reason-head">
                    <span class="reason-place">${escapeHTML(r.name)}</span>
                    <span class="reason-energy">${escapeHTML(ENERGY_LABELS[r.energy] || r.energy)} 발전</span>
                </div>
                <textarea class="reason-edit" data-id="${escapeHTML(id)}" rows="2">${escapeHTML(r.text)}</textarea>
            </div>
        `;
    }).join('');

    list.querySelectorAll('.reason-edit').forEach(ta => {
        ta.addEventListener('input', () => {
            classState.mapReasons[ta.dataset.id].text = ta.value;
            saveClassState();
        });
    });
}

/* ------------------------------------------
   4차시: 설계 근거 기록지 · 시뮬레이션 회차 비교
   ------------------------------------------ */
function initGameWorksheet() {
    document.getElementById('btn-pause-simulation').addEventListener('click', toggleSimPause);

    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setSimSpeed(parseInt(btn.dataset.speed));
        });
    });

    const fields = {
        'rationale-condition': 'condition',
        'rationale-choice': 'choice',
        'rationale-revision': 'revision'
    };
    Object.keys(fields).forEach(elId => {
        const el = document.getElementById(elId);
        el.value = classState.rationale[fields[elId]] || '';
        el.addEventListener('input', () => {
            classState.rationale[fields[elId]] = el.value;
            saveClassState();
            const saved = document.getElementById('rationale-saved');
            saved.textContent = '저장됨';
            clearTimeout(saved._t);
            saved._t = setTimeout(() => { saved.textContent = ''; }, 1200);
        });
    });

    document.getElementById('btn-revise-city').addEventListener('click', reviseCity);
    document.getElementById('btn-new-city').addEventListener('click', newCity);

    renderCompareTable();
}

function recordSimulationRun(run) {
    classState.simRuns.push(run);
    saveClassState();
    renderCompareTable();
}

function renderCompareTable() {
    const panel = document.getElementById('compare-panel');
    const body = document.getElementById('compare-body');
    const verdict = document.getElementById('compare-verdict');
    const runs = classState.simRuns;

    if (runs.length === 0) {
        panel.classList.add('hidden');
        return;
    }
    panel.classList.remove('hidden');

    body.innerHTML = runs.map((r, i) => `
        <tr class="${i === runs.length - 1 ? 'row-latest' : ''}">
            <td><strong>${i + 1}차</strong></td>
            <td>${escapeHTML(r.scenario)}</td>
            <td class="cell-cond">${escapeHTML(r.city || '없음')}</td>
            <td class="cell-num">${r.usedBudget.toLocaleString()}만 원</td>
            <td class="cell-num ${r.blackoutCount > 0 ? 'num-bad' : 'num-good'}">${r.blackoutCount}회</td>
            <td class="cell-num ${r.avgCarbon > 0 ? 'num-bad' : 'num-good'}">${r.avgCarbon}%</td>
            <td class="cell-num">안정 ${r.stabilityGrade} / 환경 ${r.ecoGrade}</td>
        </tr>
    `).join('');

    if (runs.length < 2) {
        verdict.className = 'compare-verdict';
        verdict.innerHTML = `<i class="fa-solid fa-circle-info"></i> 설계를 고친 뒤 한 번 더 돌리면, 무엇이 좋아졌는지 여기에 비교해 드립니다.`;
        return;
    }

    // 같은 시나리오끼리 견주어야 설계 변화의 효과를 알 수 있다
    const last = runs[runs.length - 1];
    const prevIndex = runs.slice(0, -1).map(r => r.scenario).lastIndexOf(last.scenario);

    if (prevIndex === -1) {
        verdict.className = 'compare-verdict';
        verdict.innerHTML = `<i class="fa-solid fa-circle-info"></i>
            <strong>${escapeHTML(last.scenario)}</strong> 시나리오는 이번이 처음입니다.
            같은 시나리오로 한 번 더 돌려야 설계를 고친 효과를 견줄 수 있습니다.`;
        return;
    }

    const prev = runs[prevIndex];
    const dBlackout = prev.blackoutCount - last.blackoutCount;
    const dCarbon = prev.avgCarbon - last.avgCarbon;
    const sameCity = prev.city === last.city;

    const parts = [];
    if (dBlackout > 0) parts.push(`정전이 <strong>${dBlackout}회 줄었습니다</strong>`);
    else if (dBlackout < 0) parts.push(`정전이 <strong>${-dBlackout}회 늘었습니다</strong>`);
    else parts.push('정전 횟수는 그대로입니다');

    if (dCarbon > 0) parts.push(`탄소 배출이 <strong>${dCarbon}%p 줄었습니다</strong>`);
    else if (dCarbon < 0) parts.push(`탄소 배출이 <strong>${-dCarbon}%p 늘었습니다</strong>`);
    else parts.push('탄소 배출은 그대로입니다');

    const improved = dBlackout > 0 || dCarbon > 0;
    const tail = sameCity
        ? `<span class="verdict-ask">💬 설계를 바꾸지 않았으므로 결과도 같습니다. 발전소를 바꾼 뒤 다시 돌려 보세요.</span>`
        : `<span class="verdict-ask">💬 <strong>무엇을 바꿔서</strong> 이런 결과가 나왔는지 설계 근거 기록지 ③에 적어 두세요.</span>`;

    verdict.className = `compare-verdict ${improved ? 'verdict-good' : 'verdict-neutral'}`;
    verdict.innerHTML = `<i class="fa-solid ${improved ? 'fa-arrow-trend-up' : 'fa-circle-question'}"></i>
        ${prevIndex + 1}차 설계와 견주면 ${parts.join(', ')}.
        <br>${tail}`;
}

/* ------------------------------------------
   골든벨 결과 저장
   ------------------------------------------ */
function saveQuizResult(mode, score, correct, total, wrongList) {
    classState.quiz[mode] = {
        score, correct, total,
        wrongCount: wrongList.length
    };
    saveClassState();
}

/* ------------------------------------------
   5차시: 우리 도시 에너지 제안서
   ------------------------------------------ */
function initReport() {
    const fields = {
        'report-problem': 'problem',
        'report-mix': 'mix',
        'report-evidence': 'evidence',
        'report-effect': 'effect'
    };
    Object.keys(fields).forEach(elId => {
        const el = document.getElementById(elId);
        el.value = classState.report[fields[elId]] || '';
        el.addEventListener('input', () => {
            classState.report[fields[elId]] = el.value;
            saveClassState();
        });
    });

    document.querySelectorAll('#peer-check input[type="checkbox"]').forEach(cb => {
        const idx = parseInt(cb.dataset.peer);
        cb.checked = !!classState.peer.checks[idx];
        cb.addEventListener('change', () => {
            classState.peer.checks[idx] = cb.checked;
            saveClassState();
        });
    });

    const pq = document.getElementById('peer-question');
    pq.value = classState.peer.question || '';
    pq.addEventListener('input', () => {
        classState.peer.question = pq.value;
        saveClassState();
    });

    document.getElementById('btn-build-report').addEventListener('click', buildReport);
    document.getElementById('btn-copy-report').addEventListener('click', copyReport);
    document.getElementById('btn-print-report').addEventListener('click', printReport);

    renderCollectedData();
}

// 1~4차시에 남긴 기록을 모아 보여 준다
function renderCollectedData() {
    const box = document.getElementById('collected-list');
    if (!box) return;

    const items = [];

    if (classState.questsDone.length > 0 || classState.exploredEnergies.length > 1) {
        items.push({
            icon: 'fa-binoculars', label: '2차시 탐구 미션',
            text: `비밀 ${classState.questsDone.length}/${LAB_QUESTS.length}개 발견 · 에너지원 ${classState.exploredEnergies.length}/${ENERGY_ORDER.length}종 탐험`
        });
    }

    if (classState.labRecords.length > 0) {
        const noted = classState.labRecords.filter(r => r.note.trim()).length;
        items.push({
            icon: 'fa-flask', label: '2차시 실험 기록',
            text: `${classState.labRecords.length}건 기록 (알게 된 점 ${noted}건 작성)`
        });
    }

    const reasonIds = Object.keys(classState.mapReasons);
    if (reasonIds.length > 0) {
        items.push({
            icon: 'fa-map-location-dot', label: '3차시 입지 근거',
            text: reasonIds.map(id => `${classState.mapReasons[id].name}(${ENERGY_LABELS[classState.mapReasons[id].energy]})`).join(', ')
        });
    }

    if (classState.simRuns.length > 0) {
        const last = classState.simRuns[classState.simRuns.length - 1];
        items.push({
            icon: 'fa-city', label: '4차시 시뮬레이션',
            text: `${classState.simRuns.length}회 실행 · 최종 설계 [${last.city}] · 정전 ${last.blackoutCount}회 · 탄소 ${last.avgCarbon}%`
        });
    }

    if (classState.rationale.choice.trim()) {
        items.push({ icon: 'fa-pen-to-square', label: '설계 근거', text: classState.rationale.choice });
    }

    if (classState.quiz.pre) {
        items.push({ icon: 'fa-compass', label: '1차시 사전 진단', text: `${classState.quiz.pre.correct}/${classState.quiz.pre.total}문항 정답` });
    }

    if (items.length === 0) {
        box.innerHTML = `<p class="collected-empty">아직 모인 자료가 없습니다. 1~4차시 활동을 먼저 해 보세요.</p>`;
        return;
    }

    box.innerHTML = items.map(it => `
        <div class="collected-item">
            <i class="fa-solid ${it.icon}"></i>
            <div><span class="ci-label">${escapeHTML(it.label)}</span><p>${escapeHTML(it.text)}</p></div>
        </div>
    `).join('');
}

function reportPlainText() {
    const team = classState.team.trim() || '(모둠 이름을 적어 주세요)';
    const r = classState.report;
    const lines = [];

    lines.push(`[우리 도시 에너지 제안서] ${team}`);
    lines.push('');
    lines.push('■ 우리 도시의 에너지 문제');
    lines.push(r.problem.trim() || '(작성 전)');
    lines.push('');
    lines.push('■ 우리가 제안하는 에너지 조합');
    lines.push(r.mix.trim() || '(작성 전)');
    lines.push('');
    lines.push('■ 그렇게 판단한 근거');
    lines.push(r.evidence.trim() || '(작성 전)');
    lines.push('');
    lines.push('■ 좋은 점과 걱정되는 점');
    lines.push(r.effect.trim() || '(작성 전)');

    if (classState.simRuns.length > 0) {
        const last = classState.simRuns[classState.simRuns.length - 1];
        lines.push('');
        lines.push('■ 시뮬레이션 결과 (학습용 모형값)');
        lines.push(`시나리오: ${last.scenario} / 설계: ${last.city}`);
        lines.push(`정전 ${last.blackoutCount}회, 평균 탄소 ${last.avgCarbon}%, 사용 예산 ${last.usedBudget.toLocaleString()}만 원`);
        lines.push(`등급: 안정성 ${last.stabilityGrade} · 환경 ${last.ecoGrade}`);
    }

    const reasonIds = Object.keys(classState.mapReasons);
    if (reasonIds.length > 0) {
        lines.push('');
        lines.push('■ 지역 조건에 대해 알아낸 것');
        reasonIds.forEach(id => {
            const m = classState.mapReasons[id];
            lines.push(`· ${m.name} → ${ENERGY_LABELS[m.energy]}: ${m.text}`);
        });
    }

    lines.push('');
    lines.push('※ 위 수치는 수업용 시뮬레이터의 모형값으로 실제 발전량과 다릅니다.');
    return lines.join('\n');
}

function buildReport() {
    const r = classState.report;
    const missing = [];
    if (!r.problem.trim()) missing.push('①에너지 문제');
    if (!r.mix.trim()) missing.push('②에너지 조합');
    if (!r.evidence.trim()) missing.push('③근거');

    if (missing.length > 0) {
        showToast(`${missing.join(', ')} 칸이 비어 있습니다. 채운 만큼만 제안서에 담았어요.`, 'warn');
    }

    const team = classState.team.trim() || '우리 모둠';
    const last = classState.simRuns.length > 0 ? classState.simRuns[classState.simRuns.length - 1] : null;
    const reasonIds = Object.keys(classState.mapReasons);
    const blank = '<span class="doc-blank">아직 작성하지 않았습니다.</span>';

    let html = `
        <div class="doc-title">
            <span class="doc-eyebrow">우리 도시 에너지 제안서</span>
            <h2>${escapeHTML(team)}</h2>
        </div>
        <section class="doc-sec">
            <h3>1. 우리 도시의 에너지 문제</h3>
            <p>${escapeHTML(r.problem).replace(/\n/g, '<br>') || blank}</p>
        </section>
        <section class="doc-sec">
            <h3>2. 우리가 제안하는 에너지 조합</h3>
            <p class="doc-mix">${escapeHTML(r.mix).replace(/\n/g, '<br>') || blank}</p>
        </section>
        <section class="doc-sec">
            <h3>3. 그렇게 판단한 근거</h3>
            <p>${escapeHTML(r.evidence).replace(/\n/g, '<br>') || blank}</p>
        </section>
        <section class="doc-sec">
            <h3>4. 좋은 점과 걱정되는 점</h3>
            <p>${escapeHTML(r.effect).replace(/\n/g, '<br>') || blank}</p>
        </section>
    `;

    if (last) {
        html += `
        <section class="doc-sec doc-data">
            <h3>5. 시뮬레이션으로 확인한 결과</h3>
            <div class="doc-stats">
                <div><span>시나리오</span><strong>${escapeHTML(last.scenario)}</strong></div>
                <div><span>정전</span><strong>${last.blackoutCount}회</strong></div>
                <div><span>평균 탄소</span><strong>${last.avgCarbon}%</strong></div>
                <div><span>사용 예산</span><strong>${last.usedBudget.toLocaleString()}만 원</strong></div>
            </div>
            <p class="doc-city">설계: ${escapeHTML(last.city)}</p>
        </section>`;
    }

    if (reasonIds.length > 0) {
        html += `
        <section class="doc-sec">
            <h3>6. 지역 조건에 대해 알아낸 것</h3>
            <ul class="doc-list">
                ${reasonIds.map(id => {
                    const m = classState.mapReasons[id];
                    return `<li><strong>${escapeHTML(m.name)} · ${escapeHTML(ENERGY_LABELS[m.energy])}</strong> — ${escapeHTML(m.text)}</li>`;
                }).join('')}
            </ul>
        </section>`;
    }

    html += `<p class="doc-note">※ 위 수치는 수업용 시뮬레이터의 <strong>모형값</strong>으로 실제 발전량과 다릅니다.</p>`;

    document.getElementById('preview-doc').innerHTML = html;
    document.getElementById('preview-doc').classList.remove('hidden');
    document.getElementById('preview-placeholder').classList.add('hidden');

    if (missing.length === 0) showToast('제안서를 완성했습니다! 복사해서 패들렛에 올려 보세요.', 'ok');
}

function copyReport() {
    const text = reportPlainText();
    const done = () => showToast('제안서를 복사했습니다. 패들렛에 붙여넣기(Ctrl+V) 하세요.', 'ok');

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
        fallbackCopy(text, done);
    }
}

function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
        done();
    } catch (e) {
        showToast('복사에 실패했습니다. 제안서 내용을 직접 선택해 복사해 주세요.', 'warn');
    }
    ta.remove();
}

function printReport() {
    if (document.getElementById('preview-doc').classList.contains('hidden')) {
        showToast('먼저 [제안서 만들기]를 눌러 제안서를 완성해 주세요.', 'warn');
        return;
    }
    window.print();
}

/* ------------------------------------------
   교사용 수업 안내
   ------------------------------------------ */
function initTeacherGuide() {
    const flow = document.getElementById('guide-flow');
    flow.innerHTML = Object.keys(LESSONS).map(n => {
        const l = LESSONS[n];
        return `
            <div class="guide-step">
                <div class="gs-head">
                    <span class="gs-num">${n}차시</span>
                    <h4>${escapeHTML(l.title)}</h4>
                    <span class="gs-tool">${escapeHTML(l.tool)}</span>
                </div>
                <p class="gs-mission">${escapeHTML(l.mission)}</p>
                <p class="gs-teacher"><strong>운영 팁</strong> ${escapeHTML(l.teacher)}</p>
            </div>
        `;
    }).join('');

    document.getElementById('btn-teacher-guide').addEventListener('click', () => {
        document.getElementById('teacher-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-guide').addEventListener('click', () => {
        document.getElementById('teacher-modal').classList.add('hidden');
    });
    document.getElementById('teacher-modal').addEventListener('click', (e) => {
        if (e.target.id === 'teacher-modal') {
            document.getElementById('teacher-modal').classList.add('hidden');
        }
    });
}
