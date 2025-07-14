import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    shape: 'circle' | 'triangle' | 'diamond' | 'hexagon';
    color: string;
    pulsePhase: number;
}

interface Connection {
    from: Node;
    to: Node;
    opacity: number;
    animated: boolean;
    progress: number;
}

@Component({
    selector: 'app-animated-background',
    standalone: true,
    imports: [CommonModule],
    template: `
                  <div class="animated-background">
                      <canvas #canvas class="background-canvas"></canvas>

                      <!-- Formas geométricas CSS flutuantes -->
                      <div class="floating-shapes">
                          <div class="shape shape-1"></div>
                          <div class="shape shape-2"></div>
                          <div class="shape shape-3"></div>
                          <div class="shape shape-4"></div>
                          <div class="shape shape-5"></div>
                          <div class="shape shape-6"></div>
                      </div>

                      <!-- Overlay gradiente -->
                      <div class="gradient-overlay"></div>
                  </div>
    `,
    styles: [`
                 .animated-background {
                     position: fixed;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     z-index: -1;
                     overflow: hidden;
                     background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                 }

                 .background-canvas {
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                 }

                 .floating-shapes {
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     pointer-events: none;
                 }

                 .shape {
                     position: absolute;
                     opacity: 0.1;
                     animation-timing-function: ease-in-out;
                     animation-iteration-count: infinite;
                     animation-direction: alternate;
                 }

                 .shape-1 {
                     width: 200px;
                     height: 200px;
                     background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                     border-radius: 50%;
                     top: 10%;
                     left: 5%;
                     animation: float1 20s infinite;
                     backdrop-filter: blur(1px);
                 }

                 .shape-2 {
                     width: 150px;
                     height: 150px;
                     background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                     clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                     top: 60%;
                     right: 10%;
                     animation: float2 25s infinite;
                 }

                 .shape-3 {
                     width: 180px;
                     height: 180px;
                     background: linear-gradient(45deg, rgba(240, 147, 251, 0.1), rgba(245, 101, 101, 0.1));
                     clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                     top: 20%;
                     right: 20%;
                     animation: float3 30s infinite;
                 }

                 .shape-4 {
                     width: 120px;
                     height: 120px;
                     background: linear-gradient(45deg, rgba(255, 255, 255, 0.08), rgba(102, 126, 234, 0.08));
                     clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                     bottom: 20%;
                     left: 15%;
                     animation: float4 18s infinite;
                 }

                 .shape-5 {
                     width: 160px;
                     height: 160px;
                     background: linear-gradient(45deg, rgba(118, 75, 162, 0.1), rgba(240, 147, 251, 0.1));
                     transform: rotate(45deg);
                     border-radius: 20px;
                     top: 40%;
                     left: 10%;
                     animation: float5 22s infinite;
                 }

                 .shape-6 {
                     width: 140px;
                     height: 140px;
                     background: linear-gradient(45deg, rgba(245, 101, 101, 0.1), rgba(255, 255, 255, 0.05));
                     clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
                     bottom: 30%;
                     right: 25%;
                     animation: float6 28s infinite;
                 }

                 @keyframes float1 {
                     0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                     25% { transform: translate(30px, -20px) scale(1.1) rotate(90deg); }
                     50% { transform: translate(-20px, 40px) scale(0.9) rotate(180deg); }
                     75% { transform: translate(40px, 20px) scale(1.05) rotate(270deg); }
                 }

                 @keyframes float2 {
                     0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                     33% { transform: translate(-40px, -30px) rotate(120deg) scale(1.2); }
                     66% { transform: translate(20px, -50px) rotate(240deg) scale(0.8); }
                 }

                 @keyframes float3 {
                     0%, 100% { transform: translate(0, 0) rotate(0deg); }
                     20% { transform: translate(25px, -35px) rotate(72deg); }
                     40% { transform: translate(-30px, -20px) rotate(144deg); }
                     60% { transform: translate(-15px, 40px) rotate(216deg); }
                     80% { transform: translate(35px, 25px) rotate(288deg); }
                 }

                 @keyframes float4 {
                     0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                     50% { transform: translate(-25px, -40px) rotate(180deg) scale(1.3); }
                 }

                 @keyframes float5 {
                     0%, 100% { transform: translate(0, 0) rotate(45deg) scale(1); }
                     25% { transform: translate(20px, -25px) rotate(135deg) scale(0.9); }
                     50% { transform: translate(-30px, 15px) rotate(225deg) scale(1.1); }
                     75% { transform: translate(15px, 30px) rotate(315deg) scale(0.95); }
                 }

                 @keyframes float6 {
                     0%, 100% { transform: translate(0, 0) scale(1); }
                     16% { transform: translate(20px, -15px) scale(1.1); }
                     33% { transform: translate(-15px, -25px) scale(0.9); }
                     50% { transform: translate(-25px, 20px) scale(1.05); }
                     66% { transform: translate(10px, 35px) scale(0.95); }
                     83% { transform: translate(30px, -10px) scale(1.08); }
                 }

                 .gradient-overlay {
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     background:
                         radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
                         radial-gradient(circle at 40% 80%, rgba(240, 147, 251, 0.1) 0%, transparent 50%);
                     pointer-events: none;
                 }

                 /* Tema escuro */
                 :host-context([data-theme="dark"]) .animated-background {
                     background: linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #475569 100%);
                 }

                 :host-context([data-theme="dark"]) .gradient-overlay {
                     background:
                         radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
                 }

                 :host-context([data-theme="dark"]) .shape-1 {
                     background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05));
                 }

                 :host-context([data-theme="dark"]) .shape-2 {
                     background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
                 }

                 :host-context([data-theme="dark"]) .shape-3 {
                     background: linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1));
                 }

                 :host-context([data-theme="dark"]) .shape-4 {
                     background: linear-gradient(45deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08));
                 }

                 :host-context([data-theme="dark"]) .shape-5 {
                     background: linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
                 }

                 :host-context([data-theme="dark"]) .shape-6 {
                     background: linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.05));
                 }
             `]
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {
    @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    private canvas!: HTMLCanvasElement;
    private ctx!: CanvasRenderingContext2D;
    private nodes: Node[] = [];
    private connections: Connection[] = [];
    private animationId!: number;
    private resizeObserver!: ResizeObserver;
    private mouseX = 0;
    private mouseY = 0;

    private readonly MAX_NODES = 100;
    private readonly MAX_CONNECTION_DISTANCE = 180;
    private readonly NODE_SPEED = 1.5;

    ngOnInit() {
        this.initCanvas();
        this.createNodes();
        this.animate();
        this.setupResize();
        this.setupMouseTracking();
    }

    ngOnDestroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    private initCanvas() {
        this.canvas = this.canvasRef.nativeElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.resizeCanvas();
    }

    private resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private setupResize() {
        this.resizeObserver = new ResizeObserver(() => {
            this.resizeCanvas();
        });
        this.resizeObserver.observe(document.body);
    }

    private setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    private createNodes() {
        const colors = [
            '#3b82f6', // Blue
            '#8b5cf6', // Purple
            '#ec4899', // Pink
            '#f59e0b', // Amber
            '#10b981', // Emerald
            '#ef4444', // Red
            '#06b6d4', // Cyan
        ];

        const shapes: Node['shape'][] = ['circle', 'triangle', 'diamond', 'hexagon'];

        for (let i = 0; i < this.MAX_NODES; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.NODE_SPEED,
                vy: (Math.random() - 0.5) * this.NODE_SPEED,
                size: Math.random() * 6 + 5,
                opacity: Math.random() * 0.6 + 0.4,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
    }

    private updateNodes() {
        this.nodes.forEach(node => {
            // Atualizar posição
            node.x += node.vx;
            node.y += node.vy;

            // Bounce nas bordas
            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -1;
                node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -1;
                node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            }

            // Efeito de atração sutil do mouse
            const mouseDistance = Math.sqrt(
                Math.pow(this.mouseX - node.x, 2) + Math.pow(this.mouseY - node.y, 2)
            );

            if (mouseDistance < 200) {
                const force = (200 - mouseDistance) / 200 * 0.02;
                const angle = Math.atan2(this.mouseY - node.y, this.mouseX - node.x);
                node.vx += Math.cos(angle) * force;
                node.vy += Math.sin(angle) * force;
            }

            // Limitar velocidade
            const maxSpeed = this.NODE_SPEED * 2;
            const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (currentSpeed > maxSpeed) {
                node.vx = (node.vx / currentSpeed) * maxSpeed;
                node.vy = (node.vy / currentSpeed) * maxSpeed;
            }

            // Atualizar fase do pulse
            node.pulsePhase += 0.02;
        });
    }

    private updateConnections() {
        this.connections = [];

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];

                const distance = Math.sqrt(
                    Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2)
                );

                if (distance < this.MAX_CONNECTION_DISTANCE) {
                    const opacity = (1 - distance / this.MAX_CONNECTION_DISTANCE) * 0.3;
                    this.connections.push({
                        from: nodeA,
                        to: nodeB,
                        opacity,
                        animated: Math.random() > 0.7,
                        progress: Math.random()
                    });
                }
            }
        }
    }

    private drawNode(node: Node) {
        this.ctx.save();

        // Efeito de pulse
        const pulseSize = node.size + Math.sin(node.pulsePhase) * 1;
        const pulseOpacity = node.opacity + Math.sin(node.pulsePhase) * 0.2;

        this.ctx.globalAlpha = pulseOpacity;
        this.ctx.fillStyle = 'transparent';
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.lineWidth = 2;

        this.ctx.translate(node.x, node.y);

        switch (node.shape) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
                this.ctx.stroke();
                break;

            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(0, -pulseSize);
                this.ctx.lineTo(-pulseSize * 0.866, pulseSize * 0.5);
                this.ctx.lineTo(pulseSize * 0.866, pulseSize * 0.5);
                this.ctx.closePath();
                this.ctx.stroke();
                break;

            case 'diamond':
                this.ctx.beginPath();
                this.ctx.moveTo(0, -pulseSize);
                this.ctx.lineTo(pulseSize, 0);
                this.ctx.lineTo(0, pulseSize);
                this.ctx.lineTo(-pulseSize, 0);
                this.ctx.closePath();
                this.ctx.stroke();
                break;

            case 'hexagon':
                this.ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const x = Math.cos(angle) * pulseSize;
                    const y = Math.sin(angle) * pulseSize;
                    if (i === 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                }
                this.ctx.closePath();
                this.ctx.stroke();
                break;
        }

        this.ctx.restore();
    }

    private drawConnection(connection: Connection) {
        this.ctx.save();
        this.ctx.globalAlpha = connection.opacity;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.lineWidth = 1;

        if (connection.animated) {
            // Linha animada com gradiente branco
            const gradient = this.ctx.createLinearGradient(
                connection.from.x, connection.from.y,
                connection.to.x, connection.to.y
            );

            const progress = (Math.sin(Date.now() * 0.005 + connection.progress) + 1) / 2;
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(progress, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.4)');

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2;
        }

        this.ctx.beginPath();
        this.ctx.moveTo(connection.from.x, connection.from.y);
        this.ctx.lineTo(connection.to.x, connection.to.y);
        this.ctx.stroke();

        this.ctx.restore();
    }

    private animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateNodes();
        this.updateConnections();

        // Desenhar conexões primeiro (atrás dos nós)
        this.connections.forEach(connection => {
            this.drawConnection(connection);
        });

        // Desenhar nós
        this.nodes.forEach(node => {
            this.drawNode(node);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

