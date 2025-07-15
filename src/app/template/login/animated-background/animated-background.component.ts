import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Connection } from '../../../model/Connection';
import { Node } from '../../../model/Node'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'animated-background',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './animated-background.component.html',
    styleUrl: './animated-background.component.scss'
})
export class AnimatedBackgroundComponent implements OnInit, OnDestroy {

    //region Constants
    private readonly MAX_CONNECTION_DISTANCE: number = 180;
    private readonly MAX_NODES: number = 100;
    private readonly NODE_SPEED: number = 1.5;
    //endregion

    //region Variables
    @ViewChild('canvas', { static: true })
    public canvasRef!: ElementRef<HTMLCanvasElement>;

    private resizeObserver!: ResizeObserver;
    private ctx!: CanvasRenderingContext2D;
    private connections: Connection[] = [];
    private canvas!: HTMLCanvasElement;
    private animationId!: number;
    private nodes: Node[] = [];
    private mouseX: number = 0;
    private mouseY: number = 0;
    //endregion

    //region Functions

    public ngOnInit(): void {
        this.initCanvas();
        this.createNodes();
        this.animate();
        this.setupResize();
        this.setupMouseTracking();
    }

    public ngOnDestroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    private initCanvas(): void {
        this.canvas = this.canvasRef.nativeElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.resizeCanvas();
    }

    private resizeCanvas(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private setupResize(): void {
        this.resizeObserver = new ResizeObserver(() => {
            this.resizeCanvas();
        });
        this.resizeObserver.observe(document.body);
    }

    private setupMouseTracking(): void {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }

    private createNodes(): void {
        const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];

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

    private updateNodes(): void {
        this.nodes.forEach((node) => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > this.canvas.width) {
                node.vx *= -1;
                node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            }
            if (node.y < 0 || node.y > this.canvas.height) {
                node.vy *= -1;
                node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            }

            const mouseDistance = Math.sqrt(Math.pow(this.mouseX - node.x, 2) + Math.pow(this.mouseY - node.y, 2));

            if (mouseDistance < 200) {
                const force = ((200 - mouseDistance) / 200) * 0.02;
                const angle = Math.atan2(this.mouseY - node.y, this.mouseX - node.x);
                node.vx += Math.cos(angle) * force;
                node.vy += Math.sin(angle) * force;
            }

            const maxSpeed = this.NODE_SPEED * 2;
            const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (currentSpeed > maxSpeed) {
                node.vx = (node.vx / currentSpeed) * maxSpeed;
                node.vy = (node.vy / currentSpeed) * maxSpeed;
            }

            node.pulsePhase += 0.02;
        });
    }

    private updateConnections(): void {
        this.connections = [];

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];

                const distance = Math.sqrt(Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2));

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

    private drawNode(node: Node): void {
        this.ctx.save();

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

    private drawConnection(connection: Connection): void {
        this.ctx.save();
        this.ctx.globalAlpha = connection.opacity;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.lineWidth = 1;

        if (connection.animated) {
            const gradient = this.ctx.createLinearGradient(connection.from.x, connection.from.y, connection.to.x, connection.to.y);

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

    private animate(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.updateNodes();
        this.updateConnections();

        // Desenhar conexões primeiro (atrás dos nós)
        this.connections.forEach((connection) => {
            this.drawConnection(connection);
        });

        // Desenhar nós
        this.nodes.forEach((node) => {
            this.drawNode(node);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    //endregion

}
