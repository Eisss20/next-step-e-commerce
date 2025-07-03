import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all labels
export async function GET() {
  try {
    const labels = await prisma.label.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { label_name: 'asc' },
    });

    const formattedLabels = labels.map((label) => ({
      id: label.label_id,
      name: label.label_name,
      productCount: label._count.products,
    }));

    return NextResponse.json({
      success: true,
      data: formattedLabels,
    });
  } catch (error) {
    console.error(
      'Error fetching labels:',
      error && typeof error === 'object' ? error : String(error)
    );
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while fetching labels.',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create a new label
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.label_name) {
      return NextResponse.json(
        {
          success: false,
          message: 'Label name is required.',
        },
        { status: 400 }
      );
    }

    const existingLabel = await prisma.label.findUnique({
      where: { label_name: body.label_name },
    });

    if (existingLabel) {
      return NextResponse.json(
        {
          success: false,
          message: 'This label name already exists.',
        },
        { status: 400 }
      );
    }

    const newLabel = await prisma.label.create({
      data: { label_name: body.label_name },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Label created successfully.',
        data: newLabel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      'Error creating label:',
      error && typeof error === 'object' ? error : String(error)
    );
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while creating the label.',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
