<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['message:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'sentMessages')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['message:read'])]
    private ?User $sender = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['message:read'])]
    private ?string $content = null;

    #[ORM\Column]
    #[Groups(['message:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['message:read'])]
    private bool $isGlobal = true;

    #[ORM\Column]
    #[Groups(['message:read'])]
    private array $readBy = [];

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->readBy = [];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): static
    {
        $this->sender = $sender;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function isGlobal(): bool
    {
        return $this->isGlobal;
    }

    public function setIsGlobal(bool $isGlobal): static
    {
        $this->isGlobal = $isGlobal;

        return $this;
    }

    public function getReadBy(): array
    {
        return $this->readBy;
    }

    public function setReadBy(array $readBy): static
    {
        $this->readBy = $readBy;

        return $this;
    }

    public function addReadBy(int $userId): static
    {
        if (!in_array($userId, $this->readBy)) {
            $this->readBy[] = $userId;
        }

        return $this;
    }

    public function isReadBy(int $userId): bool
    {
        return in_array($userId, $this->readBy);
    }
}
