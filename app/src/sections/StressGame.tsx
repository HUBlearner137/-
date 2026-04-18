import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, BookOpen, Users, Clock, Target, HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 压力源类型定义
interface StressorType {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  emoji: string;
  solution: string;
  tips: string[];
}

const stressorTypes: StressorType[] = [
  {
    id: 'exam',
    name: '考试压力',
    icon: BookOpen,
    color: '#f0c2c2',
    emoji: '📚',
    solution: '考试压力应对方法',
    tips: [
      '制定合理的复习计划，避免临时抱佛脚',
      '保证充足睡眠，大脑需要休息来巩固记忆',
      '适当运动可以释放压力荷尔蒙',
      '深呼吸和正念冥想有助于缓解焦虑',
      '与同学交流，不要独自承受压力',
    ],
  },
  {
    id: 'social',
    name: '社交焦虑',
    icon: Users,
    color: '#c2e0f0',
    emoji: '👥',
    solution: '社交焦虑应对方法',
    tips: [
      '从小范围的社交开始，逐步建立自信',
      '记住：大多数人也在担心自己的表现',
      '准备几个话题，减少临场紧张感',
      '关注他人而非自己，倾听比说话更重要',
      '寻求心理咨询师的专业帮助',
    ],
  },
  {
    id: 'deadline',
    name: 'Deadline压力',
    icon: Clock,
    color: '#f9e3b4',
    emoji: '⏰',
    solution: 'Deadline压力应对方法',
    tips: [
      '使用番茄工作法，提高专注力和效率',
      '将大任务拆分成小步骤，逐个完成',
      '设定比实际deadline更早的内部截止日期',
      '学会说"不"，避免过度承诺',
      '完成比完美更重要，先做出来再优化',
    ],
  },
  {
    id: 'perfection',
    name: '完美主义',
    icon: Target,
    color: '#a7d4c3',
    emoji: '🎯',
    solution: '完美主义应对方法',
    tips: [
      '接受"足够好"的标准，80分也是优秀',
      '关注进步而非完美，每一步都值得肯定',
      '设定现实可行的目标',
      '允许自己犯错，错误是成长的机会',
      '练习自我同情，像对待朋友一样对待自己',
    ],
  },
  {
    id: 'future',
    name: '未来迷茫',
    icon: HelpCircle,
    color: '#d4c2e0',
    emoji: '❓',
    solution: '未来迷茫应对方法',
    tips: [
      '迷茫是正常的，大多数人都会经历这个阶段',
      '尝试实习或志愿活动，探索不同领域',
      '与学长学姐、老师或职业顾问交流',
      '关注当下能做的事情，而非遥远的未来',
      '制定短期目标，小步前进积累信心',
    ],
  },
];

// 游戏状态类型
type GameState = 'menu' | 'playing' | 'gameOver';

// 玩家对象
interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

// 障碍物对象
interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: StressorType;
  speed: number;
  hasScored?: boolean;
}

const StressGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const [gameState, setGameState] = useState<GameState>('menu');
  const [score, setScore] = useState(0);
  const [hitStressor, setHitStressor] = useState<StressorType | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  // 游戏数据引用
  const playerRef = useRef<Player>({
    x: 175,
    y: 500,
    width: 50,
    height: 50,
    speed: 8,
  });
  const obstaclesRef = useRef<Obstacle[]>([]);
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const scoreRef = useRef(0);
  const frameCountRef = useRef(0);

  // 画布尺寸
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;

  // 初始化游戏
  const initGame = useCallback(() => {
    playerRef.current = {
      x: CANVAS_WIDTH / 2 - 25,
      y: CANVAS_HEIGHT - 100,
      width: 50,
      height: 50,
      speed: 8,
    };
    obstaclesRef.current = [];
    scoreRef.current = 0;
    frameCountRef.current = 0;
    setScore(0);
    setHitStressor(null);
  }, []);

  // 生成障碍物
  const spawnObstacle = useCallback(() => {
    const type = stressorTypes[Math.floor(Math.random() * stressorTypes.length)];
    const obstacle: Obstacle = {
      x: Math.random() * (CANVAS_WIDTH - 60) + 10,
      y: -60,
      width: 50,
      height: 50,
      type,
      speed: 3 + Math.random() * 2 + scoreRef.current * 0.01,
    };
    obstaclesRef.current.push(obstacle);
  }, []);

  // 检测碰撞
  const checkCollision = (player: Player, obstacle: Obstacle): boolean => {
    return (
      player.x < obstacle.x + obstacle.width - 10 &&
      player.x + player.width > obstacle.x + 10 &&
      player.y < obstacle.y + obstacle.height - 10 &&
      player.y + player.height > obstacle.y + 10
    );
  };

  // 绘制游戏画面
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    // 清空画布
    ctx.fillStyle = '#f7f5f2';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 绘制背景网格
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // 绘制玩家（一个可爱的角色）
    const player = playerRef.current;
    
    // 玩家身体
    ctx.fillStyle = '#a7d4c3';
    ctx.beginPath();
    ctx.arc(
      player.x + player.width / 2,
      player.y + player.height / 2,
      player.width / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // 玩家边框
    ctx.strokeStyle = '#7bc4ad';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 玩家眼睛
    ctx.fillStyle = '#4a4a4a';
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 20, 5, 0, Math.PI * 2);
    ctx.arc(player.x + 35, player.y + 20, 5, 0, Math.PI * 2);
    ctx.fill();

    // 玩家微笑
    ctx.beginPath();
    ctx.arc(player.x + 25, player.y + 30, 10, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.stroke();

    // 绘制障碍物
    obstaclesRef.current.forEach((obstacle) => {
      // 障碍物背景（带圆角的矩形）
      ctx.fillStyle = obstacle.type.color;
      const r = 10;
      const x = obstacle.x;
      const y = obstacle.y;
      const w = obstacle.width;
      const h = obstacle.height;
      
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.fill();

      // 障碍物边框
      ctx.strokeStyle = obstacle.type.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制emoji
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        obstacle.type.emoji,
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height / 2
      );

      // 绘制压力源名称
      ctx.font = '10px Arial';
      ctx.fillStyle = '#4a4a4a';
      ctx.fillText(
        obstacle.type.name,
        obstacle.x + obstacle.width / 2,
        obstacle.y + obstacle.height + 12
      );
    });

    // 绘制分数
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#4a4a4a';
    ctx.textAlign = 'left';
    ctx.fillText(`得分: ${Math.floor(scoreRef.current)}`, 15, 30);

    // 绘制控制提示
    ctx.font = '12px Arial';
    ctx.fillStyle = '#7a7a7a';
    ctx.textAlign = 'center';
    ctx.fillText('← → 或 A D 键移动', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 15);
  }, []);

  // 游戏主循环
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (gameState === 'playing') {
      // 更新玩家位置
      const player = playerRef.current;
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
        player.x = Math.max(0, player.x - player.speed);
      }
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
        player.x = Math.min(CANVAS_WIDTH - player.width, player.x + player.speed);
      }

      // 生成障碍物
      frameCountRef.current++;
      const spawnRate = Math.max(60, 120 - scoreRef.current * 2);
      if (frameCountRef.current % Math.floor(spawnRate) === 0) {
        spawnObstacle();
      }

      // 更新障碍物位置并检测碰撞
      obstaclesRef.current = obstaclesRef.current.filter((obstacle) => {
        obstacle.y += obstacle.speed;

        // 检测碰撞
        if (checkCollision(player, obstacle)) {
          setHitStressor(obstacle.type);
          setGameState('gameOver');
          return false;
        }

        // 增加分数（成功躲避）
        if (obstacle.y > CANVAS_HEIGHT && !obstacle.hasScored) {
          scoreRef.current += 10;
          setScore(scoreRef.current);
          (obstacle as any).hasScored = true;
        }

        return obstacle.y < CANVAS_HEIGHT + 60;
      });

      // 持续增加分数
      scoreRef.current += 0.1;
      setScore(Math.floor(scoreRef.current));
    }

    draw(ctx);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, draw, spawnObstacle]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 触摸控制
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const diff = touchX - touchStartX;
      const player = playerRef.current;
      
      if (Math.abs(diff) > 10) {
        player.x = Math.max(
          0,
          Math.min(CANVAS_WIDTH - player.width, player.x + diff * 0.1)
        );
        touchStartX = touchX;
      }
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 游戏循环启动
  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop]);

  // 开始游戏
  const startGame = () => {
    initGame();
    setGameState('playing');
  };

  // 重新开始
  const restartGame = () => {
    initGame();
    setGameState('playing');
  };

  // 滚动到资源地图
  const scrollToResources = () => {
    const element = document.querySelector('#categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 隐藏滚动提示
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="game" className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-cream">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-mint/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-8">
            <h1 className="font-rounded text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark mb-4">
              压力源大逃亡
            </h1>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              控制小绿人躲避下落的压力源，看看你能坚持多久！
            </p>
          </div>

          {/* 游戏容器 */}
          <div className="relative mx-auto" style={{ maxWidth: CANVAS_WIDTH }}>
            {/* 游戏画布 */}
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="w-full rounded-3xl shadow-soft bg-white cursor-pointer touch-none"
              style={{ aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
            />

            {/* 开始菜单 */}
            {gameState === 'menu' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-3xl">
                <div className="text-6xl mb-6">🏃</div>
                <h2 className="font-rounded text-2xl font-bold text-text-dark mb-4">
                  准备好开始了吗？
                </h2>
                <p className="text-text-muted text-sm mb-6 text-center px-8">
                  使用 ← → 方向键或 A D 键控制移动<br />
                  手机用户可以直接左右滑动
                </p>
                <Button
                  onClick={startGame}
                  className="bg-mint hover:bg-mint/90 text-white font-medium rounded-full px-8 py-6 text-lg transition-all hover:shadow-glow hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  开始游戏
                </Button>
              </div>
            )}

            {/* 游戏结束画面 */}
            {gameState === 'gameOver' && hitStressor && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 rounded-3xl p-6 overflow-y-auto">
                <div className="text-5xl mb-4">{hitStressor.emoji}</div>
                <h2 className="font-rounded text-xl font-bold text-text-dark mb-2 text-center">
                  你遇到了：{hitStressor.name}
                </h2>
                <p className="text-text-muted text-sm mb-4 text-center">
                  最终得分：<span className="font-bold text-mint text-lg">{Math.floor(score)}</span>
                </p>

                {/* 应对方法 */}
                <div className="w-full max-w-sm bg-cream rounded-2xl p-4 mb-4">
                  <h3 className="font-rounded font-bold text-text-dark mb-3 flex items-center">
                    <span className="w-2 h-2 bg-mint rounded-full mr-2" />
                    {hitStressor.solution}
                  </h3>
                  <ul className="space-y-2">
                    {hitStressor.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-sm text-text-muted flex items-start"
                      >
                        <span className="text-mint mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={restartGame}
                    variant="outline"
                    className="border-2 border-mint/30 text-mint hover:bg-mint hover:text-white rounded-full px-6"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    再玩一次
                  </Button>
                  <Button
                    onClick={scrollToResources}
                    className="bg-mint hover:bg-mint/90 text-white rounded-full px-6"
                  >
                    查看资源
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 压力源图例 */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {stressorTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-soft"
              >
                <span className="text-xl">{type.emoji}</span>
                <span className="text-sm text-text-muted">{type.name}</span>
              </div>
            ))}
          </div>

          {/* 滚动提示 */}
          {showScrollHint && (
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-muted animate-bounce cursor-pointer"
              onClick={scrollToResources}
            >
              <span className="text-sm mb-1">向下滚动查看资源地图</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StressGame;
